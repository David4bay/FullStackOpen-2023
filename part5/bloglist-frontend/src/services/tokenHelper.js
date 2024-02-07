import { USER } from './data'

const tokenSetter = token => {
  return token ? localStorage.setItem(USER, JSON.stringify(token)) : null
}

const tokenGetter = () => {
  const getUser = localStorage.getItem(USER)
  return getUser ? JSON.parse(getUser) : null
}

export default {
  tokenSetter,
  tokenGetter
}