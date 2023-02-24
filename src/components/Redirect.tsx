import { Typography } from '@mui/material'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Redirect as RouterRedirect } from 'react-router-dom'
import { logIn } from '../api'

export default function Redirect({ user, onSetUser, onError, location }) {
  const [redirect, setRedirect] = useState(false)
  const { code } = queryString.parse(location.search)

  useEffect(() => {
    if (code && !localStorage.getItem('user')) {
      logIn(code).then(onSetUser).catch(onError)
    }
  }, [code])

  useEffect(() => {
    if (user) {
      setRedirect(true)
    }
  }, [user])

  return redirect ? (
    <RouterRedirect to='/search' />
  ) : (
    <Typography variant='title'>Logging In...</Typography>
  )
}
