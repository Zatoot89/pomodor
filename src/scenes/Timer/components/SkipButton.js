import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import SkipNext from '@material-ui/icons/SkipNext'
import { useDispatch, useSelector } from 'react-redux'
import { setNextTimer } from '../data/timer/actions'
import { clearTasks } from '../../../data/tasks/actions'

export const SkipButton = () => {
  const { timeLeft } = useSelector((state) => state.timer)
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const handleSkip = () => {
    // 1) Stop any playing ambient audio
    if (window.currentAmbientAudio) {
      window.currentAmbientAudio.pause()
      window.currentAmbientAudio = null
    }

    // 2) Advance to the next timer
    dispatch(setNextTimer(settings))

    // 3) Clear all current tasks
    dispatch(clearTasks())
  }

  return (
    <ActionIcon
      disabled={!timeLeft}
      aria-label="Skip current timer"
      onClick={handleSkip}
      size="small"
    >
      <SkipNext />
    </ActionIcon>
  )
}

export const ActionIcon = styled(IconButton)`
  border: 1px solid #bababa;
`
