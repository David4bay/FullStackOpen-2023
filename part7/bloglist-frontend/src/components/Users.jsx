import { useSelector, useDispatch } from 'react-redux'
import { loggedInAction, loggedOutAction } from '../action/userAction'
import { useEffect } from 'react'
import blogs from '../services/blogs'
import { blogErrorAction, loadBlogs } from '../action/blogActions'
import tokenHelper from '../services/tokenHelper'
import UsersTable from './UsersTable'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import UsersBlogs from './UsersBlogs'

const Users = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const username = useSelector((state) => state.user.username)

    const blogsTable = useSelector((state) => state.blogs)
    
    const logoutHandler = () => {
        dispatch(loggedOutAction())
    }
    
    useEffect(() => {

        const info = tokenHelper.tokenGetter()

        if (!info) return navigate("/")

        dispatch(loggedInAction({ username: info.username, name: info.name}))

        blogs.getBlogUsers().then(({data}) => {
            dispatch(loadBlogs(data))
        }).catch((err) => {
            // dispatch(blogErrorAction(err))
        })
    }, [])

    console.log("blogsTable", blogsTable)

return (
    <>
    <p>
    <Link to="/">Home</Link>
    </p>    
    <h3>
    blogs
    </h3>
    <p>
        <strong>{username}</strong> logged in
    </p>
    <button onClick={logoutHandler}>
        logout
    </button>
    <h3>
        Users
    </h3>
    <Routes>
        <Route path="/" element={<UsersTable blogsTable={blogsTable} />} />
        <Route path=":id" element={<UsersBlogs blogsTable={blogsTable} />} />
    </Routes>
    </>
)
}

export default Users