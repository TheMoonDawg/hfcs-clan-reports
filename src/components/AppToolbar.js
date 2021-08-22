import React from "react"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import useWidth from "../hooks/useWidth"
import isDesktop from "../utils/isDesktop"
import AuthorizedUser from "./AuthorizedUser"
import LoggedOut from "./LoggedOut"

const useStyles = makeStyles(({ zIndex, spacing }) => ({
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
}))

export default function AppToolbar({ user, toggleDrawer, onLogOut, onError }) {
  const classes = useStyles()
  const width = useWidth()

  return (
    <AppBar position='absolute' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isDesktop(width) ? (
          <Typography variant='title' color='inherit'>
            HFCS Clan Reports
          </Typography>
        ) : (
          <IconButton className={classes.iconButton} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}

        <span className={classes.flex} />

        {user ? (
          <AuthorizedUser user={user} onLogOut={onLogOut} />
        ) : (
          <LoggedOut onError={onError} />
        )}
      </Toolbar>
    </AppBar>
  )
}
