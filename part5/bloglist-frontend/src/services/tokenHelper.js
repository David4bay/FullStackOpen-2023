import { USER } from './data'

const tokenSetter = token => {
    return token ? localStorage.setItem(USER, JSON.stringify(token)) : null
}

const tokenGetter = () => {
    const getUser = localStorage.getItem(USER)
    console.log("this is the token returned from tokenGetter service", getUser)
    return getUser ? JSON.parse(getUser) : null
}

export default {
    tokenSetter,
    tokenGetter
}