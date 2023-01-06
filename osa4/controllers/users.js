const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const missingCredentials = !username || !name
  if (missingCredentials) {
    return response.status(400).json({
      error: 'missing name or username',
    })
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const incorrectPassword = !password || password.length <= 2
  if (incorrectPassword) {
    return response.status(400).json({
      error: 'please enter a password with at least 3 characters',
    })
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))

  response.status(201).json(savedUser)
})

module.exports = usersRouter
