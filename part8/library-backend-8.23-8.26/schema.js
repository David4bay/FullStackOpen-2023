
const typeDefs = `

type Subscription {
    bookAdded: Book
    authorAdded: Author
}

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

module.exports = typeDefs