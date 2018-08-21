const express = require("express")
const app = express()
const httpRequest = require("request")
const path = require("path")
const csParse = require("pg-connection-string").parse // For parsing conneciton URL
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

// Set up DB connection
const connectionString = process.env.DATABASE_URL || bungieConfig.database_url
const dbConfig = csParse(connectionString)
process.env.PGHOST = dbConfig.host
process.env.PGUSER = dbConfig.user
process.env.PGDATABASE = dbConfig.database
process.env.PGPASSWORD = dbConfig.password
process.env.PGPORT = dbConfig.port
process.env.PGSSLMODE = "require"

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
  const options = {
    url: "https://www.bungie.net/platform/app/oauth/token/",
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=authorization_code" +
      "&code=" +
      request.query.code +
      "&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret,
  }

  // Get tokens
  httpRequest(options, function(err, httpResponse, body) {
    if (err) {
      response.statusCode = httpResponse.statusCode
      response.send("An error has occurred!")
      return
    }

    const json = JSON.parse(httpResponse.body)

    const uuidv4 = require("uuid/v4")
    const cookieToken = uuidv4()

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

function getAccessTokens(response, cookieToken, returnCallback) {
  executeQuery(
    response,
    "SELECT * FROM token WHERE cookie_token=$1;",
    [cookieToken],
    function(data) {
      if (!data || data.length === 0) {
        response.statusCode = 401
        response.send("Unauthorized!")
        return
      }

      if (data.length > 1) {
        response.statusCode = 500
        response.send(
          "Multiple users found matching this cookie. Yell at MoonDawg to fix it!",
        )
        return
      }

      returnCallback(data[0])
    },
  )
}

function updateTokens(
  response,
  membershipId,
  cookieToken,
  accessToken,
  refreshToken,
  callback,
) {
  executeQuery(
    response,
    "SELECT * FROM token WHERE ninja_id=$1",
    [membershipId],
    function(data) {
      // Update Tokens
      if (data.length > 0) {
        const query =
          "UPDATE token SET access_token=$1, refresh_token=$2, cookie_token=$3 WHERE ninja_id=$4"
        const params = [accessToken, refreshToken, cookieToken, membershipId]

        executeQuery(response, query, params, function() {
          callback()
          return
        })
      }
      // Insert Tokens
      else {
        const query =
          "INSERT INTO token(ninja_id, access_token, refresh_token, cookie_token) VALUES($1, $2, $3, $4, $5);"
        const params = [membershipId, accessToken, refreshToken, cookieToken]

        executeQuery(response, query, params, function() {
          callback()
          return
        })
      }
    },
  )
}

function checkNinja(
  response,
  accessToken,
  refreshToken,
  cookieToken,
  returnCallback,
  nested,
) {
  // List of UserIds for current Ninjas
  var arr = [
    282, // stosh
    1774, // Duardo
    2526, // dmg04
    17925, // FoMan123
    22704, // Cozmo
    5872880, // BNGHelp0
    5872883, // BNGHelp1
    8305888, // BNGHelp2
    8306078, // BNGHelp3
    8306295, // BNGHelp4
    10813992, // BNGHelp5
    1127, // dmbfan09
    2311, // Shacker
    2336, // Lord Revan (Sellout)
    3352, // irishfreak
    4878, // Spawn
    6004, // Atsumi
    7024, // Butane
    29347, // DMHCook
    31152, // onyx spartan
    51262, // bobcast
    60418, // ZER0COOL
    68974, // dazarobbo
    76974, // Old Papa Rich
    83901, // Froggie
    95799, // Plain Ben
    108762, // MoonDawg
    218625, // Index
    328524, // Phoenix1710
    398983, // Takedown
    446470, // machinimagames
    924570, // Needless
    964968, // Makeshyft
    1093770, // Seraphim Crypto
    1292876, // Fuzzle
    2985263, // BaghdadBean
    3537380, // Commander Scurvy
    4864368, // Ecto1italia
    5666728, // Dimitrios4
    5696684, // Psyperactive81
    5828411, // Siffow
    17956, // Cortana V
    8878733, // truexadir
  ]

  const userOptions = {
    url: "http://www.bungie.net/Platform/User/GetCurrentBungieAccount/",
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
      Authorization: "Bearer " + accessToken,
    },
  }

  httpRequest(userOptions, function callback(err, httpResponse, body) {
    console.log("HTTP Status Code: " + httpResponse.statusCode)

    // Valid user
    if (httpResponse.statusCode === 200) {
      const json = JSON.parse(httpResponse.body).Response.bungieNetUser

      // Make sure authenticated user is a Ninja
      if (arr.indexOf(parseInt(json.membershipId, 10)) > -1) {
        const model = {
          MembershipId: json.membershipId,
          Name: json.displayName,
          Avatar_URL: "http://www.bungie.net" + json.profilePicturePath,
          Access_Token: accessToken,
          Refresh_Token: refreshToken,
        }

        returnCallback(model)
        return
      }
    }
    // Invalid/Expired Access Token
    else if (httpResponse.statusCode === 401 && !nested) {
      const refreshOptions = {
        url: "https://www.bungie.net/platform/app/oauth/token/",
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=refresh_token" +
          "&refresh_token=" +
          refreshToken +
          "&client_id=" +
          clientId +
          "&client_secret=" +
          clientSecret,
      }

      // Get new Access Token
      httpRequest(refreshOptions, function(err, httpResponse, body) {
        if (err) {
          response.statusCode = httpResponse.statusCode
          response.send("An error has occurred!")
          return
        }

        const json = JSON.parse(httpResponse.body)

        // Get Bnet profile info & set nested flag (prevents infinite loop)
        checkNinja(
          response,
          json.access_token,
          json.refresh_token,
          cookieToken,
          function(user) {
            // Update tokens in database
            updateTokens(
              response,
              user.MembershipId,
              cookieToken,
              json.access_token,
              json.refresh_token,
              function() {
                returnCallback(user)
                return
              },
            )
          },
          true,
        ) // Flag prevents infinite loop
      })

      return
    }

    response.statusCode = 401
    response.send("Hey... you're not a Ninja! Shoo!")
  })
}

function executeQuery(response, query, values, callback) {
  const { Pool } = require("pg")
  var pool = new Pool()

  pool.query(query, values, (err, res) => {
    if (err) {
      console.log(err)
      response.statusCode = 500
      response.send("SQL error")
    }

    pool.end()
    callback(res.rows)
  })
}
