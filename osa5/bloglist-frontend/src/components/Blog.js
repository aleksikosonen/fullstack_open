import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlogWithLikes, deleteBlog, user }) => {
  const likeBlog = () => {
    let likeAmount = 0
    if (blog.likes) {
      likeAmount = blog.likes + 1
    } else {
      likeAmount = 1
    }
    const likedBlog = {
      user: blog.user.id,
      likes: likeAmount,
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
    <div className='blog'>
      <div className='title'>
        {blog.title}
        <button className='viewDetails' id='viewBlog' onClick={handleDetails}>View</button>
      </div>
      {showDetails && (
        <div className='blogDetails'>
          <div className='author'>{blog.author}</div>
          <div className='likes'>Likes {blog.likes}</div>
          <div className='url'>{blog.url}</div>
          <button onClick={likeBlog} id='likeButton'>Like</button>
          {blog.user && (
            <div>
              {blog.user.username === user.username && (
                <button onClick={removeBlog} id='deleteButton'>Delete</button>
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
