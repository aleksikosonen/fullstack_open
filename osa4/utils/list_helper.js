const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((total, blog) => total + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((mostLikes, currentLikes) =>
    mostLikes.likes > currentLikes.likes ? mostLikes : currentLikes
  )
  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = blogs.reduce((mostBlogs, currentBlog) => {
    mostBlogs[currentBlog.author] = (mostBlogs[currentBlog.author] || 0) + 1
    return currentBlog
  })
  console.log(authorWithMostBlogs)
  const blogsThatHaveAuthor = blogs.filter(
    (blog) => blog.author === authorWithMostBlogs.author
  )
  const blogLikesSum = blogsThatHaveAuthor.length
  const mostBlogs = { author: authorWithMostBlogs.author, blogs: blogLikesSum }
  return mostBlogs
}

const mostLikes = (blogs) => {
  const authors = []

  blogs.filter((blog) => {
    if (!authors.includes(blog.author)) {
      authors.push({author: blog.author, likes: 0})
    }
  })

  authors.forEach((author) => {
    blogs.forEach((blog) => {
      if (blog.author === author.author)
      author.likes += blog.likes
      authors.sort((a,b)=> {return (b.likes - a.likes)})
    })
  })

  const authorToReturn = authors[0]

  return authorToReturn
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}