import React, { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { FILTER_GENRE } from '../queries/graphqlQueries'
import { useLocation } from 'react-router-dom'
import Login from './Login'
import DefaultBooks from './DefaultBooks'
import FilteredBooks from './FilteredBooks'

/*

Exercise 8.19

 Filtering of books by genre successfully implemented by sending the books data as props and destructuring

 through props.books, I then map the data into a "books" variable, I then create a state variable called

 "listOfBooks" that can be mapped over, for filtering I filter out the genres into a list of buttons which

 all have the genres as text, I then use an onClick event handler called filterGenre that uses the 

 setListOfBooks state setter to update the list of books to the specified gender clicked. I also added a

 default button to reset the listOfBooks to the default state that uses the books data from earlier

 */

const Books = (props) => {

  const [listOfBooks, setListOfBooks] = useState(null)
  const [defaultBooks, setDefaultBooks] = useState(true)
  const [genreTitle, setGenreTitle] = useState(null)

  const location = useLocation()

  // const fetchData = props.refetch

  const { loading, error, refetch } = useQuery(FILTER_GENRE, {
    variables: { genreTitle },
    skip: true
  })

  const { token, loginPage } = props

  console.log("props.books in books component", props?.books)

  let books = useMemo(() => [...props?.books?.map((detail) => {
    return {
      title: detail?.title,
      author: detail?.author?.name,
      published: detail?.published,
      genres: detail?.genres
    }
  })], [props.books])

  useEffect(() => {
    if (!listOfBooks && books) {
      setListOfBooks(books)
    }
  }, [listOfBooks, books])

  useEffect(() => {

    if (genreTitle === 'default') {
      console.log('genre title is default, will pick default books', books)
        setListOfBooks(books)
        setGenreTitle(null)
        setDefaultBooks(true)

    }

    if (genreTitle !== null && genreTitle !== 'default') {

      console.log("genreTitle in useEffect", genreTitle)

      refetch().then(({data}) => {

        console.log("data fetched from refetch fn", data)

        setListOfBooks(data.filterBook)
        setGenreTitle(null)
        setDefaultBooks(false)
      })
      
    }
  }, [genreTitle, refetch, books])

  console.log("location path name", typeof location.pathname === 'string')


  // Used concat so if there's an empty genre array it is removed when spread into it.
  let listOfGenre = [].concat(...props.books.map((book) => {
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
    
    setGenreTitle(bookGenreType)

    /* React will no longer be in charge of filtering the books */
    
    // let filteredBooks = props.books.filter((detail) => {
    //   return detail.genres.includes(bookGenreType)
    // })

    // console.log("filteredBooks", filteredBooks)

    // filteredBooks = filteredBooks.map((detail) => {
    //   return {
    //     title: detail.title,
    //     author: detail.author.name,
    //     published: detail.published,
    //     genres: detail?.genres
    //   }
    // })

    // console.log("filtered books after data reshaped", filteredBooks)

    // setListOfBooks(filteredBooks)
  }

  // turning the list of genre to a set to remove duplicates then converting back to an array
  listOfGenre = Array.from(new Set(listOfGenre))

  if (error) {
    return <h3>Sorry...something went wrong.</h3>
  }

  if (listOfBooks && !defaultBooks) {
    
    return loading ? <h3>Loading...</h3> : (
    <FilteredBooks 
      listOfBooks={listOfBooks}
      genreStyles={genreStyles}
      listOfGenre={listOfGenre}
      setListOfBooks={setListOfBooks}
      books={books}
      filterGenre={filterGenre}
    />
    )
  }

  return (
    <div>
      <h2>books</h2>
      <DefaultBooks
        listOfBooks={listOfBooks}
        genreStyles={genreStyles}
        listOfGenre={listOfGenre}
        setListOfBooks={setListOfBooks}
        books={books}
        filterGenre={filterGenre}
      />
    </div>
  )
}

export default Books
