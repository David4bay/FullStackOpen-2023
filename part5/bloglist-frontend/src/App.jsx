import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import tokenService from './services/tokenHelper'
import Form from './components/Form'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll(setUser, setBlogs).then(blogs => {
      setBlogs(blogs)
  })  
  }, [user])

  if (user) {
    return (
      <div>    
        <h2>blogs</h2>
        <strong>{user}</strong> logged in at the moment<button type="button">logout</button>
        {blogs ? blogs?.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ) : <p>No blogs are available at the moment. Feel free to create one</p>}
      </div>
    )
  }
  return <Form setUser={setUser} user={user} />
}

export default App