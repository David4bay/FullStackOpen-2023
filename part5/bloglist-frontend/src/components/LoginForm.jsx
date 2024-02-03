import React, { useState } from 'react'
import service from '../services/blogs'

const LoginForm = ({ setUser, user, setNotification }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [displayForm, setDisplayForm] = useState(false)
    
  
    const handleInputChange = (e) => {
      e.target.name === 'username' ? 
      setUsername(e.target.value) : 
      setPassword(e.target.value)
    }
  
    const handleFormSubmit = (e) => {

      e.preventDefault()
  
      console.log("username", username, "password", password)

      const data = {
        username,
        password
      }

      return service.login(data).then((response) => {
        setUser(response.data?.username)
        setNotification('Logged in successfully')
      })
    }

    const displayFormHandler = (e) => {
      setDisplayForm(!displayForm)
    }
  
    if (!user || user === null) {
      return !displayForm ? <button type="button" onClick={displayFormHandler}>Show Log In</button> : (
        <>
        <h1>log in to application</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <div style={{marginBottom: '10px'}}>
            <label htmlFor="username">username</label>
            <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="username" 
            value={username} 
            onChange={handleInputChange} 
            autoComplete="true"
            />
            </div>
            <div>
            <label htmlFor="password">password</label>
            <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="password" 
            value={password}
            onChange={handleInputChange}
            autoComplete="true" 
            />
            </div>
          </div>
          <input type="submit" value="login" /><br/>
          <button type="button" onClick={displayFormHandler}>Hide Login</button>
        </form>
        </>
      )
    }
  
    return null
  }

export default LoginForm