import queryString from "query-string"
import React, { Component } from "react"
import { Redirect as RouterRedirect } from "react-router-dom"
import { Typography } from "@mui/material"
import logIn from "../requests/logIn"

class Redirect extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    const { onSetUser, onError } = this.props
    const { code } = queryString.parse(this.props.location.search)

    if (code && !localStorage.hasOwnProperty("user")) {
      logIn(code)
        .then(onSetUser)
        .catch(onError)
        .then(this.redirect)
    }
  }

  redirect = () => this.setState({ redirect: true })

  render() {
    const { redirect } = this.state

    return redirect ? (
      <RouterRedirect to="/search" />
    ) : (
      <Typography variant="title">Logging In...</Typography>
    )
  }
}

export default Redirect
