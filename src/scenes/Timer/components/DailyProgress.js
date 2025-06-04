import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { CounterLabel } from './RoundsCounter'

export const DailyProgress = () => {
  const sessions = useSelector((state) => state.sessions)
  const { dailyGoal } = useSelector((state) => state.settings)

  if (!dailyGoal) return null

  const todaySessions = sessions.filter((s) =>
    dayjs(s.createdAt).isSame(dayjs(), 'day')
  )

  const progress = dailyGoal.type === 'minutes'
    ? todaySessions.reduce((sum, s) => sum + s.duration.minutes, 0)
    : todaySessions.length

  const total = dailyGoal.value || 0

  return (
    <ProgressLabel>
      {progress}/{total}{' '}
      {dailyGoal.type === 'minutes' ? 'min' : 'sessions'} today
    </ProgressLabel>
  )
}

const ProgressLabel = styled(CounterLabel)`
  margin-top: 4px;
`
