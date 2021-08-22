import Error from "../utils/Error"

export default function logIn(code) {
  return fetch(`../api/login?code=${code}`).then((result) => {
    if (result.status === 200) return result.json()
    else {
      throw new Error(result)
    }
  })
}
