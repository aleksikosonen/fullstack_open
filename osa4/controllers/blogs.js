const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const userExtractor = middleware.userExtractor

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  try {
    const blog = await new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    }).populate('user', { username: 1, name: 1 })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch (error) {
    response.status(400).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
      new: true,
    }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
  } catch (exception) {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === user.id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.json(blogToDelete).status(204).end()
    } catch (error) {
      response.status(400).end()
    }
  }
})

module.exports = blogsRouter

/*
// Old version of blogs.js for testing old adding 
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  }).catch((error) => next(error))
})

module.exports = blogsRouter
*/
