import {
  Box,
  Divider,
  Drawer,
  Fade,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import background from '../images/background.jpg'

export default function AppMenu({ user, drawerOpen, toggleDrawer }) {
  // const width = useWidth()

  const [renderImage, setRenderImage] = useState(false)

  const resources = user ? { __html: user.resources } : null
  const desktopMode = true //isDesktop(width)
  const drawerVariant = desktopMode ? 'permanent' : 'temporary'

  return (
    <Drawer
      open={drawerOpen}
      onClose={toggleDrawer}
      variant={drawerVariant}
      sx={{
        position: 'relative',
        width: 240,
      }}
    >
      {desktopMode && <Box sx={(theme) => theme.mixins.toolbar} />}
      <List>
        <ListItem
          component={Link}
          to='/search'
          disablePadding
          sx={{ color: 'common.white' }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Icon>search</Icon>
            </ListItemIcon>
            <ListItemText primary='Search' />
          </ListItemButton>
        </ListItem>

        <ListItem
          component={Link}
          to='/new'
          disablePadding
          sx={{ color: 'common.white' }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Icon>create</Icon>
            </ListItemIcon>
            <ListItemText primary='New Report' />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {user && (
          <Typography variant='headline' sx={{ ml: 1, mb: 3 }}>
            Resources
          </Typography>
        )}
        <Box
          dangerouslySetInnerHTML={resources}
          sx={{
            ml: 1,
            '& > a': {
              display: 'block',
              color: 'common.white',
              textDecoration: 'none',
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
