import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Divider,
  Drawer,
  Fade,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'


import { makeStyles } from "@material-ui/core/styles"
import useWidth from "../hooks/useWidth"
import background from "../images/background.jpg"
// import isDesktop from "../utils/isDesktop"

const useStyles = makeStyles(({ mixins, spacing, palette }) => ({
  drawerPaper: {
    position: "relative",
    width: 240,
  },
  toolbar: mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  resourcesLabel: {
    marginLeft: spacing.unit,
    marginBottom: spacing.unit * 3,
  },
  resourcesContainer: {
    marginLeft: spacing.unit,

    "& > a": {
      display: "block",
      color: palette.common.white,
      textDecoration: "none",
      marginBottom: spacing.unit,
    },
  },
  flex: {
    flex: 1,
  },
}))

export default function AppMenu({ user, drawerOpen, toggleDrawer }) {
  const classes = useStyles()
  const width = useWidth()

  const [renderImage, setRenderImage] = useState(false)

  const resources = user ? { __html: user.resources } : null
  const desktopMode = true //isDesktop(width)
  const drawerVariant = desktopMode ? "permanent" : "temporary"

  return (
    <Drawer
      open={drawerOpen}
      onClose={toggleDrawer}
      variant={drawerVariant}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {desktopMode && <div className={classes.toolbar} />}
      <List>
        <Link sx={{
          textDecoration: "none",
          color: "inherit",
        }} to='/search'>
          <ListItem button>
            <ListItemIcon>
              <Icon>search</Icon>
            </ListItemIcon>
            <ListItemText primary='Search' />
          </ListItem>
        </Link>
        <Link sx={{
          textDecoration: "none",
          color: "inherit",
        }} to='/new'>
          <ListItem button>
            <ListItemIcon>
              <Icon>create</Icon>
            </ListItemIcon>
            <ListItemText primary='New Report' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List />
      <div className={classes.container}>
        {user && (
          <Typography variant='headline' className={classes.resourcesLabel}>
            Resources
          </Typography>
        )}
        <div
          className={classes.resourcesContainer}
          dangerouslySetInnerHTML={resources}
        />

        <span className={classes.flex} />

        <Fade in={renderImage} timeout={{ enter: 2000 }}>
          <img
            src={background}
            onLoad={() => {
              setRenderImage(true)
            }}
            alt='ninja'
          />
        </Fade>
      </div>
    </Drawer>
  )
}
