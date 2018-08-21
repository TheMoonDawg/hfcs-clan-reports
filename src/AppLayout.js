import React, { Component } from "react"

import AppBar from "@material-ui/core/AppBar"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Fade from "@material-ui/core/Fade"
import Icon from "@material-ui/core/Icon"
import { Link } from "react-router-dom"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import background from "./images/background.jpg"
import { withStyles } from "@material-ui/core/styles"

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: "flex",
    zIndex: 1,
    height: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  flex: {
    flex: 1,
  },
})

class AppLayout extends Component {
  state = {
    renderImage: false,
  }

  componentDidMount() {
    let img = document.querySelector("img")
    if (img.complete) this.renderImage()
    else img.addEventListener("load", this.renderImage)
  }

  componentWillUnmount() {
    let img = document.querySelector("img")
    img.removeEventListener("load", this.renderImage)
  }

  renderImage = () => this.setState({ renderImage: true })

  render() {
    const { renderImage } = this.state
    const { classes, children } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              HFCS Clan Reports
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <Link className={classes.link} to="/search">
              <ListItem button>
                <ListItemIcon>
                  <Icon>search</Icon>
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItem>
            </Link>
            <Link className={classes.link} to="/new">
              <ListItem button>
                <ListItemIcon>
                  <Icon>create</Icon>
                </ListItemIcon>
                <ListItemText primary="New Report" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List />

          <div className={classes.container}>
            <span className={classes.flex} />

            {/* Have image be hidden until resource is loaded */}
            {renderImage ? (
              <Fade in timeout={{ enter: 2000 }}>
                <img src={background} alt="ninja" alt="ninja" />
              </Fade>
            ) : (
              <img style={{ display: "none" }} src={background} alt="ninja" />
            )}
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(AppLayout)
