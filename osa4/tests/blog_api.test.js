const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

// test will fail due to reguiring a token auth. tried adding set authorization but failed
describe('addition of a new blog', () => {
  test('blogs can be added', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const blog = {
      title: 'Maantiepyöräily',
      author: 'Koistine',
      url: 'https://www.canyon.com/',
      likes: '100',
      userId: '635ced56b938064117bbc60d',
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

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'Goistinen', name: 'Kaleksi Goistinen', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Goistinen1',
      name: 'Kaleksi Goistinen',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Goistinen',
      name: 'Kaleksi Goistinen',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
