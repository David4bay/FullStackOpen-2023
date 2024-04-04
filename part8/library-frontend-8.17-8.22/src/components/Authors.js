import { useState, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries/graphqlQueries'

const Authors = (props) => {

  const [date, setDate] = useState("1990")

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const selectRef = useRef(null)
  
  console.log(props.authors)
  
  if (!props.authors) {
    return null
  }

  const uniqueAuthorNames = Array.from(new Set(props.authors.map((author) => author.author.name)))

  const authors = props.authors.map((detail) => {
    return {
      author: detail.author.name,
      published: detail.published,
      born: detail.author.born
    }
  })

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "1px solid gray",
    margin: "5px",
    borderRadius: "3px"
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const authorName = selectRef.current.value
    editAuthor({ variables: { name: authorName, born: Number(date) ? Number(date) : 0}})
    setDate("1990")
  }

  console.log("authors", authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((author) => (
            <tr key={author.author}>
              <td>{author?.author}</td>
              <td>{author?.born}</td>
              <td>{author?.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h2>
          set birthyear
        </h2>
        <select name="authors" ref={selectRef}>
          {uniqueAuthorNames.map(function(author) { 
            return (
            <option key={author} value={author}>
              {author}
            </option>
          )})}
        </select>
        <br/>
        <label htmlFor="born">
          born
        </label>
        <input value={date} onChange={(e) => setDate(e.target.value)} type="number" id="born" /><br/>
        <input style={buttonStyle} id="born" type="submit" value="update author" />
      </form>
    </div>
  )
}

export default Authors
