const NewBlogForm = ({ blog, createBlog, handleInputChange }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            name='title'
            type='text'
            value={blog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          author
          <input
            name='author'
            type='text'
            value={blog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          url
          <input
            name='url'
            type='text'
            value={blog.url}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
