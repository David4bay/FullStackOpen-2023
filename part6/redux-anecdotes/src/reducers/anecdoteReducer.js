import { createSlice } from '@reduxjs/toolkit'

export const UPVOTE = 'UPVOTE'
export const NEW_NOTE = 'NEW_NOTE'
export const SORT = 'SORT'
export const GET_STATE = 'GET_STATE'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const upvoter = (id) => {
  return {
    type: UPVOTE,
    id
  }
}

export const addNewNote = (newNote) => {
  return {
    type: NEW_NOTE,
    note: newNote
  }
}

export const getState = () => {
  return {
    type: GET_STATE
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === GET_STATE) {
    return [...initialState]
  }

  if (action.type === UPVOTE) {
    
    
    return [...state.slice(0, indexOfTopic), { id: action.id, content: state[indexOfTopic].content, votes: state[indexOfTopic].votes + 1 }, ...state.slice(indexOfTopic + 1)]
  }

  if (action.type === NEW_NOTE) {
    return [...state, { id: getId(), content: action.note, votes: 0 }]
  }

  return state
}

export default anecdoteReducer