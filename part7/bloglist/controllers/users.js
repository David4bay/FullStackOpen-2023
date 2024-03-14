const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate([{ path: 'blogs', model: 'Blog', populate: { path: 'comments', model: 'Comment'}}])
  if (!users) return response.status(404).json({ message: 'No users available' })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username.length < 3 || password.length < 3) return response.status(404).json({ error: 'Password and Username must be longer than 3.' })
  if (!username || !password) return response.status(404).json({ error: 'Invalid Username/Password' })
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

usersRouter.delete('/all', async (request, response) => {
  const usersDeleted = await User.deleteMany({})

  if (!usersDeleted) return response.status(404).json({ error: 'Something went wrong' })
  return response.status(200).json({ message: 'successful' })
})

module.exports = usersRouter