import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core'
import {
  Card as MatCard,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import styled from 'styled-components'
import dayjs from 'dayjs'

export const SessionsTable = () => {
  const sessions = useSelector((state) => state.sessions)
  const labels = useSelector((state) => state.labels.data)
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const theme = useTheme()

  const getLabelName = (id) => {
    const label = labels.find((l) => l.id === id)
    return label ? label.name : '-'
  }

  const formatDuration = ({ minutes, seconds }) => {
    return `${minutes}m ${seconds}s`
  }

  return (
    <Card theme={theme} dark={darkMode}>
      <CardHeader title="Sessions" />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Label</TableCell>
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  {dayjs(session.createdAt).format('MMM D, YYYY HH:mm')}
                </TableCell>
                <TableCell>{getLabelName(session.label)}</TableCell>
                <TableCell align="right">
                  {formatDuration(session.duration)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const Card = styled(MatCard)`
  background: ${({ dark }) => (dark ? '#252525' : '#fff')};
  overflow-x: auto;
`
