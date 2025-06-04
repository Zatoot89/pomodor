import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { SessionsTable } from '../SessionsTable'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'
import labels from '../../../../data/labels/tests/mock-data/labels'

describe('<SessionsTable />', () => {
  const shallow = createShallow()
  const createWrapper = () => shallow(<SessionsTable />)

  const createStore = () => {
    const store = {
      sessions,
      labels: { data: labels },
      settings: { darkMode: false },
    }

    jest.spyOn(redux, 'useSelector').mockImplementation((cb) => cb(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <SessionsTable /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render all sessions', () => {
    createStore()
    expect(createWrapper().find('TableRow').length - 1).toBe(sessions.length)
  })
})
