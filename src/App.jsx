import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import React, { Component } from "react"
import {
  BrowserRouter,
  Route,
  Redirect as RouterRedirect,
} from "react-router-dom"
import AppLayout from "./components/AppLayout"
import NewReport from "./components/NewReport"
import Redirect from "./components/Redirect"
import Search from "./components/Search"
import Snackbar from "./components/Snackbar"
import theme from "./theme"

class App extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty("user")) {
      this.setState({ user: JSON.parse(localStorage["user"]) })
    }
  }

  onSetUser = (user) => {
    localStorage["user"] = JSON.stringify(user)
    this.setState({ user })
  }

  onLogOut = () => {
    localStorage.clear()
    this.setState({ user: null })
  }

  onError = ({ status, statusText }) => {
    this.onOpenSnackbar(statusText)

    console.error(status, statusText)
    if (status === 401) this.onLogOut()
  }

  onOpenSnackbar = (message) => this.setState({ open: true, message })
  onCloseSnackbar = () => this.setState({ open: false })

  indexComponent = () => <RouterRedirect to="/search" />

  searchComponent = (props) => (
    <Search user={this.state.user} onError={this.onError} {...props} />
  )

  newReportComponent = (props) => (
    <NewReport
      user={this.state.user}
      onError={this.onError}
      onOpenSnackbar={this.onOpenSnackbar}
      {...props}
    />
  )

  redirectComponent = (props) => (
    <Redirect onSetUser={this.onSetUser} onError={this.onError} {...props} />
  )

  render() {
    const { user, open, message } = this.state

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>

          <BrowserRouter>
            <AppLayout
              user={user}
              onLogOut={this.onLogOut}
              onError={this.onError}
            >
              <Route exact path="/" component={this.indexComponent} />
              <Route exact path="/search" component={this.searchComponent} />
              <Route exact path="/new" component={this.newReportComponent} />
              <Route
                exact
                path="/redirect"
                component={this.redirectComponent}
              />

              <Snackbar
                open={open}
                message={message}
                onClose={this.onCloseSnackbar}
              />
            </AppLayout>
          </BrowserRouter>

        </ThemeProvider>
      </StyledEngineProvider>
    )
  }
}

export default App
