import { Snackbar as MUISnackbar } from '@mui/material'

export default function Snackbar({ open, message, onClose }) {
  const handleClose = (_e, reason) => {
    if (reason === 'timeout') {
      onClose()
    }
  }

  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      message={message}
      autoHideDuration={5000}
      disableWindowBlurListener
      onClose={handleClose}
    />
  )
}
