export const addTask = (task) => ({
  type: 'ADD_TASK',
  task,
})

export const editTask = (id, text) => ({
  type: 'EDIT_TASK',
  id,
  text,
})

export const toggleTask = (id) => ({
  type: 'TOGGLE_TASK',
  id,
})

export const clearTasks = () => ({
  type: 'CLEAR_TASKS',
})
