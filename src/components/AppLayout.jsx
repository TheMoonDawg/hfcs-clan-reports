import { useState } from "react"

import AppMenu from "./AppMenu"
import AppToolbar from "./AppToolbar"

import { Box } from '@mui/material'

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

export default function AppLayout({ user, onLogOut, onError, children }) {
  const [drawerOpen, setDrawerOpen] = useState()

  const toggleDrawer = () => setDrawerOpen(open => !open)

  return (
    <Box sx={{
      display: "flex",
      zIndex: 1,
      height: "100%",
    }}>
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
      <Box sx={{
        flexGrow: 1,
        backgroundColor: 'background.default',
        p: 3,
        minWidth: 0, // So the Typography noWrap works
        overflow: "auto",
      }}>
        {/* <Box component='span' sx={{({mixins}) => ({})}} /> */}
        {children}
      </Box>
    </Box>
  )

}


