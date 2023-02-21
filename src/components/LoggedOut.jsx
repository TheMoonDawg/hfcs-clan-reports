import React, { Component } from "react"

import getClientId from "../requests/getClientId"
import { Box } from "@mui/material"


export default class LoggedOut extends Component {
  state = {}

  componentDidMount() {
    const { onError } = this.props

    if (!this.state.clientId) {
      getClientId()
        .then(clientId => this.setState({ clientId }))
        .catch(onError)
    }
  }

  render() {

    const { clientId } = this.state
    const link = clientId
      ? `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`
      : ""

    return (
      link && (
        <Box component='a' href={link} sx={{ color: 'common.white' }}>
          Log In
        </Box>
      )
    )
  }
}


