import { addTask, editTask, toggleTask, clearTasks } from '../actions'

const task = { id: '1', text: 'Task', completed: false }

test('should create addTask action', () => {
  expect(addTask(task)).toEqual({ type: 'ADD_TASK', task })
})

test('should create editTask action', () => {
  expect(editTask('1', 'New')).toEqual({
    type: 'EDIT_TASK',
    id: '1',
    text: 'New',
  })
})

test('should create toggleTask action', () => {
  expect(toggleTask('1')).toEqual({ type: 'TOGGLE_TASK', id: '1' })
})

test('should create clearTasks action', () => {
  expect(clearTasks()).toEqual({ type: 'CLEAR_TASKS' })
})
