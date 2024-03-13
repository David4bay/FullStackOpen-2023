import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const navigate = useNavigate()
  
    const contentHook = useField('text')
    const authorHook = useField('text')
    const infoHook = useField('text')

    const buttonHook = useField('button', { contentHook, authorHook, infoHook})
  
    const handleSubmit = (e) => {
      e.preventDefault()

      const newAnecdote = {
        content,
        author,
        info,
        votes: 0
      }
      
      props.addNew(newAnecdote)
      props.setNotification(content)
      navigate('/')
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' {...contentHook} />
          </div>
          <div>
            author
            <input name='author' {...authorHook} />
          </div>
          <div>
            url for more info
            <input name='info' {...infoHook} />
          </div>
          <button>create</button>
          <button {...buttonHook}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew