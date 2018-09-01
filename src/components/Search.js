import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import getReports from "../requests/getReports"
import SearchResults from "./SearchResults"

const styles = ({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 3
  },
  textField: {
    width: 200,
    marginBottom: spacing.unit
  }
})

class Search extends Component {
  state = {
    id: "",
    name: ""
  }

  onChange = key => event => this.setState({ [key]: event.target.value })
  onIdChange = this.onChange("id")
  onNameChange = this.onChange("name")

  onFetchReports = params => {
    const { user, onError } = this.props

    getReports(user, params)
      .then(result => {
        this.setState({ results: result })
      })
      .catch(onError)
  }

  onSearch = () => {
    const { id, name } = this.state
    const params = { clan_id: id.trim(), clan_name: name.trim() }
    this.onFetchReports(params)
  }

  onLast50Reports = () => {
    const params = { last_50_reports: true }
    this.onFetchReports(params)
  }

  onUserLast100Reports = () => {
    const params = { user_100_reports: true }
    this.onFetchReports(params)
  }

  render() {
    const { id, name, results } = this.state
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
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Search)
