import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { blogErrorAction, newBlogAction, resetNotification } from './action/blogActions'
import { loggedInAction } from './action/userAction'

const App = () => {

  const name = {
    title: '',
    author: '',
    url: ''
  }
  
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [input, setInput] = useState(name)

  const notification = useSelector((state) => state.notice.notification)
  const usernameInUserReducer = useSelector((state) => state.user.username)
  const nameInReducer = useSelector((state) => state.user.name)

  const dispatch = useDispatch()

  const sortLikes = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }


  // const [notification, setNotification] = useState('')

  useEffect(() => {

    const auth = tokenHelper.tokenGetter()

    if (auth?.token) {
      blogService.getAll(setUser, setBlogs).then(({data}) => {
        console.log("data from blog", data)
  
        if (auth?.token && !usernameInUserReducer && !nameInReducer) {
          dispatch(loggedInAction({ username: auth.username, name: auth.name }))
          console.log("auth", auth)
          console.log("usernameInReducer", usernameInUserReducer, "userInReducer", nameInReducer)
        }
        setUser(auth?.username)
        data = data.sort(sortLikes)
        setBlogs(data)
      })

    }
    console.log("blogs in app", blogs) 
  }, [])

  useEffect(() => {
    let noticeTimeout
    console.log(notification)
    notification ? 
      noticeTimeout = setTimeout(() => {
        // setNotification('')
        dispatch(resetNotification())
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
    console.log("blog submitted")
    e.preventDefault()

    let { title, author, url } = input

    const data = { title, author, url }

    blogService.createBlog(data).then((response) => {
      console.log("response from create blog form service", response)
      // setNotification(`${response.data.title} created by ${response.data.author}`)

      const newBlogTitle = response.data.title
      const newBlogAuthor = response.data.author

      dispatch(newBlogAction(newBlogTitle, newBlogAuthor))
      dispatch(load)
    }).catch((err) => {
    // setNotification(err.response.data?.error)

    let errorMessage = err.response.data?.error

    dispatch(blogErrorAction(errorMessage))
    console.log("error in create blog form service", err)
})
}

  if (user) {
    
    return (
      <div>
        <Notice 
        notification={notification}
        />
        <Home
        user={user}
        logout={logout}
        />
        <h2>blog app</h2>
        <Togglable buttonLabel="create new blog">
        <CreateBlogForm 
        input={input}
        handleInput={handleInput}
        handleNewBlogSubmit={handleNewBlogSubmit}
        />
        </Togglable>
        <BlogList 
        blogs={blogs} 
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
    />
  </>
  )
}

export default App