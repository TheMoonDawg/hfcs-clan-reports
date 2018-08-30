import React, { Component } from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import classnames from "classnames"
import createReport from "../requests/createReport"
import { withStyles } from "@material-ui/core/styles"

const placeholderText =
  "Ex:\nClan Reported:\nCLAN NAME (id: 123456)\n\nClan Motto:\nCLAN MOTTO\n\nClan Mission Statement:\nCLAN MISSION STATEMENT"

const styles = ({ spacing, palette }) => ({
  container: {
    display: "flex",
  },
  flex: {
    flex: 1,
  },
  margin: {
    marginBottom: spacing.unit,
  },
  textField200: {
    width: 200,
  },
  textField400: {
    width: 400,
  },
  textField600: {
    width: 600,
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
  parserQueue: "",
  required: false,
}

class NewReport extends Component {
  state = {
    ...initState,
  }

  onChange = key => event => this.setState({ [key]: event.target.value })
  onJudgmentChange = this.onChange("judgment")
  onIdChange = this.onChange("id")
  onNameChange = this.onChange("name")
  onMottoChange = this.onChange("motto")
  onMissionStatementChange = this.onChange("missionStatement")
  onNotesChange = this.onChange("notes")

  onCreateReport = () => {
    const { id, name } = this.state

    if (!id.trim() || !name.trim()) {
      this.setState({ required: true })
      return
    }

    alert("u gud")
    this.setState({ required: false })
  }

  render() {
    const {
      judgment,
      id,
      name,
      motto,
      missionStatement,
      notes,
      parserClanId,
      parserQueue,
      required,
    } = this.state
    const { classes, user } = this.props
    const userName = user ? user.name : null

    return (
      <Card>
        <CardHeader title={userName} />
        <CardContent>
          <div className={classes.container}>
            <div>
              <TextField
                className={classnames(classes.margin, classes.textField200)}
                select
                label="Judgment:"
                value={judgment}
                onChange={this.onJudgmentChange}
                disabled={!user}
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
                label="Clan Id:"
                value={id}
                onChange={this.onIdChange}
                required={required}
                error={required}
                disabled={!user}
              />

              <br />

              {/* Clan Name */}
              <TextField
                className={classnames(classes.margin, classes.textField400)}
                label="Clan Name:"
                value={name}
                onChange={this.onNameChange}
                required={required}
                error={required}
                disabled={!user}
              />

              <br />

              {/* Clan Motto */}
              <TextField
                className={classnames(classes.margin, classes.textField400)}
                label="Clan Motto:"
                value={motto}
                onChange={this.onMottoChange}
                disabled={!user}
              />

              <br />

              {/* Clan Mission Statement */}
              <div
                className={classnames(classes.margin, classes.textBoxContainer)}
              >
                <TextField
                  className={classes.textField600}
                  multiline
                  rowsMax={6}
                  label="Clan Mission Statement:"
                  value={missionStatement}
                  onChange={this.onMissionStatementChange}
                  disabled={!user}
                />
              </div>

              {/* Notes */}
              <div className={classes.textBoxContainer}>
                <TextField
                  className={classes.textField600}
                  multiline
                  rowsMax={6}
                  label="Notes:"
                  value={notes}
                  onChange={this.onNotesChange}
                  disabled={!user}
                />
              </div>
            </div>

            <span className={classes.flex} />

            {/* Parsers */}
            <div className={classes.parserContainer}>
              {/* Clan Id Parser */}
              <div className={classes.parserClanIdContainer}>
                <TextField
                  className={classnames(
                    classes.margin,
                    classes.textFieldParser,
                  )}
                  label="Parser (Clan Id):"
                  disabled={!user}
                />

                <IconButton className={classes.iconButton} disabled={!user}>
                  <Icon>search</Icon>
                </IconButton>
              </div>

              <br />

              {/* Report Queue Parser */}
              <div className={classes.textBoxContainer}>
                <TextField
                  className={classes.textFieldParser}
                  label="Parser (Report Queue):"
                  multiline
                  value={placeholderText}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={!user}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="raised"
            onClick={this.onCreateReport}
            disabled={!user}
          >
            Create Report
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(NewReport)
