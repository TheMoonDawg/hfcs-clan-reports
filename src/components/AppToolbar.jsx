import { Menu } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
// import useWidth from "../hooks/useWidth"
// import isDesktop from "../utils/isDesktop"
import AuthorizedUser from './AuthorizedUser'
import LoggedOut from './LoggedOut'

export default function AppToolbar({ user, toggleDrawer, onLogOut, onError }) {
  // const width = useWidth()
  const desktopMode = true //isDesktop(width)

  return (
    <AppBar
      position='absolute'
      color='primary'
      enableColorOnDark
      sx={({ zIndex }) => ({ zIndex: zIndex.drawer + 1 })}
    >
      <Toolbar sx={{ display: 'flex' }}>
        {desktopMode ? (
          <Typography>HFCS Clan Reports</Typography>
        ) : (
          <IconButton onClick={toggleDrawer} sx={{ mr: 1 }}>
            <Menu />
          </IconButton>
        )}

        <Box component='span' sx={{ flex: 1 }} />

        {user ? (
          <AuthorizedUser user={user} onLogOut={onLogOut} />
        ) : (
          <LoggedOut onError={onError} />
        )}
      </Toolbar>
    </AppBar>
  )
}
