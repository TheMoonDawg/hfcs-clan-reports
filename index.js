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

function fetch(url, options) {
  return nodeFetch(url, options).then((response) => response.json())
}

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

// Model
const generateModel = (user, cookieToken, accessToken, refreshToken) => ({
  membershipId: user.membershipId,
  name: user.displayName,
  avatarURL: `http://www.bungie.net${user.profilePicturePath}`,
  resources,
  cookieToken,
  accessToken,
  refreshToken,
})

const OK = 200
const UNAUTHORIZED = 401
const NOT_FOUND = 404
const SERVER_ERROR = 500

function getErrorMessage(statusCode) {
  switch (statusCode) {
    case UNAUTHORIZED:
      return "Hey, you're not allowed to be here. Shoo!"
    case NOT_FOUND:
      return "Clan not found!"
    case SERVER_ERROR:
    default:
      return "An internal server error has occurred... yell at MoonDawg to fix it."
  }
}

function getAuthToken(request) {
  return request.headers.authorization.substring(6)
}

app.set("port", process.env.PORT || 5001)

app.listen(app.get("port"), () => {
  console.log("Node app is running on port", app.get("port"))
})

// ---------------------------
// CLIENT
// ---------------------------

// Serve React files
app.use(express.static(path.join(__dirname, "dist")))
app.get(["/", "/search", "/new", "/redirect"], (_request, response) => {
  response.sendFile(path.join(__dirname, "dist/index.html"))
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
app.get("/api/login", async (request, response) => {
  try {
    const cookieToken = uuidv4()

    const options = getAuthorizationRequestOptions(request.query.code)
    const { access_token, refresh_token } = await fetch(
      "https://www.bungie.net/platform/app/oauth/token/",
      options
    )

    const resp = await getUser(access_token)
    const user = resp.Response.bungieNetUser

    const model = generateModel(user, cookieToken, access_token, refresh_token)

    const { region } = await executeSingleQuery(
      "SELECT * FROM ninja WHERE ninja_id=$1",
      [model.membershipId],
      UNAUTHORIZED
    )

    // Update tokens in database
    await updateTokens(
      model.membershipId,
      model.cookieToken,
      access_token,
      refresh_token
    )

    response.statusCode = OK
    response.send({ ...model, region })
  } catch (err) {
    const statusCode = err.statusCode || err

    response.statusCode = statusCode
    response.statusMessage = getErrorMessage(statusCode)
    response.end()
  }
})

// Search Clan Reports
app.get("/api/search", async (request, response) => {
  try {
    const queryString = request.query
    const token = getAuthToken(request)

    const { membershipId } = await getNinja(token)

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
      values.push(membershipId)
    }

    query += " ORDER BY r.report_date DESC"

    if (
      queryString.last_100_reports ||
      queryString.last_100_regional_reports ||
      queryString.user_100_reports
    ) {
      query += " LIMIT 100"
    }

    const data = await executeQuery(query, values)

    response.statusCode = OK
    response.send(data)
  } catch (err) {
    const statusCode = err.statusCode || err

    response.statusCode = statusCode
    response.statusMessage = getErrorMessage(statusCode)
    response.end()
  }
})

// Get Clan info from Bnet
app.get("/api/clan", async (request, response) => {
  try {
    const clanId = request.query.clan_id

    const token = getAuthToken(request)
    const { accessToken } = await getNinja(token)

    const options = getRequestOptions(accessToken)

    const clanInfo = await fetch(
      `https://www.bungie.net/Platform/GroupV2/${clanId}`,
      options
    )

    if (clanInfo.ErrorStatus === "GroupNotFound") {
      throw NOT_FOUND
    }

    const clan = clanInfo.Response.detail

    const data = {
      id: clan.groupId,
      name: clan.name,
      motto: clan.motto,
      missionStatement: clan.about,
    }

    response.statusCode = OK
    response.send(data)
  } catch (err) {
    const statusCode = err.statusCode || err

    response.statusCode = statusCode
    response.statusMessage = getErrorMessage(statusCode)
    response.end()
  }
})

// New Clan Report
app.post("/api/new", async (request, response) => {
  try {
    const token = getAuthToken(request)
    const { membershipId } = await getNinja(token)

    const data = await parseBody(request)

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
      membershipId,
      data.judgment,
      data.region,
    ]

    await executeQuery(query, params)

    response.statusCode = OK
    response.send()
  } catch (err) {
    const statusCode = err.statusCode || err

    response.statusCode = statusCode
    response.statusMessage = getErrorMessage(statusCode)
    response.end()
  }
})

async function getNinja(cookieToken) {
  let model

  const { access_token, refresh_token } = await getAccessTokens(cookieToken)

  try {
    const resp = await getUser(access_token)
    const user = resp.Response.bungieNetUser

    model = generateModel(user, cookieToken, access_token, refresh_token)
  } catch {
    // Invalid Access Token - Use Refresh Token
    const options = getRefreshRequestOptions(refresh_token)
    const tokens = await fetch(
      "https://www.bungie.net/platform/app/oauth/token/",
      options
    )

    const resp = await getUser(tokens.access_token)
    const user = resp.Response.bungieNetUser

    // Update tokens in database
    await updateTokens(
      user.membershipId,
      cookieToken,
      tokens.access_token,
      tokens.refresh_token
    )

    model = generateModel(
      user,
      cookieToken,
      tokens.access_token,
      tokens.refresh_token
    )
  }

  const results = await executeQuery(
    "SELECT display_name FROM ninja WHERE ninja_id = $1 AND active",
    [model.membershipId]
  )

  if (results.length === 0) {
    throw UNAUTHORIZED
  }

  return model
}

function getUser(accessToken) {
  const options = getRequestOptions(accessToken)

  return fetch(
    "https://www.bungie.net/Platform/User/GetCurrentBungieAccount/",
    options
  )
}

async function getAccessTokens(cookieToken) {
  const data = await executeQuery(
    "SELECT * FROM token WHERE cookie_token=$1;",
    [cookieToken]
  )

  if (data.length === 0) {
    throw UNAUTHORIZED
  } else if (data.length > 1) {
    throw SERVER_ERROR
  }

  return data[0]
}

async function updateTokens(
  membershipId,
  cookieToken,
  accessToken,
  refreshToken
) {
  const data = await executeQuery(
    "SELECT ninja_id FROM token WHERE ninja_id=$1",
    [membershipId]
  )

  if (data.length > 0) {
    // Update Tokens
    await executeQuery(
      "UPDATE token SET access_token=$1, refresh_token=$2, cookie_token=$3 WHERE ninja_id=$4",
      [accessToken, refreshToken, cookieToken, membershipId]
    )
  } else {
    // Insert Tokens
    await executeQuery(
      "INSERT INTO token(ninja_id, access_token, refresh_token, cookie_token) VALUES($1, $2, $3, $4);",
      [membershipId, accessToken, refreshToken, cookieToken]
    )
  }
}

function parseBody(request) {
  return new Promise((resolve) => {
    let body = ""

    request
      .on("data", (chunk) => {
        body += chunk
      })
      .on("end", () => {
        const data = JSON.parse(body)

        resolve(data)
      })
  })
}

async function executeQuery(query, params) {
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    const { rows } = await pool.query(query, params)

    return rows
  } catch (err) {
    console.error(err)

    throw SERVER_ERROR
  }
}

async function executeSingleQuery(query, params, exceptionType = SERVER_ERROR) {
  const data = await executeQuery(query, params)

  if (data.length === 0) {
    throw UNAUTHORIZED
  }
  if (data.length !== 1) {
    throw SERVER_ERROR
  }

  return data[0]
}
