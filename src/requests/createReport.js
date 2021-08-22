import Error from "../utils/Error"
import generateAuthHeader from "../utils/generateAuthHeader"

export default function createReport({ cookieToken }, body) {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...generateAuthHeader(cookieToken),
    },
  }

  return fetch(`../api/new`, options).then((result) => {
    if (result.status !== 200) {
      throw new Error(result)
    }
  })
}
