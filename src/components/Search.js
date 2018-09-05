import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import MenuItem from "@material-ui/core/MenuItem"
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
    name: "",
    region: this.props.user ? this.props.user.region : "English"
  }

  onChange = key => event => this.setState({ [key]: event.target.value })
  onIdChange = this.onChange("id")
  onNameChange = this.onChange("name")
  onRegionChange = this.onChange("region")

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

  onLast100Reports = () => {
    const params = { last_100_reports: true }
    this.onFetchReports(params)
  }

  onLast100RegionalReports = () => {
    const { region } = this.state
    const params = { region, last_100_regional_reports: true }
    this.onFetchReports(params)
  }

  onUserLast100Reports = () => {
    const params = { user_100_reports: true }
    this.onFetchReports(params)
  }

  render() {
    const { id, name, region, results } = this.state
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
              disabled={!user}
              value={id}
              onChange={this.onIdChange}
            />

            <br />

            <TextField
              className={classes.textField}
              label="Clan Name:"
              disabled={!user}
              value={name}
              onChange={this.onNameChange}
            />

            <br />

            <TextField
              className={classes.textField}
              select
              label="Region:"
              disabled={!user}
              value={region}
              onChange={this.onRegionChange}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="Italian">Italian</MenuItem>
              <MenuItem value="Portuguese">Portuguese</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </TextField>
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
              onClick={this.onLast100Reports}
              disabled={!user}
            >
              Last 100 Reports
            </Button>
            <Button
              variant="outlined"
              onClick={this.onLast100RegionalReports}
              disabled={!user}
            >
              Last 100 Regional Reports
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
