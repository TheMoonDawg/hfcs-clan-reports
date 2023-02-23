import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getReports } from '../api'
import SearchResults from './SearchResults'

export default function Search({ user, onError }) {
  const [clanId, setClanId] = useState('')
  const [clanName, setClanName] = useState('')
  const [region, setRegion] = useState('')
  const [results, setResults] = useState(null)

  useEffect(() => {
    if (user && !region) {
      setRegion(user.region)
    }
  }, [user, region])

  const onFetchReports = (params) => {
    getReports(user, params)
      .then((results) => setResults(results))
      .catch(onError)
  }

  const onSearch = () => {
    const params = {
      region,
      clan_id: clanId.trim(),
      clan_name: clanName.trim(),
    }
    onFetchReports(params)
  }

  const onLast100Reports = () => {
    const params = { last_100_reports: true }
    onFetchReports(params)
  }

  const onLast100RegionalReports = () => {
    const params = { region, last_100_regional_reports: true }
    onFetchReports(params)
  }

  const onUserLast100Reports = () => {
    const params = { user_100_reports: true }
    onFetchReports(params)
  }

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader title='Search' />

        <CardContent>
          <Stack direction='row' spacing={1}>
            <TextField
              type='number'
              label='Clan ID'
              disabled={!user}
              value={clanId}
              onChange={(e) => setClanId(e.target.value)}
              sx={{ width: 200 }}
            />

            <TextField
              type='number'
              label='Clan Name'
              disabled={!user}
              value={clanName}
              onChange={(e) => setClanName(e.target.value)}
              sx={{ width: 300 }}
            />

            <TextField
              select
              label='Region'
              disabled={!user}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              sx={{ width: 200 }}
            >
              <MenuItem value='English'>English</MenuItem>
              <MenuItem value='French'>French</MenuItem>
              <MenuItem value='German'>German</MenuItem>
              <MenuItem value='Italian'>Italian</MenuItem>
              <MenuItem value='Polish'>Polish</MenuItem>
              <MenuItem value='Portuguese'>Portuguese</MenuItem>
              <MenuItem value='Spanish'>Spanish</MenuItem>
            </TextField>
          </Stack>
        </CardContent>

        <CardActions>
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={1}>
            <Button
              variant='contained'
              color='primary'
              onClick={onSearch}
              disabled={!user || !(clanId.trim() || clanName.trim())}
            >
              Search
            </Button>

            <Button
              variant='outlined'
              onClick={onLast100Reports}
              disabled={!user}
            >
              Last 100 Reports
            </Button>

            <Button
              variant='outlined'
              onClick={onLast100RegionalReports}
              disabled={!user}
            >
              Last 100 Regional Reports
            </Button>

            <Button
              variant='outlined'
              onClick={onUserLast100Reports}
              disabled={!user}
            >
              Your Last 100 Reports
            </Button>
          </Stack>
        </CardActions>
      </Card>

      {results && <SearchResults title='Search Results' results={results} />}
    </>
  )
}
