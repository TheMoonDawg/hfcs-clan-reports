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
  },
  toolbar: theme.mixins.toolbar,
})

class AppLayout extends Component {
  render() {
    const { classes, user, children } = this.props

    return (
      <div className={classes.root}>
        <AppToolbar user={user} />
        <AppMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(AppLayout)
