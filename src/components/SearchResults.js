import { format, parseISO } from "date-fns/fp"
import { flow } from "lodash"
import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core/styles"

const styles = ({ spacing }) => ({
  content: {
    overflow: "auto"
  },
  link: {
    textDecoration: "none"
  },
  iconButton: {
    width: spacing.unit * 4,
    height: spacing.unit * 4
  }
})

const generateLink = clanId =>
  `https://www.bungie.net/en/ClanV2/?groupid=${clanId}`

class SearchResults extends Component {
  render() {
    const { classes, title, results } = this.props

    return (
      <Card>
        <CardHeader title={`${title} - ${results.length} Reports`} />
        <CardContent className={classes.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="dense">Report Date</TableCell>
                <TableCell padding="dense">Clan Name</TableCell>
                <TableCell padding="dense">Motto</TableCell>
                <TableCell padding="dense">Mission Statement</TableCell>
                <TableCell padding="dense">Ninja</TableCell>
                <TableCell padding="dense">Judgment</TableCell>
                <TableCell padding="dense">Notes</TableCell>
                <TableCell padding="dense">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map(row => (
                <TableRow key={row.id}>
                  <TableCell padding="dense">
                    {flow(parseISO, format('Pp'))(row.reportDate)}
                  </TableCell>
                  <TableCell padding="dense">{row.clanName}</TableCell>
                  <TableCell padding="dense">{row.clanMotto}</TableCell>
                  <TableCell padding="dense">
                    {row.clanMissionStatement}
                  </TableCell>
                  <TableCell padding="dense">{row.ninja}</TableCell>
                  <TableCell padding="dense">{row.judgment}</TableCell>
                  <TableCell padding="dense">{row.notes}</TableCell>
                  <TableCell padding="dense">
                    <a
                      className={classes.link}
                      href={generateLink(row.clanId)}
                      target="_blank"
                    >
                      <IconButton className={classes.iconButton}>
                        <Icon>open_in_new</Icon>
                      </IconButton>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(SearchResults)
