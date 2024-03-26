const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Author {
    id: String!
    name: String!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String
    genres: [String]
    id: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String!, genres: String!): [Book!]!
    allAuthors: [Author!]!
    findBook(genres: String!): Book
    findAuthor(name: String!): Author
    getAllAuthors: [Author!]!
    getAllBooks: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: String!
      author: String
      genres: [String]
    ): Book

    editAuthor(
      name: String!
      born: Int
    ): Author

    addAuthor(
      name: String!
      born: Int
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => author.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      return args.author ? books.filter((book) => book.author.includes(args.author) && book.genres.includes(args.genres)) : books
    },
    allAuthors: (root, args) => {
      return args.name ? authors.filter((author) => author.name.includes(args.name)) : authors
    },
    findBook: (root, args) => {
        return books.find(book => book.genres.includes(args.genres))
    },
    findAuthor: (root, args) => {
        return authors.find(author => author.name.includes(args.name))
    },
    getAllAuthors: () => authors,
    getAllBooks: () => books
  },
  Mutation: {
    addBook: (root, args) => {

      const author = args.author.split(' ') ?  args.author.trim().split(' ').map((name) => name[0].toUpperCase() + name.slice(1,)).join(' ') : null

      console.log("author", author)

      if (args.author === null) {
        return null
      }
      
      const book = {...args, author, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {

      const authorName = typeof(args.name) === 'string' ? args.name.toLowerCase().trim() : null

      const searchedAuthor = authors.find((author) => author.name.toLowerCase().includes(authorName))
      
      const titleCasedAuthor = (/\s/).test(authorName) ? authorName.split(' ').map((word) => word[0].toUpperCase() + word.slice(1,)).join(' ') : authorName[0].toUpperCase() + authorName.slice(1,)

      if (!authorName || authorName === null) return null

      
      if (!searchedAuthor) {
        return null
      }
      
      const updatedAuthor = {...searchedAuthor, name: titleCasedAuthor, born: args.born ? args.born : null}

      authors = authors.map((author) => author.name.toLowerCase() === authorName ? updatedAuthor : author)

      return updatedAuthor
    },
    addAuthor: (root, args) => {

      const authorName = typeof(args.name) === 'string' ? args.name.toLowerCase().trim() : null

      const born = Number(args.born) ? Number(args.born) : null

      const alreadyExists = authors.find((author) => author.name.toLowerCase().includes(authorName))

      console.log("alreadyExists", alreadyExists)

      if (alreadyExists) {
        return null
      }

      const titleCasedAuthor = (/\s/).test(authorName) ? authorName.split(' ').map((word) => word[0].toUpperCase() + word.slice(1,)).join(' ') : authorName[0].toUpperCase() + authorName.slice(1,)

      const newAuthor = {name: titleCasedAuthor, id: uuid(), born}

      authors = authors.concat(newAuthor)
      console.log("updated authors", authors)
      return newAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})