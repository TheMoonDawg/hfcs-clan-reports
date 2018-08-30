import React, { PureComponent } from "react"

import Snackbar from "@material-ui/core/Snackbar"

class ErrorSnackbar extends PureComponent {
  onClose = (_e, reason) => {
    if (reason === "timeout") this.props.onClose()
  }

  render() {
    const { open, message } = this.props

    return (
      <Snackbar
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

export default ErrorSnackbar
