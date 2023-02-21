import React, { Component } from "react"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
} from '@mui/material'



import getReports from "../requests/getReports"
import SearchResults from "./SearchResults"


export default class Search extends Component {
  state = {
    id: "",
    name: "",
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && !prevState.region) {
      return { region: nextProps.user.region }
    }

    return null
  }

  onChange = (key) => (event) => this.setState({ [key]: event.target.value })
  onIdChange = this.onChange("id")
  onNameChange = this.onChange("name")
  onRegionChange = this.onChange("region")

  onFetchReports = (params) => {
    const { user, onError } = this.props

    getReports(user, params)
      .then((result) => {
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
    const { user } = this.props

    return (
      <React.Fragment>
        <Card sx={{ mb: 3 }}>
          <CardHeader title='Search' />
          <CardContent>
            <TextField
              type='number'
              sx={{
                width: 200,
                mb: 1,
              }}
              label='Clan Id:'
              disabled={!user}
              value={id}
              onChange={this.onIdChange}
            />

            <br />

            <TextField
              sx={{
                width: 200,
                mb: 1,
              }}
              label='Clan Name:'
              disabled={!user}
              value={name}
              onChange={this.onNameChange}
            />

            <br />

            <TextField
              sx={{
                width: 200,
                mb: 1,
              }}
              InputLabelProps={{ shrink: true }}
              select
              label='Region:'
              disabled={!user}
              value={region}
              onChange={this.onRegionChange}
            >
              <MenuItem value='English'>English</MenuItem>
              <MenuItem value='French'>French</MenuItem>
              <MenuItem value='German'>German</MenuItem>
              <MenuItem value='Italian'>Italian</MenuItem>
              <MenuItem value='Polish'>Polish</MenuItem>
              <MenuItem value='Portuguese'>Portuguese</MenuItem>
              <MenuItem value='Spanish'>Spanish</MenuItem>
            </TextField>
          </CardContent>
          <CardActions>
            <Box sx={{
              display: "flex",
              flexWrap: "wrap",
            }}>
              <Button
                sx={{ m: .5 }}
                variant='contained'
                color='primary'
                onClick={this.onSearch}
                disabled={!user || (!id.trim() && !name.trim())}
              >
                Search
              </Button>
              <Button
                sx={{ m: .5 }}
                variant='outlined'
                onClick={this.onLast100Reports}
                disabled={!user}
              >
                Last 100 Reports
              </Button>
              <Button
                sx={{ m: .5 }}
                variant='outlined'
                onClick={this.onLast100RegionalReports}
                disabled={!user}
              >
                Last 100 Regional Reports
              </Button>
              <Button
                sx={{ m: .5 }}
                variant='outlined'
                onClick={this.onUserLast100Reports}
                disabled={!user}
              >
                Your Last 100 Reports
              </Button>
            </Box>
          </CardActions>
        </Card>

        {results && <SearchResults title='Search Results' results={results} />}
      </React.Fragment>
    )
  }
}


