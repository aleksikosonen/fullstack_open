import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogWithLikes, deleteBlog, user }) => {
  const likeBlog = () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateBlogWithLikes(blog.id, likedBlog)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  return (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>Likes {blog.likes}</div>
      <button onClick={likeBlog}>Like</button>
      {blog.user.username === user.username ? (
        <button onClick={removeBlog}>Delete</button>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogWithLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
