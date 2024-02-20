import { createSlice } from "@reduxjs/toolkit";
// import { anecdotesAtStart } from './anecdoteSlice'
  
//   const getId = () => (100000 * Math.random()).toFixed(0)
  
//   const asObject = (anecdote) => {
//     return {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
  
// const initialState = anecdotesAtStart.map(asObject)

export const filterSlice = createSlice({
    name: 'filter',
    initialState: [], // data will be fetched from db.json
    reducers: {
        findContent(state, action) {
            return state.filter((element) => element.content.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers(builder) {
      builder.addCase('anecdote/resetState', (state, action) => {
        return state
      })
      builder.addCase('anecdote/setAnecdotes', (state, action) => {
        return action.payload
      })
      builder.addCase('anecdote/addAnecdote', (state, action) => {
        state.push(action.payload)
      })
    }
})

export const { findContent } = filterSlice.actions