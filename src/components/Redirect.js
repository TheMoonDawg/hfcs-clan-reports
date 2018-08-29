import React, { Component } from "react"

import { Redirect as RouterRedirect } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import queryString from "stringquery"

class Redirect extends Component {
  componentDidMount() {
    const { onSetUser } = this.props
    const { code } = queryString(this.props.location.search)

    if (code && !localStorage.hasOwnProperty("user")) {
      fetch(`../api/login?code=${code}`)
        .then(result => result.json())
        .then(result => {
          onSetUser(result)
        })
    }
  }

  render() {
    const { user } = this.props

    return user ? (
      <RouterRedirect to="/" />
    ) : (
      <Typography variant="title">Loading...</Typography>
    )
  }
}

export default Redirect
