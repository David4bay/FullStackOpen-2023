

const DefaultBooks = ({ listOfBooks, genreStyles, listOfGenre, filterGenre, setListOfBooks, books }) => {
  console.log("books coming into default books component", books)

  console.log("list of books from default books", listOfBooks)

    if (listOfBooks?.length < 1) {
    return <p>No Books available.</p>
  }

    return (
        <>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {listOfBooks?.map((book) => (
            <tr key={`${book.title + String(book.published)}`}>
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
      {listOfGenre.length > 0 ? <button type='button' onClick={filterGenre}>default</button> : null}
      </ul>
      </>
    )
}

export default DefaultBooks