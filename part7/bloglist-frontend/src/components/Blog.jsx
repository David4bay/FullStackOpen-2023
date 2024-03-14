// import { useRef } from 'react'
import ToggleBlogList from './ToggleBlogList'
import services from '../services/blogs'
import { useDispatch } from 'react-redux'
import { blogDeletedAction, blogLikesIncreased, cancelledDeleteBlog } from '../action/blogActions'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const { title, author, id } = blog

  const listStyle = {
    padding: '5px',
    border: '1px solid black',
    backgroundColor: 'hsla(0, 0%, 80%, 0.9)',
    color: 'black',
    margin: '3px',
    borderRadius: '5px'
  }

  return (
    <li style={listStyle}>
      <Link to={`/blogs/${id}`}>{title} {author}</Link>
    </li>
)
}

export default Blog