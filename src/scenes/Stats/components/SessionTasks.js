import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export const SessionTasks = () => {
  const sessions = useSelector((state) => state.sessions)
  if (!sessions || !sessions.length) return null

  return (
    <Box mt={4}>
      <Typography variant="h6">Tasks</Typography>
      {sessions.map((s) => (
        <Box key={s.id} my={2}>
          <Typography variant="subtitle2">
            {new Date(s.createdAt).toLocaleString()}
          </Typography>
          {s.tasks && s.tasks.length > 0 && (
            <List dense>
              {s.tasks.map((t) => (
                <ListItem key={t.id}>
                  <Checkbox checked={t.completed} disabled />
                  <ListItemText primary={t.text} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Box>
  )
}
