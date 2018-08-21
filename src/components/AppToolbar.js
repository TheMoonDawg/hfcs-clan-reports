import React, { Component } from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const styles = ({ zIndex, spacing }) => ({
  appBar: {
    zIndex: zIndex.drawer + 1,
  },
  container: {
    display: "block",
    textAlign: "right",
  },
  flex: {
    flex: 1,
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
    const { classes, user } = this.props

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.flex} variant="title" color="inherit">
            HFCS Clan Reports
          </Typography>

          {user ? (
            <React.Fragment>
              <div className={classes.container}>
                <Typography variant="subheading" color="inherit">
                  Welcome {user.name}!
                </Typography>
                <Typography
                  className={classes.logOut}
                  variant="subheading"
                  color="inherit"
                >
                  Log Out
                </Typography>
              </div>
              <img
                className={classes.avatar}
                src={user.avatarUrl}
                alt="avatar"
              />
            </React.Fragment>
          ) : null}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(AppToolbar)
