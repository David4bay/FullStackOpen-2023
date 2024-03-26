import { useReducer } from 'react'
import { gql, useMutation } from '@apollo/client'

const HANDLE_TITLE = "HANDLE_TITLE"
const HANDLE_AUTHOR = "HANDLE_AUTHOR"
const HANDLE_PUBLISHED = "HANDLE_PUBLISHED"
const HANDLE_GENRE = "HANDLE_GENRE"
const RESET_GENRE = "RESET_GENRE"
const ADD_GENRE = "ADD_GENRE"
const SUBMITTED = "SUBMITTED"

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

const CREATE_NEW_BOOK = gql`
mutation Mutation($title: String!, $published: String!, $author: String, $genres: [String]) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author
    genres
  }
}
`

const ADD_AUTHOR = gql`
mutation AddAuthor($name: String!, $born: Int) {
  addAuthor(name: $name, born: $born) {
    name
    born
  }
}
`

const initialState = {
  title: "",
  author: "",
  published: "",
  genre: "",
  genres: [],
}

const reducer = (state, action) => {
  switch(action.type) {
    case HANDLE_TITLE:
      return {
        ...state, title: action.payload
      }
    case HANDLE_AUTHOR:
      return {
        ...state, author: action.payload
      }
    case HANDLE_PUBLISHED:
      return {
        ...state, published: action.payload
      }
    case HANDLE_GENRE:
      return {
        ...state, genre: action.payload
      }
    case RESET_GENRE:
      return {
        ...state, genre: ""
      }
    case ADD_GENRE:
      return {
        ...state, genres: [...state.genres, action.payload]
      }
    case SUBMITTED:
      return {
        ...initialState
      }
    default:
      return state
  }
}

const NewBook = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const [ createBook ] = useMutation(CREATE_NEW_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS }]
  })

  const [ addAuthor ] = useMutation(ADD_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    createBook({ variables: { title: state.title, published: state.published, author: state.author, genres: state.genres }})
    addAuthor({ variables: { name: state.author, born: null }})

    dispatch({ type: SUBMITTED })
  }

  const addGenre = () => {
    dispatch({ type: RESET_GENRE })
    dispatch({ type: ADD_GENRE, payload: state.genre })
  }

  const styledButtons = {
    backgroundColor: 'transparent',
    border: '1px solid grey',
    borderRadius: '3px',
    padding: '2px',
    marginTop: '2px'
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">
            title
          </label>
          <input
            value={state.title}
            onChange={({ target }) => dispatch({ type: HANDLE_TITLE , payload: target.value})}
            autoComplete="true"
            id="title"
          />
        </div>
        <div>
        <label htmlFor="author">
            author
        </label>
          <input
            value={state.author}
            onChange={({ target }) => dispatch({ type: HANDLE_AUTHOR, payload: target.value})}
            autoComplete="true"
            id="author"
            />
        </div>
        <div>
        <label htmlFor="published">
            published
        </label>
          <input
            type="number"
            value={state.published}
            onChange={({ target }) => dispatch({ type: HANDLE_PUBLISHED, payload: target.value})}
            autoComplete="true"
            id="published"
          />
        </div>
        <div>
          <input
            value={state.genre}
            onChange={({ target }) => dispatch({ type: HANDLE_GENRE, payload: target.value})}
            autoComplete="true"
            id="genre"
          />
          <button style={styledButtons} onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {state?.genres?.join(' ')}</div>
        <button style={styledButtons} type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook