import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messageValue: '',
    timeout: 0
}

export const notificationSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        setMessage(state, action) {

            let value = Object.values(action.payload)

            return state = {
                messageValue: value[0],
                timeout: value[1]
            }
        },

        clearMessage(state, action) {
            return {
                messageValue: '',
                timeout: 0
            }
        }
    }
})

export const { setMessage, clearMessage } = notificationSlice.actions