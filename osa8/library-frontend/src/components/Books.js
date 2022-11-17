import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState('all')

  if (!props.show) {
    return null
  }

  if (result.loading) {
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
}

export default Books
