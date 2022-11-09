import { useSelector, useDispatch } from 'react-redux'
import { likeAnectodte, voteCreator } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes).slice().sort((a,b)=> {return (b.votes - a.votes)})
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(likeAnectodte(anecdote))
    dispatch(showNotification(`Voted ${anecdote.content}`))
  }

  return (
    <div>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
