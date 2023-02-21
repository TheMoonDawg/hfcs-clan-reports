import React, { Component } from "react"
import { Box, Typography } from "@mui/material"


export default class AuthorizedUser extends Component {
  render() {
    const { classes, user, onLogOut } = this.props

    return (
      user && (
        <React.Fragment>
          <Box sx={{
            display: "block",
            textAlign: "right",
          }}>
            <Typography component='p' variant='subheading' color='inherit'>
              Welcome {user.name}!
            </Typography>
            <Typography

              component='p'
              variant='subheading'
              color='inherit'
              onClick={onLogOut}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Log Out
            </Typography>
          </Box>
          <Box component='img' src={user.avatarURL} alt='avatar' sx={{
            width: 45,
            height: 45,
            ml: 2,
          }} />
        </React.Fragment>
      )
    )
  }
}


