import { useRef } from 'react'
import ToggleBlogList from './ToggleBlogList'
import services from '../services/blogs'

const Blog = ({ setBlogs, setNotification, blog }) => {

  const { title, author, likes, url, id } = blog

  const toggleViewRef = useRef()

  const toggleViewHandler = (e) => {

    toggleViewRef.current.toggleBlogView()
  }

  const likeButtonHandler = (blogs) => {

    services.editBlog({...blogs, likes: blogs.likes + 1}).then(({data}) => {
      console.log("updated like count")
      setBlogs(data)
      setNotification(`${blogs.title} like increased`)
    })
  }

  const deleteButtonHandler = (ID) => {

    services.deleteBlog(ID).then(({data}) => {
      console.log(data)
    })
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
              <button type="button" onClick={() => likeButtonHandler(blog)}>like</button>
              </li>
                </> : '' }
      {author ? <li>{author}</li> : '' }
      <button type="button" onClick={() => deleteButtonHandler(id)}>delete</button>
      </ul>
    </ToggleBlogList>
)
}

export default Blog