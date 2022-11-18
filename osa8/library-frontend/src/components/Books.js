import { ALL_BOOKS, ME } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const loggedUser = useQuery(ME)
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [booksWithSelectedGenre, setBooksWithSelectedeGenre] = useState([])
  const [allBooks, { data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (selectedGenre !== 'all') {
      allBooks({
        variables: { genre: selectedGenre },
      })
    } else {
      allBooks()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre])

  useEffect(() => {
    setBooksWithSelectedeGenre(data)
  }, [data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading..</div>
  }

  if (loggedUser.loading || allBooks.loading) {
    return <div>loading..</div>
  }

  const books = result.data.allBooks
  const genres = books.flatMap((book) => book.genres)
  const uniqueGenres = [...new Set(genres.map((genre) => genre))]
  uniqueGenres.sort((a, b) => a.localeCompare(b)).push('all')

  return (
    <div>
      <h2>books</h2>
      {selectedGenre !== 'all' && <div>in genre {selectedGenre}</div>}
      {booksWithSelectedGenre && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksWithSelectedGenre.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {uniqueGenres.map((genre) => (
        <button
          onClick={() => {
            setSelectedGenre(genre)
          }}
          key={genre}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books

/*
 return (
    <div>
      <h2>books</h2>
      {selectedGenre !== 'all' && <div>in genre {selectedGenre}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(selectedGenre) || selectedGenre === 'all')
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button
          onClick={() => {
            setSelectedGenre(genre)
          }}
          key={genre}
        >
          {genre}
        </button>
      ))}
    </div>
  )
*/
