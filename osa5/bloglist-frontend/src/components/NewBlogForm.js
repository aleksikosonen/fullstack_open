import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = async (event) => {
    event.preventDefault()
    const title = newBlog.title
    const author = newBlog.author
    const url = newBlog.url

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleInputChange = (event) => {
    const title = event.target.name
    const userInput = event.target.value
    setNewBlog({ ...newBlog, [title]: userInput })
    console.log(newBlog)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            name='title'
            type='text'
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          author
          <input
            name='author'
            type='text'
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          url
          <input
            name='url'
            type='text'
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
