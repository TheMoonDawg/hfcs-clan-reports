import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import AppMenu from "./AppMenu"
import AppToolbar from "./AppToolbar"

const styles = theme => ({
  root: {
    display: "flex",
    zIndex: 1,
    height: "100%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    overflow: "auto"
  },
  toolbar: theme.mixins.toolbar
})

class AppLayout extends Component {
  render() {
    const { classes, user, onLogOut, children } = this.props

    return (
      <div className={classes.root}>
        <AppToolbar user={user} onLogOut={onLogOut} />
        <AppMenu user={user} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(AppLayout)
