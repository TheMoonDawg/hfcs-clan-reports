import React, { Component } from "react"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const styles = ({ spacing }) => ({
  container: {
    display: "block",
    textAlign: "right"
  },
  logOut: {
    cursor: "pointer",
    textDecoration: "underline"
  },
  avatar: {
    width: 45,
    height: 45,
    marginLeft: spacing.unit * 2
  }
})

class AuthorizedUser extends Component {
  render() {
    const { classes, user, onLogOut } = this.props

    return (
      user && (
        <React.Fragment>
          <div className={classes.container}>
            <Typography variant="subheading" color="inherit">
              Welcome {user.name}!
            </Typography>
            <Typography
              className={classes.logOut}
              variant="subheading"
              color="inherit"
              onClick={onLogOut}
            >
              Log Out
            </Typography>
          </div>
          <img className={classes.avatar} src={user.avatarURL} alt="avatar" />
        </React.Fragment>
      )
    )
  }
}

export default withStyles(styles)(AuthorizedUser)
