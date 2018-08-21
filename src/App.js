import { BrowserRouter, Route } from "react-router-dom"
import React, { Component } from "react"

import AppLayout from "./AppLayout"
import { MuiThemeProvider } from "@material-ui/core/styles"
import NewReport from "./components/NewReport"
import Search from "./components/Search"
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
          </AppLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
