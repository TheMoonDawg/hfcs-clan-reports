import queryString from "query-string"
import generateAuthHeader from "../utils/generateAuthHeader"

export default ({ cookieToken }) => {
  const options = { headers: generateAuthHeader(cookieToken) }

  return fetch("../api/test/reports?", options).then(result => {
    if (result.status === 200)
      return console.log(result.json()) || result.json()
    else throw { status: result.status, statusText: result.statusText }
  })
}
