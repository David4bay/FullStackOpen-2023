import React, { useState } from 'react'
import service from '../services/blogs'

const Form = ({ setUser, user }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
  
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

      return service.login(data, setUser)
    }
  
    if (!user || user === null) {
      return (
        <>
        <h1>log in to application</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
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
            <br/>
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
          <input type="submit" value="login" />
        </form>
        </>
      )
    }
  
    return null
  }

export default Form