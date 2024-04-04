import { gql } from '@apollo/client'

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
mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
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

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}`