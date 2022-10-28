const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

/* //at the time of initial testing there are two entities in mongodb
test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})*/

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

afterAll(() => {
  mongoose.connection.close()
})
