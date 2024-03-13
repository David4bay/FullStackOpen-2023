import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import blogsReducer from '../reducer/blogsReducer'
import noticeReducer from '../reducer/noticeReducer'
import userInfoReducer from '../reducer/userInfoReducer'

const rootReducer = combineReducers({
    notice: noticeReducer,
    user: userInfoReducer,
    blogs: blogsReducer,
})

export const store = configureStore({
    reducer: rootReducer
})