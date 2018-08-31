import { createMuiTheme } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"

export default createMuiTheme({
  palette: {
    primary: {
      light: "#209CE0",
      main: "#103346",
      dark: "#103346",
      contrastText: "#FFF",
    },
    secondary: grey,
    type: "dark",
  },
})
