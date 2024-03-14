import { LOAD_BLOGS, NEW_COMMENT } from "../reducer/blogsReducer"
import { 
    CANCELLED_DELETE_BLOG, 
    DELETE_BLOG, 
    ERROR_BLOG_POST, 
    INCREASE_BLOG_LIKES, 
    LOGGED_IN, 
    NEW_BLOG_POST, 
    RESET_NOTIFICATION, 
    WRONG_CREDENTIALS,
} from "../reducer/noticeReducer"

export const newBlogAction = (newBlogTitle, newBlogAuthor) => {
    return {
        type: NEW_BLOG_POST,
        message: `${newBlogTitle} created by ${newBlogAuthor}`
    }
}

export const blogErrorAction = (newMessage) => {
    return {
        type: ERROR_BLOG_POST,
        message: `${newMessage}`
    }
}

export const resetNotification = () => {
    return {
        type: RESET_NOTIFICATION
    }
}

export const blogLikesIncreased = (blogTitle) => {
    return {
        type: INCREASE_BLOG_LIKES,
        message: `${blogTitle} like increased`
    }
}

export const blogDeletedAction = (blogTitle, blogAuthor) => {
    return {
        type: DELETE_BLOG,
        message: `${blogTitle} by ${blogAuthor} deleted`
    }
}

export const cancelledDeleteBlog = (blogTitle) => {
    return {
        type: CANCELLED_DELETE_BLOG,
        message: `Cancelled deleting ${blogTitle}`
    }
}

export const loggedInNotification = () => {
    return {
        type: LOGGED_IN,
        message: 'Logged in successfully'
    }
}

export const loggedOutNotification = () => {
    return {
        type: LOGGED_
    }
}

export const wrongCredentials = () => {
    return {
        type: WRONG_CREDENTIALS,
        message: 'wrong credentials'
    }
}


export const loadBlogs = (detail = []) => {
    console.log("detail from action creator", detail)
    return {
        type: LOAD_BLOGS,
        detail,
    }
}

export const addNewCommentAction = (detail = []) => {
    return {
        type: NEW_COMMENT,
        detail,
    }
}