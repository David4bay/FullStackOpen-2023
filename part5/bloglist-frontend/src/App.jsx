import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { USER } from './services/data'
import blogService from './services/blogs'
import tokenService from './services/tokenHelper'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import Home from './components/Home'
import Notice from './components/Notice'
import Togglable from './components/Togglable'
import tokenHelper from './services/tokenHelper'

const App = () => {

  const name = {
    title: '',
    author: '',
    url: ''
  }

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [input, setInput] = useState(name)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const auth = tokenHelper.tokenGetter()
    blogService.getAll(setUser, setBlogs).then(({data}) => {
      console.log("data from blog", data)
      setUser(auth?.username)
      setBlogs(data)
    })
    console.log("blogs in app", blogs) 
  }, [])

  useEffect(() => {
    let noticeTimeout
    console.log(notification)
    notification ? 
      noticeTimeout = setTimeout(() => {
        setNotification('')
      }, 5000)
      : 
      null

      return () => clearTimeout(noticeTimeout)

  }, [notification])

  useEffect(() => {
    const auth = tokenHelper.tokenGetter()
    notification.includes('created') || notification.includes('failed') ? (
      blogService.getAll(setUser, setBlogs).then(({data}) => {
        setUser(auth?.username)
        setBlogs(data)
      })
    ) : null
  }, [])


  const logout = () => {
    localStorage.removeItem(USER)
    setUser(null)
  }

  const handleInput = (e) => {
    setInput((oldInput) => ({ ...oldInput, [e.target.name]: e.target.value }))
  }

  if (user) {
    
    return (
      <div>
        <Notice 
        notification={notification}
        />
        <h2>blogs</h2>
        <Home
        user={user}
        logout={logout}
        />
        <Togglable buttonLabel="create new blog">
        <CreateBlogForm 
        input={input}
        handleInput={handleInput}
        setNotification={setNotification}
        />
        </Togglable>
        <BlogList 
        blogs={blogs} 
        setBlogs={setBlogs}
        setNotification={setNotification}
        />
      </div>
    )
  }
  return (
  <>
    <Notice 
    notification={notification}
    />
    <LoginForm 
    setUser={setUser} 
    user={user} 
    setNotification={setNotification}
    />
  </>
  )
}

export default App