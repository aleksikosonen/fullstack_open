import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      blogRef.current.toggleVisibility()
      setNotificationMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      setNotificationMessage('Error adding blog')
    }
  }

  const addLike = async (blogId, blogObject) => {
    try {
      const response = await blogService.update(blogId, blogObject)
      setBlogs(blogs.map((blog) => (blog.id !== response.id ? blog : response)))
    } catch (exception) {
      setNotificationMessage(`Error updating ${blogObject} blog`)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Blog ${blogObject.title}`)) {
        await blogService.remove(blogObject.id)
        setNotificationMessage(`Deleted blog ${blogObject.title}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      }
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
    } catch (exception) {
      setNotificationMessage(`Error deleting ${blogObject.id} blog`)
    }
  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedBlogger')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <div className='margin-bottom'>
        {user.name} is logged in
        <button onClick={handleLogOut}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel='Create new blog' ref={blogRef}>
        <NewBlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogWithLikes={addLike}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
