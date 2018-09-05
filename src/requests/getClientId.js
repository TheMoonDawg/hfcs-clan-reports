export default () => {
  return fetch(`../api/client_id`).then(result => {
    if (result.status === 200) return result.json()
    else throw { status: result.status, statusText: result.statusText }
  })
}
