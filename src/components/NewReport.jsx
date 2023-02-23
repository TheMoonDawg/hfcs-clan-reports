import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { createReport, getClanData, getReports } from '../api'
import SearchResults from './SearchResults'

const parseText = (report, regex) => {
  const value = regex.exec(report)
  return value ? value[1] : ''
}

const DEFAULT_VALUES = {
  judgment: 'Warning',
  id: '',
  name: '',
  motto: '',
  missionStatement: '',
  notes: '',
  region: '',
}

const PLACEHOLDER_TEXT =
  'Ex:\nClan Reported:\nCLAN NAME (id: 123456)\n\nClan Motto:\nCLAN MOTTO\n\nClan Mission Statement:\nCLAN MISSION STATEMENT'

export default function NewReport({ user, onError, onOpenSnackbar }) {
  const [
    { judgment, id, name, motto, missionStatement, notes, region },
    setForm,
  ] = useState(DEFAULT_VALUES)
  const [parserClanId, setParserClanId] = useState('')
  const [results, setResults] = useState(null)
  const [errored, setErrored] = useState(false)

  const queueRef = useRef()

  useEffect(() => {
    if (user && !region) {
      setForm((form) => ({ ...form, region: user.region }))
    }
  }, [user, region])

  const onFormChange = (key) => (event) => {
    setForm((form) => ({ ...form, [key]: event.target.value }))
  }

  const onParse = (e) => {
    const report = e.target.value.split(' \n').join('\n')

    // RegEx for matching
    const idMatch = /[\s\S]*\(id: (.*)\)/
    const nameMatch = /[\s\S]*Clan Reported:[\s\S](.*)\(id:/
    const mottoMatch = /[\s\S]*Clan Motto:[\s\S](.*)/
    const statementMatch = /[\s\S]*Clan Mission Statement:[\s\S]([\s\S]*.*)/

    const clanId = parseText(report, idMatch)

    setForm({
      ...DEFAULT_VALUES,
      id: clanId,
      name: parseText(report, nameMatch),
      motto: parseText(report, mottoMatch),
      missionStatement: parseText(report, statementMatch),
    })

    queueRef.current.blur()

    if (clanId) {
      onFetchReports(clanId)
    }
  }

  const onIdBlur = () => {
    if (id.trim()) {
      onFetchReports(id)
    }
  }

  const onFetchClanData = () => {
    getClanData(user, parserClanId)
      .then((result) => {
        setForm({ ...DEFAULT_VALUES, ...result })
        onFetchReports(result.id)
      })
      .catch(onError)
  }

  const onFetchReports = (clanId) => {
    setResults(null)

    getReports(user, { clan_id: clanId })
      .then((results) => setResults(results))
      .catch(onError)
  }

  const onCreateReport = () => {
    if (!id.trim() || !name.trim()) {
      setErrored(true)
    } else {
      setErrored(false)

      const body = {
        id,
        name,
        motto,
        missionStatement,
        notes,
        judgment,
        region,
      }

      createReport(user, body)
        .then(() => {
          onOpenSnackbar('Report successfully added!')
          setForm(DEFAULT_VALUES)
          setParserClanId('')
          setResults(null)
        })
        .catch(onError)
    }
  }

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader title={user?.name} />

        <CardContent>
          <Stack direction='row' justifyContent='space-between'>
            {/* Form */}
            <Grid container columnSpacing={1} sx={{ width: 600 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  label='Judgment:'
                  disabled={!user}
                  value={judgment}
                  onChange={onFormChange('judgment')}
                >
                  <MenuItem value='Warning'>Warning</MenuItem>
                  <MenuItem value='7 Day Ban'>7 Day Ban</MenuItem>
                  <MenuItem value='30 Day Ban'>30 Day Ban</MenuItem>
                  <MenuItem value='Permanent Ban'>Permanent Ban</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  label='Region:'
                  disabled={!user}
                  value={region}
                  onChange={onFormChange('region')}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='German'>German</MenuItem>
                  <MenuItem value='Italian'>Italian</MenuItem>
                  <MenuItem value='Polish'>Polish</MenuItem>
                  <MenuItem value='Portuguese'>Portuguese</MenuItem>
                  <MenuItem value='Spanish'>Spanish</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  type='number'
                  fullWidth
                  label='Clan Id:'
                  required
                  error={errored}
                  disabled={!user}
                  value={id}
                  onChange={onFormChange('id')}
                  onBlur={onIdBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Clan Name:'
                  required
                  error={errored}
                  disabled={!user}
                  value={name}
                  onChange={onFormChange('name')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Clan Motto:'
                  disabled={!user}
                  value={motto}
                  onChange={onFormChange('motto')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rowsMax={6}
                  label='Clan Mission Statement:'
                  disabled={!user}
                  value={missionStatement}
                  onChange={onFormChange('missionStatement')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rowsMax={6}
                  label='Notes:'
                  disabled={!user}
                  value={notes}
                  onChange={onFormChange('notes')}
                />
              </Grid>
            </Grid>

            {/* Parsers */}
            <Stack spacing={2}>
              <Stack direction='row' spacing={1}>
                <TextField
                  type='number'
                  label='Parser (Clan Id):'
                  disabled={!user}
                  value={parserClanId}
                  onChange={(e) => setParserClanId(e.target.value)}
                />

                <Tooltip
                  title='Get Clan Data'
                  disableFocusListener={!user}
                  disableTouchListener={!user}
                  disableHoverListener={!user}
                >
                  <span>
                    <IconButton disabled={!user} onClick={onFetchClanData}>
                      <Icon>search</Icon>
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>

              <TextField
                ref={queueRef}
                label='Parser (Report Queue):'
                multiline
                rows={9}
                placeholder={PLACEHOLDER_TEXT}
                disabled={!user}
                onChange={onParse}
                value=''
              />
            </Stack>
          </Stack>
        </CardContent>

        <CardActions>
          <Button
            variant='contained'
            color='primary'
            disabled={!user}
            onClick={onCreateReport}
          >
            Create Report
          </Button>
        </CardActions>
      </Card>

      {results && <SearchResults title='Previous Offenses' results={results} />}
    </>
  )
}
