import queryString from "query-string"
import Error from "../utils/Error"
import generateAuthHeader from "../utils/generateAuthHeader"

export default function getReports({ cookieToken }, params) {
  const options = { headers: generateAuthHeader(cookieToken) }

  return fetch(`../api/search?${queryString.stringify(params)}`, options).then(
    (result) => {
      if (result.status === 200) return result.json()
      else {
        throw new Error(result)
      }
    }
  )
}
