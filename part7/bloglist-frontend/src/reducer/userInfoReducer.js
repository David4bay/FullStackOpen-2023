export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

const initialState = {
    username: '',
    name: ''
}

const userInfoReducer = (state = initialState, action) => {
    console.log("username", action?.username, "name", action?.name)
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                username: action.username,
                name: action.name,
            }
        case USER_LOGGED_OUT:
            return initialState
        default:
            return state
    }
}

export default userInfoReducer