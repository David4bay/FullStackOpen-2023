require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const staticGraphQLData = require('./graphql-schema-data/data')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/users')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const MONGO_PASSWORD = encodeURIComponent(process.env.PASSWORD)

const mongo_url = `mongodb+srv://${process.env.NAME}:${MONGO_PASSWORD}@cluster0.7fmaegp.mongodb.net/library?retryWrites=true&w=majority`

console.log('connecting to', mongo_url)

mongoose.connect(mongo_url).then(() => {
  console.log('connected to MongoDB')
}).catch((err) => {
  console.log('error connecting to MongoDB:', err.message)
})

const typeDefs = `

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    id: String!
    name: String!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String!, genres: String!): [Book!]!
    allAuthors: [Author!]!
    findBook(genres: String!): [Book]
    findAuthor(name: String!): Author
    filterBook(genreTitle: String!): [Book]
    getAllAuthors: [Author!]!
    getAllBooks: [Book!]!
    me: User
    getUsersFavoriteBooks: [Book]
  }

  type Mutation {

    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      born: Int
    ): Author

    addAuthor(
      name: String!
      born: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
    
    deleteBooks: Boolean
    deleteAuthors: Boolean

  }
`

const resolvers = {
  Query: {

    authorCount: async () => {
      let authorCount

      try {
        authorCount = Author.collection.countDocuments()
      } catch (error) {
        throw new GraphQLError('Failed to fetch author count.', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return authorCount
    },

    bookCount: async () => {
      let bookCount

      try {

        bookCount = Book.collection.countDocuments()
      } catch (error) {
        throw new GraphQLError('Failed to fetch book count.', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return bookCount
    },

    filterBook: async (root, args) => {
      let filteredBooks

      try {

        filteredBooks = Book.find({ genres: args.genreTitle }).populate("author")
      } catch (error) {
        throw new GraphQLError('Failed to find book', {
          extensions: 'BAD_USER_INPUT',
          invalidArgs: args.genreTitle,
          error
        })
      }
      return filteredBooks
    },

    allBooks: async (root, args) => {
      let allBooksFound

      try {
      allBooksFound = Book.find({}).populate("author")
      } catch (error) {
        throw new GraphQLError('Failed to retrieve all books', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return allBooksFound
    },

    allAuthors: async (root, args) => {

      let allAuthors 

      try {
        allAuthors = Author.find({})
      } catch (error) {
        throw new GraphQLError('Failed to find all authors', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return allAuthors
    },

    findBook: async (root, args) => {
      let foundBook

      try {
        foundBook = Book.find({ genres: { $in: [args.genres] } }).populate("author")
      } catch (error) {
        throw new GraphQLError('Failed to find specified book.', {
          extensions: 'REQUEST_FAILED',
          invalidArgs: args.genres,
          error
        })
      }

      return foundBook
    },

    findAuthor: async (root, args) => {

      let author

      try {
        author = await Author.findOne({ name: args.name })

        console.log("author data on the backend", author)

      } catch (error) {
        throw new GraphQLError('Failed to find author with name', {
          extensions: 'BAD_USER_INPUT',
          invalidArgs: args.name,
          error
        })
      }
        return author
    },

    getAllAuthors: async () => {

      let authors

      try {
        authors = Author.find({})
      } catch (error) {
        throw new GraphQLError('Failed to fetch authors', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return authors
    },

    getAllBooks: async () => {

      let allBooks

      try {
        allBooks = Book.find({}).populate("author")
      } catch (error) {
        throw new GraphQLError('Failed to fetch all books.', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return allBooks
    },

    me: (root, args, context) => {
      let user

      try {
        user = context.currentUser
      } catch (error) {
        throw new GraphQLError('Failed to retrieve user.', {
          extensions: 'REQUEST_FAILED',
          error
        })
      }
      return user
    },

    getUsersFavoriteBooks: async (root, args, context) => {
      
      let userFavorite = context.currentUser.favoriteGenre
      let recommendedBooks

      console.log("userFavorite", userFavorite)

      if (!userFavorite) {
        throw new GraphQLError('Failed to find user favorite genre.', {
          extension: 'REQUEST_FAILED',
        })
      }

      try {
        recommendedBooks = await Book.find({ genres: userFavorite }).populate('author')
      } catch (error) {
        throw new GraphQLError('Failed to fetch recommended books.', {
          extensions: 'BAD_USER_INPUT',
          error
        })
      }
      console.log("recommended books", recommendedBooks)
      return recommendedBooks
    }

  },
  Mutation: {

    createUser: async (root, args) => {

      const username = new User({ username: args.username, favoriteGenre: args.favoriteGenre || null })

      try {
        await username.save()
      } catch (error) {
        throw new GraphQLError('Failed to create user', {
          extensions: 'BAD_USER_INPUT',
          invalidArgs: args.username,
          error
        })
      }
      return username
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret' ) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = args.author.split(' ') ?  args.author.trim().split(' ').map((name) => name[0].toUpperCase() + name.slice(1,)).join(' ') : null

      console.log("author", author)

      if (args.author === null || !args.published || !Number(args.published)) {
        return null
      }

      let foundAuthor = await Author.findOne({ name: author })

      if (!foundAuthor) {
        foundAuthor = new Author({ name: author, born: null })

        try {
          await foundAuthor.save()
        } catch (error) {
          throw new GraphQLError('Failed to create author', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              invalidArgs: author,
              error
            }
          })
        }
      }
      console.log("foundAuthor", foundAuthor)
      const book = {...args, genres: [...args.genres], published: Number(args.published), author: foundAuthor._id.toString() }
      
      let newBook = new Book({...book})

     try {
      newBook.save()
     } catch (error) {
      throw new GraphQLError('Adding book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.author,
          error
        }
      })
     }

     return newBook
    },


    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const authorName = typeof(args.name) === 'string' ? args.name.toLowerCase().trim() : null

      const titleCasedAuthor = (/\s/).test(authorName) ? authorName.split(' ').map((word) => word[0].toUpperCase() + word.slice(1,)).join(' ') : authorName[0].toUpperCase() + authorName.slice(1,)

      const searchedAuthor = await Author.findOne({ name: titleCasedAuthor })

      if (!authorName || authorName === null) {
        return null
      }

      if (!searchedAuthor) {
        return null
      }
      
      searchedAuthor.name = titleCasedAuthor
      searchedAuthor.born = args.born || null

      try {
        searchedAuthor.save()
      } catch (error) {
        throw new GraphQLError('Editing author filed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return searchedAuthor
    },
    
    addAuthor: async (root, args, context) => {

      const authorName = typeof(args.name) === 'string' ? args.name.toLowerCase().trim() : null

      const born = Number(args.born) ? Number(args.born) : null
      
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const alreadyExists = Author.findOne({ name: authorName })


      if (alreadyExists) {
        return null
      }

      const titleCasedAuthor = (/\s/).test(authorName) ? authorName.split(' ').map((word) => word[0].toUpperCase() + word.slice(1,)).join(' ') : authorName[0].toUpperCase() + authorName.slice(1,)

      const newAuthorData = {name: titleCasedAuthor, born}

      let newAuthor = new Author({...newAuthorData})

      try {
        await newAuthor.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return newAuthor
    },

    deleteBooks: async () => {
      // for testing purposes
       await Book.deleteMany({})
       let checkBooks = await Book.find({})

       return checkBooks.length < 1 ? true : false
    },

    deleteAuthors: async () => {
      // for testing purposes
       await Author.deleteMany({})
       let checkAuthors = await Author.find({})

       return checkAuthors.length < 1 ? true : false
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})