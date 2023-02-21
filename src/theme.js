import grey from "@mui/material/colors/grey"
import { createTheme } from "@mui/material/styles"

export default createTheme({
  palette: {
    primary: {
      light: "#209CE0",
      main: "#103346",
      dark: "#103346",
      contrastText: "#FFF"
    },
    secondary: grey,
    type: "dark"
  }
})
