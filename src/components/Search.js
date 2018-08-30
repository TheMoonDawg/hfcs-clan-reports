import React, { Component } from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import TextField from "@material-ui/core/TextField"
import queryString from "query-string"
import { withStyles } from "@material-ui/core/styles"

const styles = ({ spacing }) => ({
  textField: {
    width: 200,
    marginBottom: spacing.unit,
  },
})

class Search extends Component {
  state = {
    id: "",
    name: "",
  }

  onChange = key => event => this.setState({ [key]: event.target.value })
  onIdChange = this.onChange("id")
  onNameChange = this.onChange("name")

  onSearch = () => {
    const { id, name } = this.state
    const {
      user: { cookieToken },
    } = this.props
    console.log("bloop", cookieToken)

    const params = { cookie_token: cookieToken, clan_id: id, clan_name: name }
    fetch(`../api/search?${queryString.stringify(params)}`)
      .then(result => result.json())
      .then(result => {
        console.log("SUCCESS!!!", result)
      })
      .catch(err => console.log("NAH CUZ", err))
  }

  render() {
    const { id, name } = this.state
    const { classes, user } = this.props

    return (
      <Card>
        <CardHeader title="Search" />
        <CardContent>
          <TextField
            className={classes.textField}
            label="Clan Id:"
            value={id}
            onChange={this.onIdChange}
            disabled={!user}
          />
          <br />
          <TextField
            className={classes.textField}
            label="Clan Name:"
            value={name}
            onChange={this.onNameChange}
            disabled={!user}
          />
        </CardContent>
        <CardActions>
          <Button variant="raised" onClick={this.onSearch} disabled={!user}>
            Search
          </Button>
          <Button variant="outlined" disabled={!user}>
            Last 50 Reports
          </Button>
          <Button variant="outlined" disabled={!user}>
            Your Last 100 Reports
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(Search)
