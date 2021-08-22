import { isWidthUp } from "@material-ui/core/withWidth"

export default function isDesktop(width) {
  return isWidthUp("md", width)
}
