import { configureStore } from '@reduxjs/toolkit'
import { anecdoteSlice } from '../reducers/anecdoteSlice'
import { filterSlice } from '../reducers/filterSlice'


export const store = configureStore({
    reducer: {
      anecdotes: anecdoteSlice.reducer,
      filter: filterSlice.reducer
    }
  })