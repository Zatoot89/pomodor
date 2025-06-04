export const initialState = []

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.task]
    case 'EDIT_TASK':
      return state.map((t) =>
        t.id === action.id ? { ...t, text: action.text } : t
      )
    case 'TOGGLE_TASK':
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      )
    case 'CLEAR_TASKS':
      return []
    default:
      return state
  }
}
