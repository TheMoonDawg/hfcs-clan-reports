import React, { Component } from "react"

import AppMenu from "./AppMenu"
import AppToolbar from "./AppToolbar"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    display: "flex",
    zIndex: 1,
    height: "100%",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    overflow: "auto",
  },
  toolbar: theme.mixins.toolbar,
})

class AppLayout extends Component {
  state = { drawerOpen: false }

  toggleDrawer = () =>
    this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }))

  render() {
    const { drawerOpen } = this.state
    const { classes, user, onLogOut, onError, children } = this.props

    return (
      <div className={classes.root}>
        <AppToolbar
          user={user}
          toggleDrawer={this.toggleDrawer}
          onLogOut={onLogOut}
          onError={onError}
        />
        <AppMenu
          user={user}
          drawerOpen={drawerOpen}
          toggleDrawer={this.toggleDrawer}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(AppLayout)
