import '../App.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesFilter from './components/AnecdotesFilter'
import { addVote } from './reducers/anecdoteSlice'
import Notification from './components/Notification'

const App = () => {

  const [message, setMessage] = useState(null)
  
  let anecdotes = useSelector(state => state.anecdotes)

  const dispatch = useDispatch()
  
  const vote = (id) => {

    console.log('vote', id)

    let anecdoteIdx = anecdotes.findIndex((anecdote) => anecdote.id === id)

    setMessage(`You voted for ${anecdotes[anecdoteIdx].content}`)

    dispatch(addVote(id))
  }

  useEffect(() => {
    let timeout

    if (message) {
      timeout = setTimeout(() => {
        setMessage('')
      }, 5000)
    }

    return () => clearTimeout(timeout)
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={message} />
      <AnecdotesFilter />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm />
    </div>
  )
}

export default App