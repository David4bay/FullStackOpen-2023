import { useRef } from 'react'
import ToggleBlogList from './ToggleBlogList'
import services from '../services/blogs'

const Blog = ({ setBlogs, setNotification, blog }) => {

  const sortLikes = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }

  const { title, author, likes, url, id } = blog

  const toggleViewRef = useRef()

  const toggleViewHandler = (e) => {

    toggleViewRef.current.toggleBlogView()
  }

  const likeButtonHandler = (blogs) => {

    services.editBlog({...blogs, likes: blogs.likes + 1}).then(({data}) => {
      console.log("updated like count")
      data = data.sort(sortLikes)
      setBlogs(data)
      setNotification(`${blogs.title} like increased`)
    })
  }

  const deleteButtonHandler = (blogs) => {
    
    const { id } = blogs
    const confirm = process.env.NODE_ENV === 'test' ? true : window.confirm(`Remove blog ${blogs.title} by ${blogs.author}`)
    if (confirm) {
      return services.deleteBlog(id).then(({data}) => {
        data ? data?.sort(sortLikes) : data = []
        setBlogs(data)
        setNotification(`${blogs.title} by ${blogs.author} deleted`)
      })
    }
    return setNotification(`Cancelled deleting ${blogs.title}`)
  }

  return (
    <ToggleBlogList ref={toggleViewRef} title={title} author={author} view="view">
      <ul>
      {title ? <li>
              {title} <button type="button" onClick={toggleViewHandler}>hide</button>
              </li> : '' }
      {url ? <li>
              {url}
             </li> : '' }
      {likes || likes === 0 ?
              <>
              <li>
              likes {likes.toString()}
              <button type="button" className="like__Button" onClick={() => likeButtonHandler(blog)}>like</button>
              </li>
                </> : '' }
      {author ? <li>{author}</li> : '' }
      <button type="button" onClick={() => deleteButtonHandler(blog)}>delete</button>
      </ul>
    </ToggleBlogList>
)
}

export default Blog