import React, { Component } from "react"

import { withStyles } from "@material-ui/core/styles"

const styles = ({ palette }) => ({
  link: {
    color: palette.common.white,
  },
})

class LoggedOut extends Component {
  render() {
    const { classes } = this.props
    // const clientId = 24432 // Test
    const clientId = 21650 // Live

    return (
      <a
        className={classes.link}
        href={`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`}
      >
        Log In
      </a>
    )
  }
}

export default withStyles(styles)(LoggedOut)
