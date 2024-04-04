import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS } from './queries/graphqlQueries'
import { useQuery, useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {

  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [loginPage, setLoginPage] = useState(false)

  const result = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const setLogin = () => {
    if (token) {
      return logout()
    }
    setLoginPage(true)
  }

  const booksView = () => {
    setLoginPage(false)
  }

  useEffect(() => {
    let userData = localStorage.getItem('user-token')
    if (!token) {
      console.log("token", token, "userData", userData)
      setToken(userData)
    }
  }, [token, setToken])

  useEffect(() => {
    let timeout
    if (error) {
      timeout = setTimeout(() => {
        setError(null)
      }, 5000)
    }
    return () => clearTimeout(timeout)
  }, [error])

  const linkContainer = {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    marginBottom: '10px'
  }
  
  const linkStyle = {
    padding: '5px',
    margin: '5px',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    border: '1px solid gray',
    outline: '1px solid black',
    color: 'black',
    textDecoration: 'none'
  }

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify
  //       error={error}
  //       />
  //       <LoginForm
  //       setToken={setToken}
  //       setError={setError}
  //       />
  //     </div>
  //   )
  // }

  if (result.loading) {
    return <div>Loading... </div>
  }

  return (
        <Router>
            <div style={linkContainer}>
              {console.log("result of get all books", result?.data.getAllBooks)}
              <Link style={linkStyle} onClick={booksView} to="/">
              books
              </Link>

              <Link style={linkStyle} to="/authors">
              authors
              </Link>
              {token ? (
              <Link style={linkStyle} to="/add-book">
              add book
              </Link>) : null
              }
              {token ? (
              <Link style={linkStyle} to="/recommendations">
              recommend
              </Link>) : null
              }
              <Link style={linkStyle} onClick={setLogin} to="/">
              {token ? "logout" : "login"}
              </Link>
            </div>
            <Routes>
                <Route path="/" element={<Books error={error} setError={setError} setToken={setToken} loginPage={loginPage} token={token} books={result.data?.getAllBooks} />} />
                <Route path="/authors" element={<Authors authors={result.data?.getAllBooks} bornIn={result.data?.allAuthors} />} />
                <Route path="/add-book" element={<NewBook token={token} />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
  )
}

export default App
