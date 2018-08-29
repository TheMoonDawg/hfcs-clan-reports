import { BrowserRouter, Route } from "react-router-dom"
import React, { Component } from "react"

import AppLayout from "./components/AppLayout"
import { MuiThemeProvider } from "@material-ui/core/styles"
import NewReport from "./components/NewReport"
import Redirect from "./components/Redirect"
import Search from "./components/Search"
import authorize from "./utils/authorize"
import theme from "./theme"

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout>
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/new" component={NewReport} />
            <Route exact path="/redirect" component={Redirect} />
          </AppLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default authorize(App)
