import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login'

/*  Exercise 8.19
 Filtering of books by genre successfully implemented by sending the books data as props and destructuring
 through props.books, I then map the data into a "books" variable, I then create a state variable called
 "listOfBooks" that can be mapped over, for filtering I filter out the genres into a list of buttons which
 all have the genres as text, I then use an onClick event handler called filterGenre that uses the 
 setListOfBooks state setter to update the list of books to the specified gender clicked. I also added a
 default button to reset the listOfBooks to the default state that uses the books data from earlier
 */

const Books = (props) => {

  const [listOfBooks, setListOfBooks] = useState(null)

  const { token, loginPage } = props

  console.log("props.books in books component", props.books)

  let books = useMemo(() => [...props.books.map((detail) => {
    return {
      title: detail.title,
      author: detail.author.name,
      published: detail.published,
      genres: detail?.genres
    }
  })], [props.books])

  useEffect(() => {
    if (!listOfBooks && books) {
      
      setListOfBooks(books)
    }
  }, [listOfBooks, books])

  const location = useLocation()

  console.log("location path name", typeof location.pathname === 'string')

  const listOfGenre = [].concat(...props.books.map((book) => {
    return book.genres
  }))

  console.log("list of genre", listOfGenre)

  if (!props.books) {
    return null
  }


  if (!token && loginPage && location.pathname === '/') {
    return (
    <Login 
    error={props.error} 
    setError={props.setError}
    setToken={props.setToken} 
    />
    )
  }

  const genreStyles = {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 0px 0px 0px',
    padding: '0px',
    listStyle: 'none'
  }

  const filterGenre = (e) => {
    let bookGenreType = e.target.innerText

    console.log(bookGenreType)

    let filteredBooks = props.books.filter((detail) => {
      return detail.genres.includes(bookGenreType)
    })

    console.log("filteredBooks", filteredBooks)

    filteredBooks = filteredBooks.map((detail) => {
      return {
        title: detail.title,
        author: detail.author.name,
        published: detail.published,
        genres: detail?.genres
      }
    })

    console.log("filtered books after data reshaped", filteredBooks)

    setListOfBooks(filteredBooks)
  }
  console.log("listOfBooks", listOfBooks)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {listOfBooks?.map((book) => (
            <tr key={`${book.title} ${book.author} ${book.published}`}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
              ))}
        </tbody>
      </table>
      <ul style={genreStyles}>
      {listOfGenre?.map((genreTitle) => {
        return (
        <li key={genreTitle}>
          <button onClick={filterGenre}>
          {genreTitle}
          </button>
        </li>
        )
      })}
      {listOfGenre ? <button onClick={() => setListOfBooks(books)}>default</button> : null}
      </ul>
    </div>
  )
}

export default Books
