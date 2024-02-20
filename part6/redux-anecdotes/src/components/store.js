import anecdoteService from '../services/anecdotes'
import { configureStore } from '@reduxjs/toolkit'
import { anecdoteSlice, setAnecdotes } from '../reducers/anecdoteSlice'
import { filterSlice } from '../reducers/filterSlice'
import { notificationSlice } from '../reducers/notificationSlice'


export const store = configureStore({
    reducer: {
      anecdotes: anecdoteSlice.reducer,
      filter: filterSlice.reducer,
      notification: notificationSlice.reducer
    }
  })

  anecdoteService.getAll().then(anecdotes => {
    anecdotes.forEach(anecdote => {
      store.dispatch(setAnecdotes(anecdote))
    })
  })