import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { format, parseISO } from 'date-fns/fp'
import { flow } from 'lodash'

const generateLink = (clanId) =>
  `https://www.bungie.net/en/ClanV2/?groupid=${clanId}`

export default function SearchResults({ title, results }) {
  return (
    <Card>
      <CardHeader title={`${title} - ${results.length} Reports`} />

      <CardContent sx={{ overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='dense'>Report Date</TableCell>
              <TableCell padding='dense'>Clan Name</TableCell>
              <TableCell padding='dense'>Motto</TableCell>
              <TableCell padding='dense'>Mission Statement</TableCell>
              <TableCell padding='dense'>Ninja</TableCell>
              <TableCell padding='dense'>Judgment</TableCell>
              <TableCell padding='dense'>Notes</TableCell>
              <TableCell padding='dense'>Link</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {results.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding='dense'>
                  {flow(parseISO, format('Pp'))(row.reportDate)}
                </TableCell>
                <TableCell padding='dense'>{row.clanName}</TableCell>
                <TableCell padding='dense'>{row.clanMotto}</TableCell>
                <TableCell padding='dense'>
                  {row.clanMissionStatement}
                </TableCell>
                <TableCell padding='dense'>{row.ninja}</TableCell>
                <TableCell padding='dense'>{row.judgment}</TableCell>
                <TableCell padding='dense'>{row.notes}</TableCell>
                <TableCell padding='dense'>
                  <Box
                    component='a'
                    href={generateLink(row.clanId)}
                    target='_blank'
                    rel='noreferrer'
                    sx={{ textDecoration: 'none' }}
                  >
                    <IconButton sx={{ width: 32, height: 32 }}>
                      <Icon>open_in_new</Icon>
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
