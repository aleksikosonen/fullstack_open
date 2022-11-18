import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'

const Authors = ({show, token}) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')
  const [error, setError] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError('Error editing author')
      setTimeout(() => {
        setError('')
      }, 3000)
    },
  })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading..</div>
  }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    // Fixes 400 error in adding a book"
    const parsedYear = parseInt(bornYear)
    console.log(parsedYear)

    editAuthor({ variables: { name, setBornTo: parsedYear } })
    console.log('editauthor')

    setName('')
    setBornYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <div>
          <h2>Set birthyear</h2>
          <Notify errorMessage={error} />
          <form onSubmit={submit}>
            <div className='form-label'>name</div>
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
              className='input'
            >
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
            <div>
              <div className='form-label'>born</div>
              <input
                value={bornYear}
                onChange={({ target }) => setBornYear(target.value)}
                className='input'
              />
            </div>
            <button type='submit' className='button-primary'>
              update author
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
