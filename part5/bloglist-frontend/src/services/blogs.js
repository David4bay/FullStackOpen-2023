import axios from 'axios'
import tokenHelper from './tokenHelper'
import { baseUrl, registerUrl, loginUrl } from './data'

const getAll = (setUser, setBlogs) => {
  const token = tokenHelper.tokenGetter()
  console.log("this is the token returned", token)
  const request = axios.get(baseUrl, { Authorization: `Bearer ${token?.token}` })

  return request.then(({data}) => {
    if (token) {
      console.log(data)
      setUser(token?.username)
      console.log("these are the blogs returned", data)
      setBlogs(data)
    }
  })
}

const login = (userData, setUser) => {
  axios.post(loginUrl, userData).then(({data}) => {
    if (!data) {
      throw new Error('Login Failed.')
    } else {
      console.log("frontend token info", data)
      tokenHelper.tokenSetter(data)
      setUser(data?.username)
    }
  })
}

export default { getAll, login }