import { connect } from 'react-redux'
import { createAnectodte } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnectodte(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAnectodte: (value) => {
      dispatch(createAnectodte(value))
      showNotification(`Added ${value}`)
    },
  }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
