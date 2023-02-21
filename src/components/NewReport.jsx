import React, { Component } from "react"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon, Tooltip,
  IconButton, TextField,
  MenuItem,
} from '@mui/material'


import SearchResults from "./SearchResults"


import classnames from "classnames"
import createReport from "../requests/createReport"
import getClanData from "../requests/getClanData"
import getReports from "../requests/getReports"
import { withStyles } from "@material-ui/core/styles"

const placeholderText =
  "Ex:\nClan Reported:\nCLAN NAME (id: 123456)\n\nClan Motto:\nCLAN MOTTO\n\nClan Mission Statement:\nCLAN MISSION STATEMENT"

const parseText = (report, regex) => {
  const value = regex.exec(report)
  return value ? value[1] : ""
}

const styles = ({ spacing, palette, breakpoints }) => ({
  card: {
    marginBottom: spacing.unit * 3,
  },
  container: {
    display: "flex",
    [breakpoints.down("md")]: { display: "block" },
  },
  reportContainer: {
    flex: 2,
    maxWidth: 600,
  },
  flex: {
    flex: 1,
  },
  margin: {
    marginBottom: spacing.unit,
  },
  textField200: {
    maxWidth: 200,
  },
  textField400: {
    maxWidth: 400,
  },
  textBoxContainer: {
    background: palette.secondary.main,
    borderRadius: 4,
    padding: spacing.unit,
  },
  parserContainer: {
    width: 250,
  },
  textFieldParser: {
    width: "100%",
  },
  parserClanIdContainer: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    width: spacing.unit * 4,
    height: spacing.unit * 4,
  },
})

const initState = {
  judgment: "Warning",
  id: "",
  name: "",
  motto: "",
  missionStatement: "",
  notes: "",
  parserClanId: "",
  parserQueue: placeholderText,
  required: false,
  results: null,
}

class NewReport extends Component {
  state = {
    ...initState,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && !prevState.region) {
      return { region: nextProps.user.region }
    }

