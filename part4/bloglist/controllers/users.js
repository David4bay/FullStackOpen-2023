const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  if (!users) return response.status(404).json({ message: 'No users available' })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.post('/all', async (request, response) => {
  const usersDeleted = await User.deleteMany({})

  if (!usersDeleted) return response.status(404).json({ error: 'Something went wrong' })
  return response.status(200).json({ message: 'successful' })
})

module.exports = usersRouter