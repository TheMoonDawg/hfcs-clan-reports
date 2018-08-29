// Imports
const express = require("express")
const httpRequest = require("request")
const rp = require("request-promise")
const path = require("path")
const csParse = require("pg-connection-string").parse
const { Pool } = require("pg")
const uuidv4 = require("uuid/v4")
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

// DB Connection
const connectionString = process.env.DATABASE_URL || bungieConfig.database_url
const dbConfig = csParse(connectionString)
process.env.PGHOST = dbConfig.host
process.env.PGUSER = dbConfig.user
process.env.PGDATABASE = dbConfig.database
process.env.PGPASSWORD = dbConfig.password
process.env.PGPORT = dbConfig.port
process.env.PGSSLMODE = "require"

// Request Options
const getAuthorizationRequestOptions = code => ({
  url: "https://www.bungie.net/platform/app/oauth/token/",
  method: "POST",
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
})

const getRefreshRequestOptions = refreshToken => ({
  url: "https://www.bungie.net/platform/app/oauth/token/",
  method: "POST",
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
})

const getUserRequestOptions = accessToken => ({
  url: "http://www.bungie.net/Platform/User/GetCurrentBungieAccount/",
  method: "GET",
  headers: {
    "X-API-Key": apiKey,
    Authorization: `Bearer ${accessToken}`,
  },
})

app.set("port", process.env.PORT || 5000)

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"))
})

// ---------------------------
// CLIENT
// ---------------------------

// Serve React files
app.use(express.static(path.join(__dirname, "build")))
app.get(["/", "/search", "/new", "/redirect"], function(request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"))
})

// ---------------------------
// API
// ---------------------------

// Login
app.get("/api/login", function(request, response) {
  const options = getAuthorizationRequestOptions(request.query.code)
  const cookieToken = uuidv4()

  rp(options)
    .then(response => {
      const json = JSON.parse(response)
      return {
        cookieToken,
        accessToken: json.access_token,
        refreshToken: json.refresh_token,
      }
    })
    .then(checkNinja)
    .then(console.log)
    .catch(err => {
      response.statusCode = err.statusCode || 401
      response.send("Get out of here, you're not welcome.")
    })

  /*
     // Get Bnet profile info
    checkNinja(
      response,
      json.access_token,
      json.refresh_token,
      cookieToken,
      function(user) {
        const model = {
          MembershipId: user.MembershipId,
          UserName: user.Name,
          CookieToken: cookieToken,
          AvatarURL: user.Avatar_URL,
        }

        // Update tokens in database
        updateTokens(
          response,
          user.Name,
          user.MembershipId,
          cookieToken,
          json.access_token,
          json.refresh_token,
          function() {
            response.send(model)
          },
        )
      },
    )
  })
  */
})

// Get Resource Links
app.get("/api/resources", function(request, response) {
  const queryString = request.query

  getAccessTokens(response, queryString.CookieToken, function(data) {
    checkNinja(
      response,
      data.accesstoken,
      data.refreshtoken,
      queryString.CookieToken,
      function() {
        if (response.statusCode === 401) return

        response.statusCode = 200
        response.send({ Resources: resources })
      },
    )
  })
})

// Search Clan Reports
app.get("/api/search", function(request, response) {
  const queryString = request.query

  getAccessTokens(response, queryString.CookieToken, function(data) {
    checkNinja(
      response,
      data.accesstoken,
      data.refreshtoken,
      queryString.CookieToken,
      function(user) {
        if (response.statusCode === 401) return

        // Form query
        let query = "SELECT * FROM report WHERE 1=1"
        let paramNum = 1
        let values = []

        if (queryString.ClanId && queryString.ClanId != "undefined") {
          query += " AND clan_id=$" + paramNum
          paramNum++
          values.push(queryString.ClanId)
        }

        if (queryString.ClanName && queryString.ClanName != "undefined") {
          query += " AND clan_name ~* $" + paramNum
          paramNum++
          values.push(queryString.ClanName.toUpperCase() + "%")
        }

        if (queryString.User100Reports) {
          query += " AND ninja_id=$" + paramNum
          paramNum++
          values.push(user.MembershipId)
        }

        query += " ORDER BY report_date DESC"

        if (queryString.Last50Reports) {
          query += " LIMIT 50"
        }

        if (queryString.User100Reports) {
          query += " LIMIT 100"
        }

        executeQuery(response, query, values, function(data) {
          response.statusCode = 200
          response.send(data)
        })
      },
    )
  })
})

// New Clan Report
app.post("/api/new", function(request, response) {
  const queryString = request.query

  getAccessTokens(response, queryString.CookieToken, function(data) {
    checkNinja(
      response,
      data.accesstoken,
      data.refreshtoken,
      queryString.CookieToken,
      function() {
        if (response.statusCode === 401) return

        let jsonString = ""

        request.on("data", function(data) {
          jsonString += data
        })

        request.on("end", function() {
          const data = JSON.parse(jsonString)

          // Form query
          const query =
            "INSERT INTO report(clan_id, clan_name, clan_motto, clan_mission_statement, notes, ninja_id, judgment, report_date) Values($1, $2, $3, $4, $5, $6, $7, NOW());"
          const params = [
            data.ClanId,
            data.ClanName,
            data.ClanMotto,
            data.ClanMissionStatement,
            data.Notes,
            data.Ninja,
            data.Judgment,
          ]

          executeQuery(response, query, params, function() {
            response.statusCode = 200
            response.send()
          })
        })
      },
    )
  })
})

function checkNinja({ cookieToken, accessToken, refreshToken }) {
  let model

  return (
    getUser(accessToken)
      // Valid Access Token
      .then(response => {
        const user = JSON.parse(response).Response.bungieNetUser
        model = generateModel(user, accessToken, refreshToken)
      })
      // Invalid Access Token - Use Refresh Token
      .catch(() => {
        const options = getRefreshRequestOptions(refreshToken)

        return rp(options).then(response => {
          const tokens = JSON.parse(response)

          return getUser(tokens.access_token).then(response => {
            const user = JSON.parse(response).Response.bungieNetUser
            console.log(user)

            // Update tokens in DB
            updateTokens(
              user.membershipId,
              cookieToken,
              tokens.access_token,
              tokens.refresh_token,
            )

            model = generateModel(
              user,
              tokens.access_token,
              tokens.refresh_token,
            )
          })
        })
      })
      // Check Authorized Ninja
      .then(() =>
        executeQuery("SELECT display_name FROM ninja WHERE ninja_id = $1", [
          model.membershipId,
        ]),
      )
      .then(result => {
        if (result.length == 0) throw new Error("Unauthorized")
      })
      .then(() => model)
  )
}

const getUser = accessToken => {
  const options = getUserRequestOptions(accessToken)
  return rp(options)
}

const generateModel = (user, accessToken, refreshToken) => ({
  membershipId: user.membershipId,
  name: user.displayName,
  avatarURL: `http://www.bungie.net${user.profilePicturePath}`,
  accessToken,
  refreshToken,
})

const updateTokens = (membershipId, cookieToken, accessToken, refreshToken) => {
  executeQuery("SELECT ninja_id FROM token WHERE ninja_id=$1", [
    membershipId,
  ]).then(result => {
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
}

const executeQuery = (query, params) => {
  const pool = new Pool()

  return pool
    .query(query, params)
    .then(res => res.rows)
    .catch(err => {
      console.log(err)
      throw err
    })
}
