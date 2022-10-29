const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

/* //at the time of initial testing there are two entities in mongodb
test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})*/

describe('addition of a new test', () => {
  test('blogs can be added', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const blog = {
      title: 'Gravelpyöräily',
      author: 'Koistine',
      url: 'www',
      likes: '100',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsWithAddedBlog = await api.get('/api/blogs')
    const rightContent = blogsWithAddedBlog.body.map((blog) => blog.title)
    expect(blogsWithAddedBlog.body).toHaveLength(initialBlogs.body.length + 1)
    expect(rightContent).toContain('Gravelpyöräily')
  })
})

describe('delete blog', () => {
  test('a blog can be deleted', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogToDelete = initialBlogs.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialBlogs.body.length - 1)

    const contents = blogsAtEnd.body.map((blog) => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
