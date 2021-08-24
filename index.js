// Imports
const express = require("express")
const nodeFetch = require("node-fetch")
const path = require("path")
// const csParse = require("pg-connection-string").parse
const { Pool } = require("pg")
const { v4: uuidv4 } = require("uuid")
const app = express()

// Config
let bungieConfig

try {
  bungieConfig = require("./keys.json")
} catch (e) {
  // Use environment variables instead
}
const apiKey = process.env.X_API_KEY || bungieConfig.x_api_key
const clientId = process.env.CLIENT_ID || bungieConfig.client_id
const clientSecret = process.env.CLIENT_SECRET || bungieConfig.client_secret
const resources = process.env.RESOURCES || bungieConfig.resources
const connectionString = process.env.DATABASE_URL || bungieConfig.database_url

const fetch = (url, options) =>
  nodeFetch(url, options).then((response) => response.json())

// Request Options
const getAuthorizationRequestOptions = (code) => ({
  method: "POST",
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
})

const getRefreshRequestOptions = (refreshToken) => ({
  method: "POST",
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
})

const getRequestOptions = (accessToken) => ({
  method: "GET",
  headers: {
    "X-API-Key": apiKey,
    Authorization: `Bearer ${accessToken}`,
  },
})

const OK = 200
const UNAUTHORIZED = 401
const NOT_FOUND = 404
const SERVER_ERROR = 500

const getErrorMessage = (statusCode) => {
  switch (statusCode) {
    case 401:
      return "Hey, you're not allowed to be here. Shoo!"
    case 404:
      return "Clan not found!"
    case 500:
    default:
      return "An internal server error has occurred... yell at MoonDawg to fix it."
  }
}

const getAuthToken = (request) => request.headers.authorization.substring(6)

app.set("port", process.env.PORT || 5000)

app.listen(app.get("port"), () => {
  console.log("Node app is running on port", app.get("port"))
})

// ---------------------------
// CLIENT
// ---------------------------

// Serve React files
app.use(express.static(path.join(__dirname, "build")))
app.get(["/", "/search", "/new", "/redirect"], (_request, response) => {
  response.sendFile(path.join(__dirname, "build/index.html"))
})

// ---------------------------
// API
// ---------------------------

// Get Client Id
app.get("/api/client_id", (_request, response) => {
  response.statusCode = OK
  response.send(clientId)
})

// Login
app.get("/api/login", (request, response) => {
  const options = getAuthorizationRequestOptions(request.query.code)
  const cookieToken = uuidv4()

  fetch("https://www.bungie.net/platform/app/oauth/token/", options)
    .catch(({ statusCode }) => {
      throw statusCode
    })
    .then((data) => {
      return checkNinja(cookieToken, data.access_token, data.refresh_token)
    })
    .then(({ accessToken, refreshToken, ...model }) => {
      return updateTokens(
        model.membershipId,
        model.cookieToken,
        accessToken,
        refreshToken
      ).then(() => model)
    })
    .then((model) => {
      return getRegion(model.membershipId).then((region) => ({
        ...model,
        region,
      }))
    })
    .then((model) => {
      response.statusCode = OK
      response.send(model)
    })
    .catch((statusCode) => {
      response.statusCode = statusCode
      response.statusMessage = getErrorMessage(statusCode)
      response.end()
    })
})

