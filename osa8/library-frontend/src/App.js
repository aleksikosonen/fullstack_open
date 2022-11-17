import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const logout = () => {
    localStorage.setItem('phonenumbers-user-token', null)
    setToken(null)
    setPage('authors')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div className='button-container'>
        <button
          onClick={() => setPage('authors')}
          className='button-primary spacer-margin'
        >
          authors
        </button>
        <button
          onClick={() => setPage('books')}
          className='button-primary spacer-margin'
        >
          books
        </button>
        {!token ? (
          <button
            onClick={() => setPage('login')}
            className='button-primary spacer-margin'
          >
            log in
          </button>
        ) : (
          <div>
            <button
              onClick={() => setPage('add')}
              className='button-primary spacer-margin'
            >
              add book
            </button>
            <button
              onClick={() => setPage('recommendations')}
              className='button-primary spacer-margin'
            >
              recommendations
            </button>
            <button onClick={logout} className='button-primary'>
              logout
            </button>
          </div>
        )}
      </div>
      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={setErrorMessage}
      />
    </div>
  )
}

export default App
