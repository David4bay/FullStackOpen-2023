import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
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

const App = () => {

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading... </div>
  }

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

  return (
        <Router>
            <div style={linkContainer}>
              <Link style={linkStyle} to="/">
                authors
              </Link>

              <Link style={linkStyle} to="/books">
              books
              </Link>

              <Link style={linkStyle} to="/add-book">
              add book
              </Link>
            </div>
            <Routes>
                <Route path="/" element={<Authors authors={result.data.getAllBooks} bornIn={result.data.allAuthors} />} />
                <Route path="/books" element={<Books books={result.data.getAllBooks} />} />
                <Route path="/add-book" element={<NewBook />} />
            </Routes>
        </Router>
  )
}

export default App
