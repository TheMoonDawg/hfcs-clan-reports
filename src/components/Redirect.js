import queryString from "query-string"
import React, { Component } from "react"
import { Redirect as RouterRedirect } from "react-router-dom"
import Typography from "@material-ui/core/Typography"

class Redirect extends Component {
  componentDidMount() {
    const { code } = queryString.parse(this.props.location.search)

    if (code && !localStorage.hasOwnProperty("user")) {
      fetch(`../api/login?code=${code}`)
        .then(result => result.json())
        .then(result => {
          this.props.onSetUser(result)
        })
    }
  }

  render() {
    const { user } = this.props

    return user ? (
      <RouterRedirect to="/search" />
    ) : (
      <Typography variant="title">Logging In...</Typography>
    )
  }
}

export default Redirect
