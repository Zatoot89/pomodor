import { reducer, initialState } from '../reducer'

const sample = { id: '1', text: 'Task', completed: false }

test('should setup default tasks state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(initialState)
})

test('should add task', () => {
  const state = reducer(initialState, { type: 'ADD_TASK', task: sample })
  expect(state).toEqual([sample])
})

test('should edit task', () => {
  const state = reducer([sample], { type: 'EDIT_TASK', id: '1', text: 'New' })
  expect(state[0].text).toBe('New')
})

test('should toggle task', () => {
  const state = reducer([sample], { type: 'TOGGLE_TASK', id: '1' })
  expect(state[0].completed).toBe(true)
})

test('should clear tasks', () => {
  const state = reducer([sample], { type: 'CLEAR_TASKS' })
  expect(state).toEqual([])
})
