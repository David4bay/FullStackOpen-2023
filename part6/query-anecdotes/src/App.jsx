import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewAnecdote, getAnecdotes, upvoteAnecdote } from './utils/requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useState, useEffect, useReducer, useMemo } from 'react'
import axios from 'axios'

const NEW_MESSAGE = 'NEW_MESSAGE'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const CREATED_MESSAGE = 'CREATED_MESSAGE'

const App = () => {
  
  const reducer = (state, action) => {
    switch(action.type) {
      case NEW_MESSAGE:
      return {
        ...state, message: `${action.payload.content} voted`
      }
      case ERROR_MESSAGE:
      return {
        ...state, message: 'too short anecdote, must have a length of 5 or more'
      }

      case CREATED_MESSAGE:
      return {
        ...state, message: `'${action.payload}' anecdote created`
      }

      case CLEAR_MESSAGE:
      return {
        message: '',
        timeout: 5000
      }
      default:
        return state
    }
  }

  const initialState = {
    message: '',
    timeout: 5000
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let timeout
    let message = state.message

    if (message) {
      timeout = setTimeout(() => {
        dispatch({
          type: CLEAR_MESSAGE
        })
      }, state.timeout)
    }
    () => clearTimeout(timeout)
  }, [state.message])

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    // refetchOnWindowFocus: false
  })

  const anecdotes = result?.data

  const upvoteMutation = useMutation({ 
    mutationFn: upvoteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const addAnecdoteMutation = useMutation({
    mutationFn: addNewAnecdote,
    onSucess: (newAnecdotes) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdotes))
    }
  })

  // console.log("result from useQuery", JSON.parse(JSON.stringify(result.data)))
  
  // const anecdotes = [
    //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  
  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch({
      type: NEW_MESSAGE,
      payload: anecdote
    })
    upvoteMutation.mutate(anecdote)
  }

  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (!content || content.length < 5) {
      return dispatch({
        type: ERROR_MESSAGE
      })
    }

    dispatch({
      type: CREATED_MESSAGE,
      payload: content
    })
    addAnecdoteMutation.mutate(content)

    event.target.anecdote.value = ''
    console.log('new anecdote')
}
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification 
      message={state?.message}
      />
      <AnecdoteForm
      onCreate={onCreate}
      />
    
      {anecdotes?.sort(((a, b) => {
        if (a.votes < b.votes) {
          return 1
        }
        if (a.votes > b.votes) {
          return -1
        }
        return 0
      })).map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default App