    return null
  }

  getInitState = () => ({
    ...initState,
    region: this.props.user.region,
  })

  onChange = key => event => this.setState({ [key]: event.target.value })
  onJudgmentChange = this.onChange("judgment")
  onIdChange = this.onChange("id")
  onNameChange = this.onChange("name")
  onMottoChange = this.onChange("motto")
  onMissionStatementChange = this.onChange("missionStatement")
  onNotesChange = this.onChange("notes")
  onRegionChange = this.onChange("region")
  onParserClanIdChange = this.onChange("parserClanId")

  onFocus = () => this.setState({ parserQueue: "" })
  onBlur = () => this.setState({ parserQueue: placeholderText })
  onParse = e => {
    const report = e.target.value.split(" \n").join("\n")

    // RegEx for matching
    const idMatch = /[\s\S]*\(id: (.*)\)/
    const nameMatch = /[\s\S]*Clan Reported:[\s\S](.*)\(id:/
    const mottoMatch = /[\s\S]*Clan Motto:[\s\S](.*)/
    const statementMatch = /[\s\S]*Clan Mission Statement:[\s\S]([\s\S]*.*)/

    const clanId = parseText(report, idMatch)

    this.setState({
      ...this.getInitState(),
      id: clanId,
      name: parseText(report, nameMatch),
      motto: parseText(report, mottoMatch),
      missionStatement: parseText(report, statementMatch),
    })

    this.inputRef.blur()

    if (clanId) this.onFetchReports(clanId)
  }

  onIdBlur = () => this.onFetchReports(this.state.id)

  onFetchClanData = () => {
    const { parserClanId } = this.state
    const { user, onError } = this.props

    getClanData(user, parserClanId)
      .then(result => {
        this.setState({ ...this.getInitState(), ...result })
        this.onFetchReports(result.id)
      })
      .catch(onError)
  }

  onFetchReports = clanId => {
    const { user, onError } = this.props

    this.setState({ results: null })

    getReports(user, { clan_id: clanId })
      .then(result => {
        this.setState({ results: result })
      })
      .catch(onError)
  }

  onCreateReport = () => {
    const {
      id,
      name,
      motto,
      missionStatement,
      notes,
      judgment,
      region,
    } = this.state
    const { user, onOpenSnackbar, onError } = this.props

    if (!id.trim() || !name.trim()) {
      this.setState({ required: true })
      return
    } else {
      this.setState({ required: false })
    }

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
        onOpenSnackbar("Report successfully added!")
        this.setState(this.getInitState())
      })
      .catch(onError)
  }

  render() {
    const {
      judgment,
      id,
      name,
      motto,
      missionStatement,
      notes,
      region,
      parserClanId,
      parserQueue,
      required,
      results,
    } = this.state
    const { classes, user } = this.props
    const userName = user ? user.name : null

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader title={userName} />
          <CardContent>
            <div className={classes.container}>
              <div className={classes.reportContainer}>
                {/* Judgment */}
                <TextField
                  className={classnames(classes.margin, classes.textField200)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Judgment:"
                  disabled={!user}
                  value={judgment}
                  onChange={this.onJudgmentChange}
                >
                  <MenuItem value="Warning">Warning</MenuItem>
                  <MenuItem value="7 Day Ban">7 Day Ban</MenuItem>
                  <MenuItem value="30 Day Ban">30 Day Ban</MenuItem>
                  <MenuItem value="Permanent Ban">Permanent Ban</MenuItem>
                </TextField>

                <br />

                {/* Clan Id */}
                <TextField
                  type="number"
                  className={classnames(classes.margin, classes.textField200)}
                  fullWidth
                  label="Clan Id:"
                  required={required}
                  error={required}
                  disabled={!user}
                  value={id}
                  onChange={this.onIdChange}
                  onBlur={this.onIdBlur}
                />

                <br />

                {/* Clan Name */}
                <TextField
                  className={classnames(classes.margin, classes.textField400)}
                  fullWidth
                  label="Clan Name:"
                  required={required}
                  error={required}
                  disabled={!user}
                  value={name}
                  onChange={this.onNameChange}
                />

                <br />

                {/* Clan Motto */}
                <TextField
                  className={classnames(classes.margin, classes.textField400)}
                  fullWidth
                  label="Clan Motto:"
                  disabled={!user}
                  value={motto}
                  onChange={this.onMottoChange}
                />

                <br />

                {/* Clan Mission Statement */}
                <div
                  className={classnames(
                    classes.margin,
                    classes.textBoxContainer,
                  )}
                >
                  <TextField
                    fullWidth
                    multiline
                    rowsMax={6}
                    label="Clan Mission Statement:"
                    disabled={!user}
                    value={missionStatement}
                    onChange={this.onMissionStatementChange}
                  />
                </div>

                {/* Notes */}
                <div className={classes.textBoxContainer}>
                  <TextField
                    fullWidth
                    multiline
                    rowsMax={6}
                    label="Notes:"
                    disabled={!user}
                    value={notes}
                    onChange={this.onNotesChange}
                  />
                </div>

                <br />

                {/* Region */}
                <TextField
                  className={classnames(classes.margin, classes.textField200)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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
                  <MenuItem value="Polish">Polish</MenuItem>
                  <MenuItem value="Portuguese">Portuguese</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                </TextField>
              </div>

              <span className={classes.flex} />

              {/* Parsers */}
              <div className={classes.parserContainer}>
                {/* Clan Id Parser */}
                <div className={classes.parserClanIdContainer}>
                  <TextField
                    type="number"
                    className={classnames(
                      classes.margin,
                      classes.textFieldParser,
                    )}
                    label="Parser (Clan Id):"
                    disabled={!user}
                    value={parserClanId}
                    onChange={this.onParserClanIdChange}
                  />

                  <Tooltip
                    title="Get Clan Data"
                    disableFocusListener={!user}
                    disableTouchListener={!user}
                    disableHoverListener={!user}
                  >
                    <div>
                      <IconButton
                        className={classes.iconButton}
                        disabled={!user}
                        onClick={this.onFetchClanData}
                      >
                        <Icon>search</Icon>
                      </IconButton>
                    </div>
                  </Tooltip>
                </div>

                <br />

                {/* Report Queue Parser */}
                <div className={classes.textBoxContainer}>
                  <TextField
                    className={classes.textFieldParser}
                    inputRef={ref => (this.inputRef = ref)}
                    label="Parser (Report Queue):"
                    multiline
                    rows={9}
                    value={parserQueue}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={!user}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onParse}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="raised"
              color="primary"
              disabled={!user}
              onClick={this.onCreateReport}
            >
              Create Report
            </Button>
          </CardActions>
        </Card>

        {results && (
          <SearchResults title="Previous Offenses" results={results} />
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NewReport)
