import { useSelector, useDispatch } from 'react-redux'
import { loggedInAction, loggedOutAction } from '../action/userAction'
import { useEffect } from 'react'
import blogs from '../services/blogs'
import { blogErrorAction, loadBlogs } from '../action/blogActions'
import tokenHelper from '../services/tokenHelper'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import SingleBlog from './SingleBlog'

const SingleBlogPost = () => {

    const navigate = useNavigate()

    const blogId = Object.values(useParams())[0]

    useEffect(() => {
            if (!blogId) {
                return navigate("/")
            }
    })

    console.log("blogDetail", blogId)

    const dispatch = useDispatch()
    
    const username = useSelector((state) => state.user.username)

    const blogsTable = useSelector((state) => state.blogs)

    const outerIndex = blogsTable.findIndex(({blogs}) => {
        return blogs?.find(({id}) => {
            console.log("id", id, "blogId", blogId)
            return id === blogId
        })
    })

    const innerIndex = blogsTable[outerIndex]?.blogs.findIndex(({id}) => {
        return id === blogId
    })

    console.log("outerIndex", outerIndex, "innerIndex", innerIndex)

    const lookupBlog = blogsTable[outerIndex]?.blogs[innerIndex] || []

    console.log("lookupBlog", lookupBlog)

    let details = {
        title: lookupBlog?.title || "",
        id: lookupBlog?.id || "",
        author: lookupBlog?.author || "",
        likes: lookupBlog?.likes || 0,
        url: lookupBlog?.url || "",
        comments: lookupBlog?.comments || []
    }

    console.log("lookupBlogComments", lookupBlog)
    
    const logoutHandler = () => {
        dispatch(loggedOutAction())
        return navigate("/")
    }
    
    useEffect(() => {

        const info = tokenHelper.tokenGetter()

        if (!info) return navigate("/")

        dispatch(loggedInAction({ username: info.username, name: info.name}))

        blogs.getBlogUsers().then(({data}) => {
            dispatch(loadBlogs(data))
        }).catch((err) => {
            dispatch(blogErrorAction(err))
        })
    }, [])

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
        {lookupBlog?.title}
    </h3>
    <Routes>
        <Route path="/" element={<p>Blog does not exist.</p>} />
        <Route path=":id" element={
        <SingleBlog
        url={details?.url}
        likes={details?.likes}
        author={details?.author}
        title={details?.title}
        id={details?.id}
        comments={details?.comments}
         />
        } 
         />
    </Routes>
        </>
    )
}

export default SingleBlogPost