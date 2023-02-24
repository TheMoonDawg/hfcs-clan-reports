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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import background from '../images/background.jpg'

export default function AppMenu({ user, drawerOpen, toggleDrawer }) {
  const [renderImage, setRenderImage] = useState(false)

  const theme = useTheme()
  const desktopMode = useMediaQuery(theme.breakpoints.up('sm'))

  const resources = user ? { __html: user.resources } : null
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
      <Box sx={(theme) => theme.mixins.toolbar} />
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
          pt: 1,
        }}
      >
        {resources && (
          <Typography variant='h5' color='text.secondary' sx={{ pl: 1, mb: 1 }}>
            Resources
          </Typography>
        )}

        <Box
          dangerouslySetInnerHTML={resources}
          sx={{
            pl: 1,
            '& > a': {
              display: 'block',
              color: 'common.white',
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
