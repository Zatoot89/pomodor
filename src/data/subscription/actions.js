export const setSubscription = (plan) => ({
  type: 'SET_SUBSCRIPTION',
  plan,
})

export const startLoadSubscription = () => (dispatch) => {
  const plan = localStorage.getItem('subscription') || 'free'
  dispatch(setSubscription(plan))
}

export const startSetSubscription = (plan) => (dispatch) => {
  localStorage.setItem('subscription', plan)
  dispatch(setSubscription(plan))
}
