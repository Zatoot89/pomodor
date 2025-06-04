export const initialState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 20,
  rounds: 4,
  showTimerInTitle: true,
  showNotifications: true,
  darkMode: false,
  autostart: false,
  firstDayOfTheWeek: 'Monday',
  alarmSound: 'chime.mp3',
  alarmVolume: 100,
  ambientWorkEnabled: false,
  ambientBreakEnabled: false,
  ambientSoundWork: 'rain.mp3',
  ambientSoundBreak: 'cafe.mp3',
  ambientVolume: 50,
  customAlarmSound: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WORK_DURATION':
      return {
        ...state,
        workDuration: action.duration,
      }
    case 'SET_SHORT_BREAK_DURATION':
      return {
        ...state,
        shortBreakDuration: action.duration,
      }
    case 'SET_LONG_BREAK_DURATION':
      return {
        ...state,
        longBreakDuration: action.duration,
      }
    case 'SET_ROUNDS':
      return {
        ...state,
        rounds: action.rounds,
      }
    case 'SET_SHOW_TIMER_IN_TITLE':
      return {
        ...state,
        showTimerInTitle: action.showTimerInTitle,
      }
    case 'SET_SHOW_NOTIFICATIONS':
      return {
        ...state,
        showNotifications: action.showNotifications,
      }
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.darkMode,
      }
    case 'SET_AUTOSTART':
      return {
        ...state,
        autostart: action.autostart,
      }
    case 'SET_ALARM_SOUND':
      return {
        ...state,
        alarmSound: action.sound,
      }
    case 'SET_ALARM_VOLUME':
      return {
        ...state,
        alarmVolume: action.volume,
      }
    case 'SET_AMBIENT_WORK_ENABLED':
      return {
        ...state,
        ambientWorkEnabled: action.enabled,
      }
    case 'SET_AMBIENT_BREAK_ENABLED':
      return {
        ...state,
        ambientBreakEnabled: action.enabled,
      }
    case 'SET_AMBIENT_SOUND_WORK':
      return {
        ...state,
        ambientSoundWork: action.sound,
      }
    case 'SET_AMBIENT_SOUND_BREAK':
      return {
        ...state,
        ambientSoundBreak: action.sound,
      }
    case 'SET_AMBIENT_VOLUME':
      return {
        ...state,
        ambientVolume: action.volume,
      }
    case 'SET_CUSTOM_ALARM_SOUND':
      return {
        ...state,
        customAlarmSound: action.data,
      }
    case 'SET_FIRST_DAY_OF_THE_WEEK':
      return {
        ...state,
        firstDayOfTheWeek: action.firstDayOfTheWeek,
      }
    case 'SET_SETTINGS':
      return {
        ...state,
        ...action.settings,
      }

    default:
      return state
  }
}