// Search Clan Reports
app.get("/api/search", (request, response) => {
  const queryString = request.query
  const token = getAuthToken(request)

  getAccessTokens(token)
    .then((data) => checkNinja(token, data.access_token, data.refresh_token))
    .then((user) => {
      let query = `
        SELECT
          r.id,
          r.report_date AS "reportDate",
          r.clan_id AS "clanId",
          r.clan_name AS "clanName",
          r.clan_motto AS "clanMotto",
          r.clan_mission_statement AS "clanMissionStatement",
          r.notes,
          n.display_name AS ninja,
          r.judgment
        FROM report r
        JOIN ninja n ON n.ninja_id = r.ninja_id
        WHERE 1=1
        `
      let paramNum = 1
      let values = []

      if (queryString.clan_id) {
        query += ` AND r.clan_id=$${paramNum}`
        paramNum++
        values.push(queryString.clan_id)
      }

      if (queryString.clan_name) {
        query += ` AND r.clan_name ~* $${paramNum}`
        paramNum++
        values.push(queryString.clan_name)
      }

      if (queryString.last_100_regional_reports) {
        query += ` AND r.region=$${paramNum}`
        paramNum++
        values.push(queryString.region)
      }

      if (queryString.user_100_reports) {
        query += ` AND r.ninja_id=$${paramNum}`
        paramNum++
        values.push(user.membershipId)
      }

      query += " ORDER BY r.report_date DESC"

      if (
        queryString.last_100_reports ||
        queryString.last_100_regional_reports ||
        queryString.user_100_reports
      ) {
        query += " LIMIT 100"
      }

      return executeQuery(query, values)
    })
    .then((data) => {
      response.statusCode = OK
      response.send(data)
    })
    .catch((statusCode) => {
      response.statusCode = statusCode
      response.statusMessage = getErrorMessage(statusCode)
      response.end()
    })
})

// Get Clan info from Bnet
app.get("/api/clan", async (request, response) => {
  const clanId = request.query.clan_id
  const token = getAuthToken(request)

  console.log(clanId)
  console.log(token)

  try {
    const tokens = await getAccessTokens(token)

    console.log("tokens", tokens)

    const userInfo = await checkNinja(
      token,
      tokens.access_token,
      tokens.refresh_token
    )

    console.log(userInfo)

    const options = getRequestOptions(userInfo.accessToken)

    console.log(options)

    const clanInfo = await fetch(
      `https://www.bungie.net/Platform/GroupV2/${clanId}`,
      options
    )

    console.log(clanInfo)

    if (clanInfo.ErrorStatus === "GroupNotFound") throw NOT_FOUND

    const clan = clanInfo.Response.detail

    const data = {
      id: clan.groupId,
      name: clan.name,
      motto: clan.motto,
      missionStatement: clan.about,
    }

    console.log(data)

    response.statusCode = OK
    response.send(data)
  } catch (statusCode) {
    console.log("FAILED", statusCode)

    response.statusCode = statusCode
    response.statusMessage = getErrorMessage(statusCode)
    response.end()
  }

  // getAccessTokens(token)
  //   .then((data) => checkNinja(token, data.access_token, data.refresh_token))
  //   .then(({ accessToken }) => {
  //     const options = getRequestOptions(accessToken)

  //     console.log(options)

  //     return fetch(`https://www.bungie.net/Platform/GroupV2/${clanId}`, options)
  //   })
  //   .catch(({ statusCode }) => {
  //     throw statusCode
  //   })
  //   .then((data) => {
  //     console.log("data!", data)

  //     if (data.ErrorStatus === "GroupNotFound") throw NOT_FOUND

  //     const clan = data.Response.detail

  //     return {
  //       id: clan.groupId,
  //       name: clan.name,
  //       motto: clan.motto,
  //       missionStatement: clan.about,
  //     }
  //   })
  //   .then((data) => {
  //     response.statusCode = OK
  //     response.send(data)
  //   })
  //   .catch((statusCode) => {
  //     response.statusCode = statusCode
  //     response.statusMessage = getErrorMessage(statusCode)
  //     response.end()
  //   })
})

// New Clan Report
app.post("/api/new", (request, response) => {
  const token = getAuthToken(request)

  getAccessTokens(token)
    .then((data) => checkNinja(token, data.access_token, data.refresh_token))
    .then(
      (user) =>
        new Promise((resolve) => {
          let body = ""

          request
            .on("data", (chunk) => {
              body += chunk
            })
            .on("end", () => {
              const data = JSON.parse(body)

              const query = `
                INSERT INTO report(clan_id, clan_name, clan_motto, clan_mission_statement, notes, ninja_id, judgment, region, report_date)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW());
              `

              const params = [
                data.id,
                data.name,
                data.motto,
                data.missionStatement,
                data.notes,
                user.membershipId,
                data.judgment,
                data.region,
              ]

              resolve(executeQuery(query, params))
            })
        })
    )
    .then(() => {
      response.statusCode = OK
      response.send()
    })
    .catch((statusCode) => {
      response.statusCode = statusCode
      response.statusMessage = getErrorMessage(statusCode)
      response.end()
    })
})

