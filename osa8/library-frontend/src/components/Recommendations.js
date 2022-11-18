import { ALL_BOOKS, ME } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const Recommendations = (props) => {
  const loggedUser = useQuery(ME)
  const [favoriteGenre, setFavoriteGenre] = useState()
  const [booksWithFavoriteGenre, setBooksWithFavoriteGenre] = useState([])
  const [allBooks, { data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (loggedUser?.data?.me) {
      setFavoriteGenre(loggedUser.data.me.favoriteGenre)
      allBooks({
        variables: { genre: favoriteGenre },
      })
    }
  }, [loggedUser, allBooks, favoriteGenre])

  useEffect(() => {
    setBooksWithFavoriteGenre(data)
  }, [data])

  if (!props.show) {
    return null
  }

  if (loggedUser.loading || allBooks.loading) {
    return <div>loading..</div>
  }

  console.log('booksWithFavoriteGenre', booksWithFavoriteGenre)

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        recommendations in your favorite genre <b>{favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksWithFavoriteGenre.allBooks
            .filter((book) => book.genres.includes(favoriteGenre))
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
