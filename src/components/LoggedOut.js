import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import getClientId from "../requests/getClientId"

const styles = ({ palette }) => ({
  link: {
    color: palette.common.white
  }
})

class LoggedOut extends Component {
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
    const { classes } = this.props
    const { clientId } = this.state
    const link = clientId
      ? `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`
      : ""

    return (
      link && (
        <a className={classes.link} href={link}>
          Log In
        </a>
      )
    )
  }
}

export default withStyles(styles)(LoggedOut)
