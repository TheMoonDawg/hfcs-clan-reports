import grey from '@mui/material/colors/grey'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      light: '#209CE0',
      main: '##264557',
      dark: '#103346',
      contrastText: '#FFF',
    },
    background: {
      paper: '#383838',
      default: '#292929',
    },
    secondary: grey,
    mode: 'dark',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
        size: 'small',
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        disableInteractive: true,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'always',
        color: 'link',
      },
    },
  },
})
