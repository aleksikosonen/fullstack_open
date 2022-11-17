import { ALL_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const loggedUser = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (result.loading || loggedUser.loading) {
    return <div>loading..</div>
  }
  const books = result.data.allBooks
  const favoriteGenre = loggedUser.data.me.favoriteGenre
  console.log(favoriteGenre)

  return (
    <div>
      <h2>recommendations</h2>
      <div>recommendations in your favorite genre <b>{favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(
              (book) =>
                book.genres.includes(favoriteGenre)
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
