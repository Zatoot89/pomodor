export default [
  {
    id: '1',
    label: 'Study',
    duration: { seconds: 0, minutes: 25 },
    tasks: [
      { id: 't1', text: 'Read', completed: true },
      { id: 't2', text: 'Write', completed: false },
    ],
    createdAt: 1586815200000,
  },
  {
    id: '2',
    label: 'Play the guitar',
    duration: { seconds: 0, minutes: 25 },
    tasks: [{ id: 't3', text: 'Practice chords', completed: false }],
    createdAt: 1586901600000,
  },
  {
    id: '3',
    label: 'Clean the room',
    duration: { seconds: 0, minutes: 25 },
    tasks: [],
    createdAt: 1585778400000,
  },
]
