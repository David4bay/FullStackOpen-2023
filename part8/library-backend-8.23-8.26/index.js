require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { WebSocketServer } = require('ws')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const staticGraphQLData = require('./graphql-schema-data/data')
const { ApolloServer } = require('@apollo/server')
const { useServer } = require('graphql-ws/lib/use/ws')
const User = require('./models/users')
// const { startStandaloneServer } = require('@apollo/server/standalone')

const MONGO_PASSWORD = encodeURIComponent(process.env.PASSWORD)

mongoose.set('strictQuery', false)
const mongo_url = `mongodb+srv://${process.env.NAME}:${MONGO_PASSWORD}@cluster0.7fmaegp.mongodb.net/library?retryWrites=true&w=majority`

console.log('connecting to', mongo_url)

mongoose.connect(mongo_url).then(() => {
  console.log('connected to MongoDB')
}).catch((err) => {
  console.log('error connecting to MongoDB:', err.message)
})

mongoose.set('debug', true)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.startsWith('Bearer ')) {
//       const decodedToken = jwt.verify(
//         auth.substring(7), process.env.JWT_SECRET
//       )
//       const currentUser = await User
//         .findById(decodedToken.id)
//       return { currentUser }
//     }
//   },
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })