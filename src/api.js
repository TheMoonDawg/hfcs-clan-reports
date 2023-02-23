import queryString from 'query-string'

function generateAuthHeader(cookieToken) {
  return { Authorization: `Basic ${cookieToken}` }
}

function Error(result) {
  this.status = result.status
  this.statusText = result.statusText
  this.name = 'Error'
}

export function getClientId() {
  return fetch(`../api/client_id`).then((result) => {
    if (result.status === 200) return result.json()
    else {
      throw new Error(result)
    }
  })
}

export function logIn(code) {
  return fetch(`../api/login?code=${code}`).then((result) => {
    if (result.status === 200) return result.json()
    else {
      throw new Error(result)
    }
  })
}

export function getClanData({ cookieToken }, clanId) {
  const options = { headers: generateAuthHeader(cookieToken) }
  const params = { clan_id: clanId }

  return fetch(`../api/clan?${queryString.stringify(params)}`, options).then(
    (result) => {
      if (result.status === 200) return result.json()
      else {
        throw new Error(result)
      }
    },
  )
}

export function getReports({ cookieToken }, params) {
  const options = { headers: generateAuthHeader(cookieToken) }

  return fetch(`../api/search?${queryString.stringify(params)}`, options).then(
    (result) => {
      if (result.status === 200) return result.json()
      else {
        throw new Error(result)
      }
    },
  )
}

export function createReport({ cookieToken }, body) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...generateAuthHeader(cookieToken),
    },
  }

  return fetch(`../api/new`, options).then((result) => {
    if (result.status !== 200) {
      throw new Error(result)
    }
  })
}
