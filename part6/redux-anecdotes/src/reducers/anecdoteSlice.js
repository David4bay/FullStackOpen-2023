import { createSlice } from '@reduxjs/toolkit'
import { getState } from './anecdoteReducer'

export const anecdotesAtStart = [
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

const initialState = anecdotesAtStart.map(asObject)

export const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState,
    reducers: {
      addVote(state, action) {
        
        console.log("id is action.payload", action.payload)
        const indexOfTopic = state.findIndex((element) => element.id === action.payload)

        console.log("indexOfTopic", indexOfTopic)

        // return indexOfTopic !== -1 ? state[indexOfTopic].votes + 1 : null

        state[indexOfTopic].votes = state[indexOfTopic].votes + 1
      },

      resetState(state, action) {
        return state = initialState
      }

    }
  })
  
  export const { addVote, resetState } = anecdoteSlice.actions