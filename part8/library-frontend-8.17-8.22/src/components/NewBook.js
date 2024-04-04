import { Navigate } from 'react-router-dom'
import { useReducer } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_AUTHOR, CREATE_NEW_BOOK, ALL_AUTHORS } from '../queries/graphqlQueries'

const HANDLE_TITLE = "HANDLE_TITLE"
const HANDLE_AUTHOR = "HANDLE_AUTHOR"
const HANDLE_PUBLISHED = "HANDLE_PUBLISHED"
const HANDLE_GENRE = "HANDLE_GENRE"
const RESET_GENRE = "RESET_GENRE"
const ADD_GENRE = "ADD_GENRE"
const SUBMITTED = "SUBMITTED"

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

  const [ addAuthor ] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    let number = Number(+state.published)

    createBook({ variables: { title: state.title, published: number, author: state.author, genres: state.genres }})
    addAuthor({ variables: { name: state.author, born: null }})

    dispatch({ type: SUBMITTED })
  }

  const addGenre = () => {
    dispatch({ type: RESET_GENRE })
    dispatch({ type: ADD_GENRE, payload: state.genre })
  }

  if (!props.token ) {
    return <Navigate to="/" />
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
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {state?.genres?.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook