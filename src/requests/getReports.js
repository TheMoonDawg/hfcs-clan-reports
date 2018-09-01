import queryString from "query-string"
import generateAuthHeader from "../utils/generateAuthHeader"

export default ({ cookieToken }, params) => {
  const options = { headers: generateAuthHeader(cookieToken) }

  return fetch(`../api/search?${queryString.stringify(params)}`, options).then(
    result => {
      if (result.status === 200) return result.json()
      else throw { status: result.status, statusText: result.statusText }
    }
  )
}
