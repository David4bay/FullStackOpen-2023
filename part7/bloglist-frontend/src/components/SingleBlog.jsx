import { useState, useEffect } from 'react'
import services from '../services/blogs'
import { useDispatch } from 'react-redux'
import { loadBlogs, blogLikesIncreased, addNewCommentAction, blogErrorAction } from '../action/blogActions'

const SingleBlog = ({ url, likes, author, title, id, comments }) => {

    const [comment, setComment] = useState('')
    const [dataStale, setDataStale] = useState(false)

    const postStyle = {
        backgroundColor: 'hsla(0, 0%, 80%, 0.5)',
        color: 'black',
        lineHeight: 1.4,
        borderRadius: '15px',
        padding: '10px',
        marginRight: '5px'
    }

    const buttonStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
    }

    useEffect(() => {
        if (dataStale) {
            services.getAll()
            setDataStale(false)
        }
    }, [])

    const dispatch = useDispatch()

    const blogBody = { url, likes, author, title, id }

    const handleNewComment = (e) => {
        e.preventDefault()
        services.addComment(id, comment).then(({data}) => {
            dispatch(addNewCommentAction(data))
            setComment('')
            setDataStale(true)
        }).catch((err) => {
            dispatch(blogErrorAction(err))
        })
    }

    const likeButtonHandler = () => {

        services.editBlog({...blogBody, likes: blogBody.likes + 1}).then(({data}) => {
            console.log("updated like count")
            // data = data.sort(sortLikes)
            dispatch(loadBlogs(data))
            dispatch(blogLikesIncreased(title))
            setDataStale(true)
          }).catch((err) => {
            dispatch(blogErrorAction(err))
        })
    }

    console.log("likes", likes)

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div style={postStyle}>
        <p>
        <span> <a href={url} target="_blank">{url}</a></span><br/>
        <strong>{likes} like(s) <button type="button" style={buttonStyle} onClick={likeButtonHandler}>like</button>
        </strong><br/>
        <span>added by <strong>{author}</strong></span>
        </p>
        <p>
            <strong>comments</strong>
        </p>
        <form onSubmit={handleNewComment}>
            <input type="text" name="newComment" value={comment} onChange={handleChange} id="newComment" />
            <input style={buttonStyle} type="submit" value="add comment" />
        </form>
        <ul>
        {comments?.map(({comment, id}) => {
            {console.log("comment", comment)}
            return <li key={id}>{comment}</li>
        }
        )}
        </ul>
        </div>
    )
}

export default SingleBlog