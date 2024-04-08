

const FilteredBooks = ({  listOfBooks, genreStyles, listOfGenre, filterGenre, setListOfBooks, books }) => {

  if (listOfBooks?.length < 1) {
    return <p>No Books available.</p>
  }

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
              <td>{book.author.name}</td>
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
      {listOfGenre.length > 0 ? <button onClick={filterGenre}>default</button> : null}
      </ul>
      </div>
    )
}

export default FilteredBooks