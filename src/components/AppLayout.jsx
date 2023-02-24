import { Box } from '@mui/material'
import { useState } from 'react'
import AppMenu from './AppMenu'
import AppToolbar from './AppToolbar'

export default function AppLayout({ user, onLogOut, onError, children }) {
  const [drawerOpen, setDrawerOpen] = useState()

  const toggleDrawer = () => setDrawerOpen((open) => !open)

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <AppToolbar
        user={user}
        toggleDrawer={toggleDrawer}
        onLogOut={onLogOut}
        onError={onError}
      />

      <AppMenu
        user={user}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />

      <Box
        sx={{
          flex: 1,
          backgroundColor: 'background.default',
          p: 2,
          overflow: 'auto',
        }}
      >
        <Box sx={({ mixins }) => mixins.toolbar} />
        {children}
      </Box>
    </Box>
  )
}
