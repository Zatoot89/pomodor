import React, { useState } from 'react'
// Custom alarm and ambient sounds should be added to
// `src/scenes/Timer/assets` before using the related options.
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import Box from '@material-ui/core/Box'
import MatFormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core'
import { SettingSlider } from './components/Slider'
import { Switch } from './components/Switch'
import {
  startSetAlarmSound,
  startSetAlarmVolume,
  startSetCustomAlarmSound,
  startSetAmbientWorkEnabled,
  startSetAmbientBreakEnabled,
  startSetAmbientSoundWork,
  startSetAmbientSoundBreak,
  startSetAmbientVolume,
} from '../../data/settings/actions'

export const SoundSettings = () => {
  const {
    alarmSound,
    alarmVolume,
    ambientWorkEnabled,
    ambientBreakEnabled,
    ambientSoundWork,
    ambientSoundBreak,
    ambientVolume,
  } = useSelector((state) => state.settings)

  const dispatch = useDispatch()
  const theme = useTheme()
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      dispatch(startSetCustomAlarmSound(reader.result))
      dispatch(startSetAlarmSound('custom'))
    }
    reader.readAsDataURL(file)
  }

  return (
    <Box my={2}>
      <Typography id="alarm-select" gutterBottom>
        Alarm sound
      </Typography>
      <FormControl variant="outlined" dark={darkMode || darkModeCached} theme={theme}>
        <Select value={alarmSound} onChange={(e) => dispatch(startSetAlarmSound(e.target.value))} labelId="alarm-select">
          <MenuItem value="chime.mp3">Default</MenuItem>
          <MenuItem value="beep.mp3">Beep</MenuItem>
          <MenuItem value="bell.mp3">Bell</MenuItem>
          <MenuItem value="digital.mp3">Digital</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </FormControl>
      {alarmSound === 'custom' && (
        <input type="file" accept="audio/*" onChange={handleFile} />
      )}
      <Box mt={2}>
        <SettingSlider
          value={alarmVolume}
          onChange={(e, val) => dispatch(startSetAlarmVolume(val))}
          step={1}
          min={0}
          max={100}
          valueLabelDisplay="auto"
          aria-labelledby="alarm-volume"
          getAriaValueText={(v) => `${v}%`}
          theme={theme}
          dark={darkMode || darkModeCached}
        />
      </Box>
      <Box mt={3}>
        <Switch name="Ambient during work" action={startSetAmbientWorkEnabled} checked={ambientWorkEnabled} />
        <Switch name="Ambient during break" action={startSetAmbientBreakEnabled} checked={ambientBreakEnabled} />
        {ambientWorkEnabled && (
          <FormControl variant="outlined" dark={darkMode || darkModeCached} theme={theme}>
            <InputLabel id="ambient-work">Work sound</InputLabel>
            <Select value={ambientSoundWork} labelId="ambient-work" onChange={(e) => dispatch(startSetAmbientSoundWork(e.target.value))} label="Work sound">
              <MenuItem value="rain.mp3">Gentle Rain</MenuItem>
              <MenuItem value="cafe.mp3">Cafe Ambiance</MenuItem>
              <MenuItem value="white-noise.mp3">White Noise</MenuItem>
            </Select>
          </FormControl>
        )}
        {ambientBreakEnabled && (
          <FormControl variant="outlined" dark={darkMode || darkModeCached} theme={theme}>
            <InputLabel id="ambient-break">Break sound</InputLabel>
            <Select value={ambientSoundBreak} labelId="ambient-break" onChange={(e) => dispatch(startSetAmbientSoundBreak(e.target.value))} label="Break sound">
              <MenuItem value="rain.mp3">Gentle Rain</MenuItem>
              <MenuItem value="cafe.mp3">Cafe Ambiance</MenuItem>
              <MenuItem value="white-noise.mp3">White Noise</MenuItem>
            </Select>
          </FormControl>
        )}
        <Box mt={2}>
          <Typography id="ambient-volume" gutterBottom>
            Ambient volume
          </Typography>
          <SettingSlider
            value={ambientVolume}
            onChange={(e, val) => dispatch(startSetAmbientVolume(val))}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            getAriaValueText={(v) => `${v}%`}
            aria-labelledby="ambient-volume"
            theme={theme}
            dark={darkMode || darkModeCached}
          />
        </Box>
      </Box>
    </Box>
  )
}

const FormControl = styled(MatFormControl)`
  width: 100%;
  margin-bottom: 16px;

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
`;

