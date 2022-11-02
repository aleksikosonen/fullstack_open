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
      ) : (null)} {
       
      }
    </div>
  )
}

export default Blog
