import generateAuthHeader from "../utils/generateAuthHeader"

export default ({ cookieToken }, body) => {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...generateAuthHeader(cookieToken)
    }
  }

  return fetch(`../api/new`, options).then(({ status, statusText }) => {
    if (status !== 200) throw { status, statusText }
  })
}
