export const initialState = {
  plan: 'free',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUBSCRIPTION':
      return { ...state, plan: action.plan }
    default:
      return state
  }
}
