import React, { Component } from "react"

class AuthorizedApp extends Component {
  componentDidMount() {
    const user = {
      name: "MoonDawg",
      avatarUrl:
        "http://www.bungie.net/img/profile/avatars/admin/MoondawgNEW_Ninja.gif",
    }

    localStorage["user"] = JSON.stringify(user)
  }

  render() {
    const { App, ...props } = this.props

    return <App {...props} />
  }
}

export default App => () => <AuthorizedApp App={App} />
