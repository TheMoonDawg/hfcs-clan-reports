import React, { PureComponent } from "react"
import MUISnackbar from "@material-ui/core/Snackbar"

class Snackbar extends PureComponent {
  onClose = (_e, reason) => {
    if (reason === "timeout") this.props.onClose()
  }

  render() {
    const { open, message } = this.props

    return (
      <MUISnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        message={message}
        autoHideDuration={5000}
        onClose={this.onClose}
      />
    )
  }
}

export default Snackbar
