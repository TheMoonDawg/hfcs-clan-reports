import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Route,
  Redirect as RouterRedirect,
} from 'react-router-dom'
import AppLayout from './components/AppLayout'
import NewReport from './components/NewReport'
import Redirect from './components/Redirect'
import Search from './components/Search'
import Snackbar from './components/Snackbar'
import theme from './theme'

export default function App() {
  const [user, setUser] = useState()
  const [{ open, message }, setSnackbar] = useState({
    open: false,
    message: null,
  })

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage['user']))
    }
  }, [])

  const onSetUser = (user) => {
    localStorage['user'] = JSON.stringify(user)
    setUser(user)
  }

  const onLogOut = () => {
    localStorage.clear()
    setUser(null)
  }

  const onError = ({ status, statusText }) => {
    onOpenSnackbar(statusText)

    console.error(status, statusText)
    if (status === 401) onLogOut()
  }

  const onOpenSnackbar = (message) => setSnackbar({ open: true, message })
  const onCloseSnackbar = () => setSnackbar({ open: false, message: false })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout user={user} onLogOut={onLogOut} onError={onError}>
            <Route
              exact
              path='/'
              component={() => <RouterRedirect to='/search' />}
            />

            <Route
              exact
              path='/search'
              component={() => <Search user={user} onError={onError} />}
            />

            <Route
              exact
              path='/new'
              component={() => (
                <NewReport
                  user={user}
                  onError={onError}
                  onOpenSnackbar={onOpenSnackbar}
                />
              )}
            />

            <Route
              exact
              path='/redirect'
              component={({ location }) => (
                <Redirect
                  user={user}
                  onSetUser={onSetUser}
                  onError={onError}
                  location={location}
                />
              )}
            />

            <Snackbar open={open} message={message} onClose={onCloseSnackbar} />
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
