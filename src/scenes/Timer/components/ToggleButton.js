import React, { useEffect, useRef } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { useTheme } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNextTimer,
  setStatus,
  setTimeLeft,
  setProgress,
  pauseTimer,
  saveInterval,
} from '../data/timer/actions'
import { STATUSES, TYPES, setTitle } from '../data/timer/reducer'
import chime from '../assets/chime.mp3'
// The following audio files are optional and should be placed in
// `src/scenes/Timer/assets` if available.
// import beep from '../assets/beep.mp3'
// import bell from '../assets/bell.mp3'
// import digital from '../assets/digital.mp3'
// import rain from '../assets/rain.mp3'
// import cafe from '../assets/cafe.mp3'
// import whiteNoise from '../assets/white-noise.mp3'
import work from '../assets/work.png'
import alarm from '../assets/alarm.png'
import coffee from '../assets/coffee.png'
import { startAddSession } from '../../../data/sessions/actions'
import { clearTasks } from '../../../data/tasks/actions'
import useMounted from '../../../helpers/useMounted'

export const ToggleButton = () => {
  const { status, timeLeft, type } = useSelector((state) => state.timer)
  const settings = useSelector((state) => state.settings)

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  const label = useSelector((state) => state.labels.labelSelected)
  const tasks = useSelector((state) => state.tasks)

  const dispatch = useDispatch()

  const alarmAudio = useRef(null)
  const ambientAudio = useRef(null)

  const getAlarmSrc = () => {
    if (settings.alarmSound === 'custom' && settings.customAlarmSound) {
      return settings.customAlarmSound
    }
    switch (settings.alarmSound) {
      // case 'beep.mp3':
      //   return beep // add beep.mp3 to assets to enable
      // case 'bell.mp3':
      //   return bell // add bell.mp3 to assets to enable
      // case 'digital.mp3':
      //   return digital // add digital.mp3 to assets to enable
      default:
        return chime
    }
  }

  const getAmbientSrc = (sound) => {
    switch (sound) {
      // case 'rain.mp3':
      //   return rain // add rain.mp3 to assets to enable
      // case 'cafe.mp3':
      //   return cafe // add cafe.mp3 to assets to enable
      // case 'white-noise.mp3':
      //   return whiteNoise // add white-noise.mp3 to assets to enable
      default:
        return null
    }
  }

  const startAmbient = () => {
    if (ambientAudio.current) {
      ambientAudio.current.pause()
      ambientAudio.current = null
    }

    let src = null
    if (type === TYPES.work && settings.ambientWorkEnabled) {
      src = getAmbientSrc(settings.ambientSoundWork)
    } else if (type !== TYPES.work && settings.ambientBreakEnabled) {
      src = getAmbientSrc(settings.ambientSoundBreak)
    }

    if (src) {
      ambientAudio.current = new Audio(src)
      ambientAudio.current.loop = true
      ambientAudio.current.volume = settings.ambientVolume / 100
      ambientAudio.current.play()
      window.currentAmbientAudio = ambientAudio.current
    }
  }

  const stopAmbient = () => {
    if (ambientAudio.current) {
      ambientAudio.current.pause()
      ambientAudio.current = null
      window.currentAmbientAudio = null
    }
  }

  const startTimer = () => {
    if (status === STATUSES.running) return

    if (settings.showNotifications && 'Notification' in window) {
      Notification.requestPermission()
    }

    dispatch(setStatus(STATUSES.running))
    startAmbient()

    const endTime = new Date(
      new Date().getTime() + timeLeft.minutes * 60000 + timeLeft.seconds * 1000
    )

    const duration = getTimerDuration()

    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTime)
      const calculatedProgress = calculateProgress(duration, calculatedTimeLeft)

      dispatch(setTimeLeft(calculatedTimeLeft))
      dispatch(setProgress(calculatedProgress))

      if (settings.showTimerInTitle) {
        setTitle(type, calculatedTimeLeft)
      }

      if (!calculatedProgress) {
        if (type === TYPES.work) {
          dispatch(
            startAddSession({
              label: label ? label.id : null,
              duration: { minutes: settings.workDuration, seconds: 0 },
              tasks,
              createdAt: Date.now(),
            })
          )
          dispatch(clearTasks())
        }

        setTimeout(async () => {
          dispatch(setNextTimer(settings))

          stopAmbient()
          alarmAudio.current = new Audio(getAlarmSrc())
          alarmAudio.current.volume = settings.alarmVolume / 100
          alarmAudio.current.play()

          if (
            settings.showNotifications &&
            'Notification' in window &&
            Notification.permission === 'granted'
          ) {
            const msg =
              type === TYPES.work ? 'Take a break ☕️' : 'Start working 👨‍💻'

            const icon = type === TYPES.work ? coffee : work

            const registration = await navigator.serviceWorker.ready

            registration.showNotification(msg, {
              vibrate: [100, 50, 100],
              badge: alarm,
              icon,
            })
          }
        }, 1000)

        clearInterval(interval)
      }
    }, 200)

    dispatch(saveInterval(interval))
  }

  const calculateTimeLeft = (endTime) => {
    const difference = +endTime - +new Date()
    let timeLeft = { minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const calculateProgress = (duration, timeLeft) => {
    const secondsTotal = duration * 60
    const secondsLeft = timeLeft.minutes * 60 + timeLeft.seconds

    return 100 / (secondsTotal / secondsLeft)
  }

  const getTimerDuration = () => {
    switch (type) {
      case TYPES.work:
        return settings.workDuration
      case TYPES.shortBreak:
        return settings.shortBreakDuration
      case TYPES.longBreak:
        return settings.longBreakDuration
      default:
        break
    }
  }

  const theme = useTheme()
  const isMount = useMounted()

  useEffect(() => {
    if (isMount) return

    if (settings.autostart) {
      startTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <Box display="flex" justifyContent="center">
      {status !== STATUSES.running && (
        <ActionIcon
          disabled={!timeLeft}
          aria-label="start timer"
          onClick={startTimer}
          color="primary"
          dark={darkMode || darkModeCached}
          theme={theme}
        >
          <PlayArrowIcon />
        </ActionIcon>
      )}

      {status === STATUSES.running && (
        <ActionIcon
          color="primary"
          aria-label="pause timer"
          dark={darkMode || darkModeCached}
          theme={theme}
          onClick={() => {
            stopAmbient()
            dispatch(pauseTimer())
          }}
        >
          <PauseIcon />
        </ActionIcon>
      )}
    </Box>
  )
}

export const ActionIcon = styled(IconButton)`
  color: ${({ dark, theme }) =>
    dark ? theme.palette.primary.light : theme.palette.primary.main};

  border: 1px solid
    ${({ dark, theme }) =>
      dark ? theme.palette.primary.light : theme.palette.primary.main};
`
