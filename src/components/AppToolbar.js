import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import AuthorizedUser from "./AuthorizedUser"
import LoggedOut from "./LoggedOut"

const styles = ({ zIndex, spacing }) => ({
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  container: {
    display: "block",
    textAlign: "right"
  },
  flex: {
    flex: 1
  },
  logOut: {
    cursor: "pointer",
    textDecoration: "underline"
  },
  avatar: {
    width: 45,
    height: 45,
    marginLeft: spacing.unit * 2
  }
})

class AppToolbar extends Component {
  render() {
    const { classes, user, onLogOut } = this.props

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.flex} variant="title" color="inherit">
            HFCS Clan Reports
          </Typography>

          {user ? (
            <AuthorizedUser user={user} onLogOut={onLogOut} />
          ) : (
            <LoggedOut />
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(AppToolbar)
