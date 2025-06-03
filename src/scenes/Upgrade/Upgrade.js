import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { startSetSubscription } from '../../data/subscription/actions'

export const Upgrade = () => {
  const dispatch = useDispatch()

  const upgrade = () => {
    // Placeholder for payment integration
    dispatch(startSetSubscription('pro'))
  }

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Upgrade to Pro
      </Typography>
      <Typography paragraph>
        Unlock advanced features like exporting your session history and more.
      </Typography>
      <Button variant="contained" color="primary" onClick={upgrade}>
        Upgrade Now
      </Button>
    </div>
  )
}
