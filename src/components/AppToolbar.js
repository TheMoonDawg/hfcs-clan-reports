import React, { Component } from "react"

import AppBar from "@material-ui/core/AppBar"
import AuthorizedUser from "./AuthorizedUser"
import IconButton from "@material-ui/core/IconButton"
import LoggedOut from "./LoggedOut"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { compose } from "recompose"
import isDesktop from "../utils/isDesktop"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"

const styles = ({ zIndex, spacing }) => ({
  appBar: {
    zIndex: zIndex.drawer + 1,
  },
  toolbar: {
    display: "flex",
  },
  flex: {
    flex: 1,
  },
  iconButton: {
    marginRight: spacing.unit,
  },
  logOut: {
    cursor: "pointer",
    textDecoration: "underline",
  },
  avatar: {
    width: 45,
    height: 45,
    marginLeft: spacing.unit * 2,
  },
})

class AppToolbar extends Component {
  render() {
    const { classes, user, toggleDrawer, onLogOut, onError, width } = this.props

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {isDesktop(width) ? (
            <Typography variant="title" color="inherit">
              HFCS Clan Reports YEE
            </Typography>
          ) : (
            <IconButton className={classes.iconButton} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          <span className={classes.flex} />
          <p>flex?</p>

          {user ? (
            <AuthorizedUser user={user} onLogOut={onLogOut} />
          ) : (
            <LoggedOut onError={onError} />
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(styles),
)(AppToolbar)
