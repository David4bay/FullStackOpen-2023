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

  const sortLikes = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }

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
      data = data.sort(sortLikes)
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
        data = data.sort(sortLikes)
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

  const handleNewBlogSubmit = (e) => {
    e.preventDefault()

    let { title, author, url } = input

    const data = { title, author, url }

    services.createBlog(data).then((response) => {
      console.log("response from create blog form service", response)
      setNotification(`${response.data.title} created by ${response.data.author}`)
    }).catch((err) => {
    setNotification(err.response.data?.error)
    console.log("error in create blog form service", err)
})
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
        handleNewBlogSubmit={handleNewBlogSubmit}
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