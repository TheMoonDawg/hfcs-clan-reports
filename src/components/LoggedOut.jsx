import { Link } from '@mui/material'
import { useEffect, useState } from 'react'
import { getClientId } from '../api'

export default function LoggedOut({ onError }) {
  const [clientId, setClientId] = useState(null)

  useEffect(() => {
    getClientId()
      .then((clientId) => setClientId(clientId))
      .catch(onError)
  }, [])

  const link = clientId
    ? `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`
    : ''

  return (
    link && (
      <Link color='inherit' href={link}>
        Log In
      </Link>
    )
  )
}
