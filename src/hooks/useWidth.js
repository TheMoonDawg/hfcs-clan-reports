import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

// Pulled from
// https://next.material-ui.com/components/use-media-query/#migrating-from-withwidth
export default function useWidth() {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || "xs"
  )
}
