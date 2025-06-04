import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box'
import MatFormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import styled, { css } from 'styled-components'
import { startSetDailyGoal, startSetWeeklyGoal } from '../../../data/settings/actions'
import { useTheme } from '@material-ui/core'

export const Goals = () => {
  const { dailyGoal, weeklyGoal, darkMode } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const [dailyType, setDailyType] = useState('pomodoros')
  const [dailyValue, setDailyValue] = useState(0)
  const [weeklyType, setWeeklyType] = useState('pomodoros')
  const [weeklyValue, setWeeklyValue] = useState(0)

  useEffect(() => {
    if (dailyGoal) {
      setDailyType(dailyGoal.type)
      setDailyValue(dailyGoal.value)
    }
  }, [dailyGoal])

  useEffect(() => {
    if (weeklyGoal) {
      setWeeklyType(weeklyGoal.type)
      setWeeklyValue(weeklyGoal.value)
    }
  }, [weeklyGoal])

  const handleDailyValueBlur = () => {
    dispatch(startSetDailyGoal({ type: dailyType, value: Number(dailyValue) }))
  }

  const handleWeeklyValueBlur = () => {
    dispatch(startSetWeeklyGoal({ type: weeklyType, value: Number(weeklyValue) }))
  }

  const theme = useTheme()
  const dark = +darkMode

  return (
    <div>
      <Box my={2}>
        <GoalFormControl variant="outlined" dark={dark} theme={theme}>
          <InputLabel id="daily-goal-type">Daily Goal</InputLabel>
          <Select
            labelId="daily-goal-type"
            value={dailyType}
            onChange={(e) => {
              setDailyType(e.target.value)
              dispatch(startSetDailyGoal({ type: e.target.value, value: Number(dailyValue) }))
            }}
            label="Daily Goal"
          >
            <MenuItem value="pomodoros">Pomodoros</MenuItem>
            <MenuItem value="minutes">Minutes</MenuItem>
          </Select>
        </GoalFormControl>
        <TextField
          type="number"
          variant="outlined"
          value={dailyValue}
          onChange={(e) => setDailyValue(e.target.value)}
          onBlur={handleDailyValueBlur}
          label="Value"
          fullWidth
          margin="dense"
        />
      </Box>

      <Box my={2}>
        <GoalFormControl variant="outlined" dark={dark} theme={theme}>
          <InputLabel id="weekly-goal-type">Weekly Goal</InputLabel>
          <Select
            labelId="weekly-goal-type"
            value={weeklyType}
            onChange={(e) => {
              setWeeklyType(e.target.value)
              dispatch(startSetWeeklyGoal({ type: e.target.value, value: Number(weeklyValue) }))
            }}
            label="Weekly Goal"
          >
            <MenuItem value="pomodoros">Pomodoros</MenuItem>
            <MenuItem value="minutes">Minutes</MenuItem>
          </Select>
        </GoalFormControl>
        <TextField
          type="number"
          variant="outlined"
          value={weeklyValue}
          onChange={(e) => setWeeklyValue(e.target.value)}
          onBlur={handleWeeklyValueBlur}
          label="Value"
          fullWidth
          margin="dense"
        />
      </Box>
    </div>
  )
}

const GoalFormControl = styled(MatFormControl)`
  width: 100%;

  ${({ dark, theme }) =>
    dark &&
    css`
      .MuiFormLabel-root.Mui-focused {
        color: ${theme.palette.primary.light};
      }

      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.palette.primary.light};
      }
    `}
`
