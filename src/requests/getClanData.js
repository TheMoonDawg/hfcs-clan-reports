import queryString from "query-string"
import Error from "../utils/Error"
import generateAuthHeader from "../utils/generateAuthHeader"

export default function getClanData({ cookieToken }, clanId) {
  const options = { headers: generateAuthHeader(cookieToken) }
  const params = { clan_id: clanId }

  return fetch(`../api/clan?${queryString.stringify(params)}`, options).then(
    (result) => {
      if (result.status === 200) return result.json()
      else {
        throw new Error(result)
      }
    }
  )
}
