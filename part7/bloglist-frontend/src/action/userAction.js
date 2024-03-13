import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../reducer/userInfoReducer"
import { USER } from "../services/data"

export const loggedInAction = ({username, name}) => {
    return {
        type: USER_LOGGED_IN,
        username,
        name
    }
}

export const loggedOutAction = () => {
    localStorage.removeItem(USER)
    return {
        type: USER_LOGGED_OUT
    }
}