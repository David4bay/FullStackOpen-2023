import { useState, useEffect } from 'react'
import { 
  Routes, 
  Route,
  Link
} from 'react-router-dom'
import Title from './components/Title'
import '../index.css'
import AnecdoteList from './components/AnecdoteList'
import SingleAnecdote from './components/SingleAnecdote'
import CreateNew from './components/CreateNew'
import Notice from './components/Notice'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  useEffect(() => {
    let timeout
    if (notification) {
      timeout = setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    return () => clearTimeout(timeout)
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
      <Title />
      <Menu />
      <Notice notification={notification} />
        <Routes>
      <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
      <Route path='/create' element={<CreateNew setNotification={setNotification} addNew={addNew} />} />
      <Route path='/anecdotes/:id' element={<SingleAnecdote anecdotes={anecdotes} anecdoteById={anecdoteById} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
