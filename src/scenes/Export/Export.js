import React from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export const Export = () => {
  const sessions = useSelector((state) => state.sessions)
  const plan = useSelector((state) => state.subscription.plan)

  const exportCsv = () => {
    const rows = [
      ['id', 'duration', 'label', 'createdAt'],
      ...sessions.map((s) => [s.id, s.duration, s.label || '', s.createdAt]),
    ]
    const csvContent = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'sessions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (plan !== 'pro') {
    return (
      <div style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Export is a Pro feature
        </Typography>
        <Button variant="contained" color="secondary" href="/upgrade">
          Upgrade to Pro
        </Button>
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Export your sessions
      </Typography>
      <Button variant="contained" color="primary" onClick={exportCsv}>
        Download CSV
      </Button>
    </div>
  )
}
