import axios from 'axios'
import tokenHelper from './tokenHelper'
import { baseUrl, registerUrl, loginUrl, postBlogUrl } from './data'

const getAll = (setUser, setBlogs) => {

  const token = tokenHelper.tokenGetter()
  console.log("this is the token returned", token)
  const request = axios.get(baseUrl, { Authorization: `Bearer ${token?.token}` })

  return request.then(({data}) => {
    if (!token) return null

    if (token) {
      console.log(data)
      setUser(token?.username)
      console.log("these are the blogs returned", data)
      setBlogs(data)
    }

  })

}

const login = async (userData, setUser, setNotification) => {

  console.log("user data from login service", userData)

  let response

  try {
    response = await axios.post(loginUrl, userData)
    console.log("response data from axios for login", response)
  } catch (err) {
    return setNotification(`wrong username or password`)
  }
  console.log("frontend token info", response?.data)
  tokenHelper.tokenSetter(response?.data)
  setNotification('Logged in successfully')
  setUser(response.data?.username)
}

const createBlog = async (data) => {

  const auth = tokenHelper.tokenGetter()
  console.log("auth in create blog service", auth)
  return await axios.post(postBlogUrl, {...data}, { withCredentials: true, headers: { 'Authorization': `Bearer ${auth.token}` } })
}

export default { getAll, login, createBlog }