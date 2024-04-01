import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query AllAuthors {
  getAllBooks {
    author
    published
    genres
    title
  }
  allAuthors {
    born
    name
  }
}
`

export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $born: Int) {
  editAuthor(name: $name, born: $born) {
    name
    born
  }
}
`

export const CREATE_NEW_BOOK = gql`
mutation Mutation($title: String!, $published: String!, $author: String, $genres: [String]) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author
    genres
  }
}
`

export const ADD_AUTHOR = gql`
mutation AddAuthor($name: String!, $born: Int) {
  addAuthor(name: $name, born: $born) {
    name
    born
  }
}
`