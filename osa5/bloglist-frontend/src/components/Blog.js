const Blog = ({ blog, updateBlogWithLikes }) => {
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

  return (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>Likes {blog.likes}</div>
      <button onClick={likeBlog}>Like</button>
    </div>
  )
}

export default Blog
