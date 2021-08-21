import queryString from "query-string"
import generateAuthHeader from "../utils/generateAuthHeader"
import Error from "../utils/Error"

export default ({ cookieToken }, params) => {
  const options = { headers: generateAuthHeader(cookieToken) }

  return fetch(`../api/search?${queryString.stringify(params)}`, options).then(
    (result) => {
      if (result.status === 200) return result.json()
      else { throw new Error(result) }
    }
  )
}
