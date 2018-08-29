import React, { Component } from "react"

import { Redirect as RouterRedirect } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import queryString from "stringquery"

class Redirect extends Component {
  componentDidMount() {
    const { code } = queryString(this.props.location.search)

    if (code && !localStorage.hasOwnProperty("user")) {
      fetch(`../api/login?code=${code}`)
        .then(result => result.json())
        .then(result => {
          localStorage["user"] = JSON.stringify(result)
        })
    }
  }

  render() {
    return localStorage.hasOwnProperty("user") ? (
      <RouterRedirect to="/" />
    ) : (
      <Typography variant="title">Loading...</Typography>
    )
  }
}

export default Redirect
