import tokenHelper from './tokenHelper'
import axios from 'axios'
import { baseUrl, registerUrl, loginUrl, postBlogUrl } from './data'


const getAll = async () => {
  const auth = tokenHelper.tokenGetter()

  console.log('this is the token returned', auth)

  const response = await axios.get(baseUrl, { headers: { 'Authorization': `Bearer ${auth?.token}` } })

  return response
}

const login = async (userData) => {
  console.log('user data from login service', userData)

  const response = await axios.post(loginUrl, userData)

  tokenHelper.tokenSetter(await response?.data)

  console.log('response data from axios for login', response)

  return response
}

const createBlog = async (data) => {
  const auth = tokenHelper.tokenGetter()

  console.log('auth in create blog service', auth)

  return await axios.post(postBlogUrl, { ...data }, { withCredentials: true, headers: { 'Authorization': `Bearer ${auth.token}` } })
}

const editBlog = async (data) => {
  const auth = tokenHelper.tokenGetter()

  const { id } = data

  const response = await axios.put(`${postBlogUrl}/${id}`, data, { withCredentials: true, headers: { 'Authorization': `Bearer ${auth.token}` } })

  return response
}

const deleteBlog = async (id) => {
  const deleteBlogUrl = postBlogUrl

  const auth = tokenHelper.tokenGetter()

  const response = await axios.delete(`${deleteBlogUrl}/${id}`, { withCredentials: true, headers: { 'Authorization': `Bearer ${auth.token}` } })

  return response
}

const getBlogUsers = async () => {
  const blogUrl = registerUrl

  const response = await axios.get(blogUrl)

  return response
}

const addComment = async (id, comment) => {
  const blogUrl = postBlogUrl

  const auth = tokenHelper.tokenGetter()

  const response = await axios.post(`${blogUrl}/${id}/comments`, {comment}, { withCredentials: true, headers: { 'Authorization': `Bearer ${auth.token}` } })

  return response
}

export default { 
  getAll, 
  login, 
  createBlog, 
  editBlog, 
  deleteBlog,
  getBlogUsers,
  addComment
}