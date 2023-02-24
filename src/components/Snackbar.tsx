import { Snackbar as MUISnackbar } from '@mui/material'

type Props = {
  open: boolean
  message: string
  onClose: () => void
}

export default function Snackbar({ open, message, onClose }: Props) {
  const handleClose = (_e: React.SyntheticEvent, reason: string) => {
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
