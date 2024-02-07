const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password, notes } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    notes
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const responseData = await User.findByIdAndDelete(id)

  if (responseData) {
    const { data } = responseData
    return response.status(204).json(data)
  }
  return response.status(404).json('Unable to delete user, check if this user exists')
})

module.exports = usersRouter