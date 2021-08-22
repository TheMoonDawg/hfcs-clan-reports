import Error from "../utils/Error"

export default function getClientId() {
  return fetch(`../api/client_id`).then((result) => {
    if (result.status === 200) return result.json()
    else {
      throw new Error(result)
    }
  })
}
