import '../App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, setAnecdotes } from './reducers/anecdoteSlice'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesFilter from './components/AnecdotesFilter'
import anecdoteService from './services/anecdotes'
import Notification from './components/Notification'
import { clearMessage, setMessage } from './reducers/notificationSlice'

const App = () => {

  // const [message, setMessage] = useState(null) // notifications now dispatched via reduxtoolkit
  
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      console.log("anecdotes", anecdotes)
      dispatch(setAnecdotes(anecdotes))
    })

  }, [])

  let anecdotes = useSelector(state => state.anecdotes)

  let message = useSelector((state) => state.notification)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    let timeout

    if (message?.messageValue) {
      timeout = setTimeout(() => {
        dispatch(clearMessage())
      }, message.timeout)
    }

    return () => clearTimeout(timeout)
  })



  const vote = (id) => {
    console.log('vote', id)

    let anecdoteIdx = anecdotes.findIndex((anecdote) => anecdote.id === id)

    let focusAnecdote = anecdotes[anecdoteIdx]

    dispatch(setMessage({ message: `You voted for ${focusAnecdote.content}`, time: 5000}))

    anecdoteService.upVote(focusAnecdote, focusAnecdote.id)

    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesFilter />
      <AnecdoteList vote={vote} />
      <AnecdoteForm />
    </div>
  )
}

export default App