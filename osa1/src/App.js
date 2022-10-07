import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVotedIndex, setMostVotedIndex] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const generateNewAnecdote = () => {
    const maxValue = anecdotes.length
    const newIndex = Math.floor(Math.random() * maxValue)
    setSelected(newIndex)
  }

  useEffect(() => {
    points.forEach((value, index) => {
      if (value > mostVotes) {
        setMostVotes(value)
        setMostVotedIndex(index)
      }
    })
  })

  const voteForAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>Has {points[selected]} points</div>
      <button
        onClick={() => {
          voteForAnecdote()
        }}
      >
        Vote
      </button>
      <button
        onClick={() => {
          generateNewAnecdote()
        }}
      >
        Next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      {mostVotes !== 0 && (
        <div>
          <div>{anecdotes[mostVotedIndex]}</div>
          <div>Has {mostVotes} votes</div>
        </div>
      )}
    </div>
  )
}

export default App
