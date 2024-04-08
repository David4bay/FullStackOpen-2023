

const DefaultBooks = ({ listOfBooks, genreStyles, listOfGenre, filterGenre, setListOfBooks, books }) => {
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
      </>
    )
}

export default DefaultBooks