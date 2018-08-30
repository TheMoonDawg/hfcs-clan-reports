import {
  BrowserRouter,
  Route,
  Redirect as RouterRedirect,
} from "react-router-dom"
import React, { Component } from "react"

import AppLayout from "./components/AppLayout"
import { MuiThemeProvider } from "@material-ui/core/styles"
import NewReport from "./components/NewReport"
import Redirect from "./components/Redirect"
import Search from "./components/Search"
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

  indexComponent = () => <RouterRedirect to="/search" />

  searchComponent = props => <Search user={this.state.user} {...props} />

  newReportComponent = props => <NewReport user={this.state.user} {...props} />

  redirectComponent = props => (
    <Redirect user={this.state.user} onSetUser={this.onSetUser} {...props} />
  )

  render() {
    const { user } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout user={user} onLogOut={this.onLogOut}>
            <Route exact path="/" component={this.indexComponent} />
            <Route exact path="/search" component={this.searchComponent} />
            <Route exact path="/new" component={this.newReportComponent} />
            <Route exact path="/redirect" component={this.redirectComponent} />
          </AppLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
