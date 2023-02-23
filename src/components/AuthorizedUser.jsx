import { Box, Link, Typography } from '@mui/material'

export default function AuthorizedUser({ user, onLogOut }) {
  return (
    <>
      <Box sx={{ display: 'block', textAlign: 'right' }}>
        <Typography component='p' variant='subheading' color='inherit'>
          Welcome {user.name}!
        </Typography>

        <Link
          variant='subheading'
          color='inherit'
          onClick={onLogOut}
          sx={{ cursor: 'pointer' }}
        >
          Log Out
        </Link>
      </Box>

      <Box
        component='img'
        src={user.avatarURL}
        sx={{ width: 45, height: 45, ml: 2 }}
      />
    </>
  )
}
