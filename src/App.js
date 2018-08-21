import { BrowserRouter, Route } from "react-router-dom"
import React, { Component } from "react"

import AppLayout from "./components/AppLayout"
import { MuiThemeProvider } from "@material-ui/core/styles"
import NewReport from "./components/NewReport"
import Search from "./components/Search"
import authorize from "./utils/authorize"
import theme from "./theme"

class App extends Component {
  render() {
    const { user } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout user={user}>
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/new" component={NewReport} />
          </AppLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default authorize(App)
