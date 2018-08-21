import React, { Component } from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import TextField from "@material-ui/core/TextField"
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

  render() {
    const { id, name } = this.state
    const { classes } = this.props

    return (
      <Card>
        <CardHeader title="Search" />
        <CardContent>
          <TextField
            className={classes.textField}
            label="Clan Id:"
            value={id}
            onChange={this.onIdChange}
          />
          <br />
          <TextField
            className={classes.textField}
            label="Clan Name:"
            value={name}
            onChange={this.onNameChange}
          />
        </CardContent>
        <CardActions>
          <Button variant="raised">Search</Button>
          <Button variant="outlined">Last 50 Reports</Button>
          <Button variant="outlined">Your Last 100 Reports</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(Search)
