import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MatCard from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import MatCardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import dayjs from 'dayjs'

export const GoalStreak = () => {
  const sessions = useSelector((state) => state.sessions)
  const { dailyGoal, weeklyGoal } = useSelector((state) => state.settings)

  if (!dailyGoal || !weeklyGoal) return null

  const getValue = (list, type) =>
    type === 'minutes'
      ? list.reduce((sum, s) => sum + s.duration.minutes, 0)
      : list.length

  const todaySessions = sessions.filter((s) =>
    dayjs(s.createdAt).isSame(dayjs(), 'day')
  )
  const weekSessions = sessions.filter((s) =>
    dayjs(s.createdAt).isAfter(dayjs().subtract(7, 'day'))
  )

  const dailyProgress = getValue(todaySessions, dailyGoal.type)
  const weeklyProgress = getValue(weekSessions, weeklyGoal.type)

  const calcStreak = () => {
    let streak = 0
    let day = dayjs()
    while (true) {
      const daySessions = sessions.filter((s) =>
        dayjs(s.createdAt).isSame(day, 'day')
      )
      const progress = getValue(daySessions, dailyGoal.type)
      if (progress >= dailyGoal.value && daySessions.length) {
        streak += 1
        day = day.subtract(1, 'day')
      } else {
        break
      }
    }
    return streak
  }

  const streak = calcStreak()

  return (
    <Card>
      <CardHeader title="Goals & Streak" />
      <CardContent>
        <Box mb={1}>Daily: {dailyProgress}/{dailyGoal.value}{' '}
        {dailyGoal.type === 'minutes' ? 'min' : 'sessions'}</Box>
        <Box mb={1}>Weekly: {weeklyProgress}/{weeklyGoal.value}{' '}
        {weeklyGoal.type === 'minutes' ? 'min' : 'sessions'}</Box>
        <Box>Current streak: {streak} days</Box>
      </CardContent>
    </Card>
  )
}

const Card = styled(MatCard)``
const CardContent = styled(MatCardContent)``
