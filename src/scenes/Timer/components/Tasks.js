import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { addTask, editTask, toggleTask } from '../../data/tasks/actions'
import { TYPES } from '../data/timer/reducer'

export const Tasks = () => {
  const { type } = useSelector((state) => state.timer)
  const tasks = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  if (type !== TYPES.work) return null

  const onAdd = (e) => {
    e.preventDefault()
    const text = value.trim()
    if (!text || tasks.length >= 5) return
    dispatch(addTask({ id: Date.now().toString(), text, completed: false }))
    setValue('')
  }

  return (
    <Box mt={2}>
      <form onSubmit={onAdd}>
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add task"
            fullWidth
          />
          <IconButton
            type="submit"
            aria-label="add task"
            disabled={tasks.length >= 5}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </form>
      {tasks.map((task) => (
        <Box key={task.id} display="flex" alignItems="center" mt={1}>
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.id))}
            color="primary"
          />
          <TextField
            value={task.text}
            onChange={(e) => dispatch(editTask(task.id, e.target.value))}
            size="small"
            fullWidth
          />
        </Box>
      ))}
    </Box>
  )
}
