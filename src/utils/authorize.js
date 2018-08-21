import React, { Component } from "react"

class AuthorizedApp extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.setState({
      user: {
        name: "MoonDawg",
        avatarUrl:
          "http://www.bungie.net/img/profile/avatars/admin/MoondawgNEW_Ninja.gif",
      },
    })
  }

  render() {
    const { App, ...props } = this.props
    const { user } = this.state

    return <App user={user} {...props} />
  }
}

export default App => () => <AuthorizedApp App={App} />
