import React, { Component } from "react"
import {
  BrowserRouter,
  Route,
  Redirect as RouterRedirect,
} from "react-router-dom"
import { MuiThemeProvider } from "@material-ui/core/styles"
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

  onSetUser = user => {
    localStorage["user"] = JSON.stringify(user)
    this.setState({ user })
  }

  onLogOut = () => {
    localStorage.clear()
    this.setState({ user: null })
  }

  onOpenSnackbar = message => this.setState({ open: true, message })
  onCloseSnackbar = () => this.setState({ open: false })

  indexComponent = () => <RouterRedirect to="/search" />

  searchComponent = props => (
    <Search
      user={this.state.user}
      onOpenSnackbar={this.onOpenSnackbar}
      {...props}
    />
  )

  newReportComponent = props => (
    <NewReport
      user={this.state.user}
      onOpenSnackbar={this.onOpenSnackbar}
      {...props}
    />
  )

  redirectComponent = props => (
    <Redirect user={this.state.user} onSetUser={this.onSetUser} {...props} />
  )

  render() {
    const { user, open, message } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout user={user} onLogOut={this.onLogOut}>
            <Route exact path="/" component={this.indexComponent} />
            <Route exact path="/search" component={this.searchComponent} />
            <Route exact path="/new" component={this.newReportComponent} />
            <Route exact path="/redirect" component={this.redirectComponent} />

            <Snackbar
              open={open}
              message={message}
              onClose={this.onCloseSnackbar}
            />
          </AppLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
