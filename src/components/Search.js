import React, { Component } from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import ErrorSnackbar from "./ErrorSnackbar"
import SearchResults from "./SearchResults"
import TextField from "@material-ui/core/TextField"
import getReports from "../requests/getReports"
import { withStyles } from "@material-ui/core/styles"

const styles = ({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 3,
  },
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

  fetchReports = params => {
    const { user } = this.props
    getReports(user, params)
      .then(result => {
        this.setState({ results: result })
      })
      .catch(message =>
        this.setState({
          open: true,
          message,
        }),
      )
  }

  onSearch = () => {
    const { id, name } = this.state
    const params = { clan_id: id.trim(), clan_name: name.trim() }
    this.fetchReports(params)
  }

  onLast50Reports = () => {
    const params = { last_50_reports: true }
    this.fetchReports(params)
  }

  onUserLast100Reports = () => {
    const params = { user_100_reports: true }
    this.fetchReports(params)
  }

  onCloseSnackbar = () => this.setState({ open: false })

  render() {
    const { id, name, results, open, message } = this.state
    const { classes, user } = this.props

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader title="Search" />
          <CardContent>
            <TextField
              type="number"
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
            <Button
              variant="raised"
              color="primary"
              onClick={this.onSearch}
              disabled={!user || (!id.trim() && !name.trim())}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={this.onLast50Reports}
              disabled={!user}
            >
              Last 50 Reports
            </Button>
            <Button
              variant="outlined"
              onClick={this.onUserLast100Reports}
              disabled={!user}
            >
              Your Last 100 Reports
            </Button>
          </CardActions>
        </Card>

        {results && <SearchResults title="Search Results" results={results} />}

        <ErrorSnackbar
          open={open}
          message={message}
          onClose={this.onCloseSnackbar}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Search)
