import queryString from "query-string"
import React, { Component } from "react"
import { Redirect as RouterRedirect } from "react-router-dom"
import Typography from "@material-ui/core/Typography"

class Redirect extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    const { onSetUser, onError } = this.props
    const { code } = queryString.parse(this.props.location.search)

    if (code && !localStorage.hasOwnProperty("user")) {
      fetch(`../api/login?code=${code}`)
        .then(result => result.json())
        .then(result => {
          onSetUser(result)
          this.redirect()
        })
        .catch(error => {
          onError(error)
          this.redirect()
        })
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
