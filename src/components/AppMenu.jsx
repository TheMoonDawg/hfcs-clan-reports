import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Box,
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


// import useWidth from "../hooks/useWidth"
import background from "../images/background.jpg"
// import isDesktop from "../utils/isDesktop"


export default function AppMenu({ user, drawerOpen, toggleDrawer }) {

  // const width = useWidth()

  const [renderImage, setRenderImage] = useState(false)

  const resources = user ? { __html: user.resources } : null
  const desktopMode = true //isDesktop(width)
  const drawerVariant = desktopMode ? "permanent" : "temporary"

  return (
    <Drawer
      open={drawerOpen}
      onClose={toggleDrawer}
      variant={drawerVariant}
      // classes={{
      //   paper: classes.drawerPaper,
      // }}
      sx={{
        position: "relative",
        width: 240,
      }}
    >
      {desktopMode && <Box sx={theme => theme.mixins.toolbar} />}
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
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
        {user && (
          <Typography variant='headline' sx={{ ml: 1, mb: 3 }}>
            Resources
          </Typography>
        )}
        <Box

          dangerouslySetInnerHTML={resources}
          sx={{
            ml: 1,
            "& > a": {
              display: "block",
              color: 'common.white',
              textDecoration: "none",
              mb: 1,
            },
          }}
        />

        <Box component='span' sx={{ flex: 1 }} />

        <Fade in={renderImage} timeout={{ enter: 2000 }}>
          <img
            src={background}
            onLoad={() => {
              setRenderImage(true)
            }}
            alt='ninja'
          />
        </Fade>
      </Box>
    </Drawer>
  )
}
