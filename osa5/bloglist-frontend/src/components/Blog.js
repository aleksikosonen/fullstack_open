import PropTypes from 'prop-types'
import { useState } from 'react'

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

  const [showDetails, setShowDetails] = useState(false)

  const handleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div>
      <div className='title'>
        {blog.title}
        <button className='viewDetails' onClick={handleDetails}>View</button>
      </div>
      {showDetails && (
        <div className='blogDetails'>
          <div className='author'>Likes {blog.author}</div>
          <div className='likes'>Likes {blog.likes}</div>
          <div className='url'>Likes {blog.url}</div>
          <button onClick={likeBlog}>Like</button>
          {blog.user && (
            <div>
              {blog.user.username === user.username && (
                <button onClick={removeBlog}>Delete</button>
              )}
            </div>
          )}
        </div>
      )}
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
