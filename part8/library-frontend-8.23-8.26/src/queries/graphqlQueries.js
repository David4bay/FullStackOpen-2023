import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author {
    id
    name
    born
  }
  genres
  id
}
`

const AUTHOR_BIO = gql`
fragment AuthorBio on Author {
  name
  born
}
`

export const ALL_AUTHORS = gql`
query AllAuthors {
  getAllBooks {
    author {
      name
      born
      id
    }
    published
    genres
    title
  }
  allAuthors {
    ...AuthorBio
  }
}
  ${AUTHOR_BIO}
`

export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $born: Int) {
  editAuthor(name: $name, born: $born) {
    ...AuthorBio
  }
}
  ${AUTHOR_BIO}
`

export const CREATE_NEW_BOOK = gql`
mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    ...BookDetails
  }
}
  ${BOOK_DETAILS}
`

export const ADD_AUTHOR = gql`
mutation AddAuthor($name: String!, $born: Int) {
  addAuthor(name: $name, born: $born) {
    ...AuthorBio
  }
}
  ${AUTHOR_BIO}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}`

export const RECOMMENDATIONS = gql`
query GetUsersFavoriteBooks {
  getUsersFavoriteBooks {
    ...BookDetails
  }
  me {
    favoriteGenre
  }
}
  ${BOOK_DETAILS}
`

export const FILTER_GENRE = gql`
query FilterBook($genreTitle: String!) {
  filterBook(genreTitle: $genreTitle) {
  ...BookDetails
  }
}
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      ...authorDetails
    }
  }
  ${AUTHOR_BIO}
`