import fs from '../../firebase/firebase'

export const setWorkDuration = (duration) => ({
  type: 'SET_WORK_DURATION',
  duration,
})

export const startSetWorkDuration = (duration) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setWorkDuration(duration))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { workDuration: duration } }, { merge: true })
  }
}

export const setShortBreakDuration = (duration) => ({
  type: 'SET_SHORT_BREAK_DURATION',
  duration,
})

export const startSetShortBreakDuration = (duration) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setShortBreakDuration(duration))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { shortBreakDuration: duration } }, { merge: true })
  }
}

export const setLongBreakDuration = (duration) => ({
  type: 'SET_LONG_BREAK_DURATION',
  duration,
})

export const startSetLongBreakDuration = (duration) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setLongBreakDuration(duration))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { longBreakDuration: duration } }, { merge: true })
  }
}

export const setRounds = (rounds) => ({
  type: 'SET_ROUNDS',
  rounds,
})

export const startSetRounds = (rounds) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setRounds(rounds))

    await fs.doc(`users/${uid}`).set({ settings: { rounds } }, { merge: true })
  }
}

export const setShowTimerInTitle = (showTimerInTitle) => ({
  type: 'SET_SHOW_TIMER_IN_TITLE',
  showTimerInTitle,
})

export const startSetShowTimerInTitle = (showTimerInTitle) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setShowTimerInTitle(showTimerInTitle))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { showTimerInTitle } }, { merge: true })
  }
}

export const setShowNotifications = (showNotifications) => ({
  type: 'SET_SHOW_NOTIFICATIONS',
  showNotifications,
})

export const startSetShowNotifications = (showNotifications) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setShowNotifications(showNotifications))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { showNotifications } }, { merge: true })
  }
}

export const setDarkMode = (darkMode) => ({
  type: 'SET_DARK_MODE',
  darkMode,
})

export const startSetDarkMode = (darkMode) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    localStorage.setItem('darkMode', +darkMode)

    dispatch(setDarkMode(darkMode))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { darkMode } }, { merge: true })
  }
}

export const setAutostart = (autostart) => ({
  type: 'SET_AUTOSTART',
  autostart,
})

export const startSetAutostart = (autostart) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setAutostart(autostart))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { autostart } }, { merge: true })
  }
}

export const setFirstDayOfTheWeek = (firstDayOfTheWeek) => ({
  type: 'SET_FIRST_DAY_OF_THE_WEEK',
  firstDayOfTheWeek,
})

export const startSetFirstDayOfTheWeek = (firstDayOfTheWeek) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setFirstDayOfTheWeek(firstDayOfTheWeek))

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { firstDayOfTheWeek } }, { merge: true })
  }
}

export const setAlarmSound = (sound) => ({
  type: 'SET_ALARM_SOUND',
  sound,
})

export const startSetAlarmSound = (sound) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setAlarmSound(sound))

    await fs.doc(`users/${uid}`).set({ settings: { alarmSound: sound } }, { merge: true })
  }
}

export const setAlarmVolume = (volume) => ({
  type: 'SET_ALARM_VOLUME',
  volume,
})

export const startSetAlarmVolume = (volume) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    localStorage.setItem('alarmVolume', volume)

    dispatch(setAlarmVolume(volume))

    await fs.doc(`users/${uid}`).set({ settings: { alarmVolume: volume } }, { merge: true })
  }
}

export const setAmbientWorkEnabled = (enabled) => ({
  type: 'SET_AMBIENT_WORK_ENABLED',
  enabled,
})

export const startSetAmbientWorkEnabled = (enabled) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setAmbientWorkEnabled(enabled))

    await fs.doc(`users/${uid}`).set({ settings: { ambientWorkEnabled: enabled } }, { merge: true })
  }
}

export const setAmbientBreakEnabled = (enabled) => ({
  type: 'SET_AMBIENT_BREAK_ENABLED',
  enabled,
})

export const startSetAmbientBreakEnabled = (enabled) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setAmbientBreakEnabled(enabled))

    await fs.doc(`users/${uid}`).set({ settings: { ambientBreakEnabled: enabled } }, { merge: true })
  }
}

export const setAmbientSoundWork = (sound) => ({
  type: 'SET_AMBIENT_SOUND_WORK',
  sound,
})

export const startSetAmbientSoundWork = (sound) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setAmbientSoundWork(sound))

    await fs.doc(`users/${uid}`).set({ settings: { ambientSoundWork: sound } }, { merge: true })
  }
}

export const setAmbientSoundBreak = (sound) => ({
  type: 'SET_AMBIENT_SOUND_BREAK',
  sound,
})

export const startSetAmbientSoundBreak = (sound) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(setAmbientSoundBreak(sound))

    await fs.doc(`users/${uid}`).set({ settings: { ambientSoundBreak: sound } }, { merge: true })
  }
}

export const setAmbientVolume = (volume) => ({
  type: 'SET_AMBIENT_VOLUME',
  volume,
})

export const startSetAmbientVolume = (volume) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    localStorage.setItem('ambientVolume', volume)

    dispatch(setAmbientVolume(volume))

    await fs.doc(`users/${uid}`).set({ settings: { ambientVolume: volume } }, { merge: true })
  }
}

export const setCustomAlarmSound = (data) => ({
  type: 'SET_CUSTOM_ALARM_SOUND',
  data,
})

export const startSetCustomAlarmSound = (data) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid
    const plan = getState().subscription.plan

    dispatch(setCustomAlarmSound(data))

    if (plan === 'pro') {
      await fs.doc(`users/${uid}`).set({ settings: { customAlarmSound: data } }, { merge: true })
    } else {
      localStorage.setItem('customAlarmSound', data)
    }
  }
}

export const setSettings = (settings) => ({
  type: 'SET_SETTINGS',
  settings,
})

export const startSetSettings = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    try {
      const docRef = await fs.doc(`users/${uid}`).get()
      let data = {}

      if (docRef.exists) {
        data = docRef.data().settings
      }

      const custom = localStorage.getItem('customAlarmSound')
      if (custom && !data.customAlarmSound) {
        data.customAlarmSound = custom
      }

      const alarmVolume = localStorage.getItem('alarmVolume')
      if (alarmVolume && !data.alarmVolume) {
        data.alarmVolume = +alarmVolume
      }

      const ambientVolume = localStorage.getItem('ambientVolume')
      if (ambientVolume && !data.ambientVolume) {
        data.ambientVolume = +ambientVolume
      }

      dispatch(setSettings(data))
    } catch (e) {
      dispatch(setSettings({}))
    }
  }
}