const checkNinja = (cookieToken, accessToken, refreshToken) => {
  let model

  return (
    getUser(accessToken)
      // Valid Access Token
      .then((data) => {
        console.log("is this actually valid tho", data)

        const user = data.Response.bungieNetUser

        model = generateModel(user, cookieToken, accessToken, refreshToken)
      })
      // Invalid Access Token - Use Refresh Token
      .catch(() => {
        const options = getRefreshRequestOptions(refreshToken)

        return (
          fetch("https://www.bungie.net/platform/app/oauth/token/", options)
            // Invalid Refresh Token
            .catch(({ statusCode }) => {
              throw statusCode
            })
            .then((data) => {
              console.log("what were the tokens", data)

              return (
                getUser(data.access_token)
                  // New Access Token also invalid
                  .catch(({ statusCode }) => {
                    throw statusCode
                  })
                  .then((data) => {
                    console.log("DATA FOR USER", data)

                    const user = data.Response.bungieNetUser

                    // Update tokens in DB
                    return updateTokens(
                      user.membershipId,
                      cookieToken,
                      data.access_token,
                      data.refresh_token
                    ).then(() => {
                      model = generateModel(
                        user,
                        cookieToken,
                        data.access_token,
                        data.refresh_token
                      )
                    })
                  })
              )
            })
        )
      })
      // Check Authorized Ninja
      .then(() => {
        return executeQuery(
          "SELECT display_name FROM ninja WHERE ninja_id = $1 AND active",
          [model.membershipId]
        )
      })
      .then((result) => {
        if (result.length == 0) throw UNAUTHORIZED
      })
      .then(() => model)
  )
}

const getUser = (accessToken) => {
  const options = getRequestOptions(accessToken)

  return fetch(
    "https://www.bungie.net/Platform/User/GetCurrentBungieAccount/",
    options
  )
}

const generateModel = (user, cookieToken, accessToken, refreshToken) => ({
  membershipId: user.membershipId,
  name: user.displayName,
  avatarURL: `http://www.bungie.net${user.profilePicturePath}`,
  resources,
  cookieToken,
  accessToken,
  refreshToken,
})

const getAccessTokens = (cookieToken) =>
  executeQuery("SELECT * FROM token WHERE cookie_token=$1;", [
    cookieToken,
  ]).then((data) => {
    if (!data || data.length === 0) {
      throw UNAUTHORIZED
    } else if (data.length > 1) {
      throw SERVER_ERROR
    }

    return data[0]
  })

const updateTokens = (membershipId, cookieToken, accessToken, refreshToken) =>
  executeQuery("SELECT ninja_id FROM token WHERE ninja_id=$1", [
    membershipId,
  ]).then((result) => {
    let query, params

    // Update Tokens
    if (result.length > 0) {
      query =
        "UPDATE token SET access_token=$1, refresh_token=$2, cookie_token=$3 WHERE ninja_id=$4"
      params = [accessToken, refreshToken, cookieToken, membershipId]
    }
    // Insert Tokens
    else {
      query =
        "INSERT INTO token(ninja_id, access_token, refresh_token, cookie_token) VALUES($1, $2, $3, $4);"
      params = [membershipId, accessToken, refreshToken, cookieToken]
    }

    executeQuery(query, params)
  })

const getRegion = (membershipId) =>
  executeQuery("SELECT region FROM ninja WHERE ninja_id=$1", [
    membershipId,
  ]).then((result) => result[0].region)

const executeQuery = (query, params) => {
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  return pool
    .query(query, params)
    .then((res) => {
      return res.rows
    })
    .catch((err) => {
      console.error(err)
      throw SERVER_ERROR
    })
}
