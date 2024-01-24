const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('Connected to Mongo Atlas successfully')
}).catch((err) => {
  logger.error(err)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', middleware.tokenExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app