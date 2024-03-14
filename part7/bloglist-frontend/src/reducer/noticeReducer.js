

export const NEW_BLOG_POST = 'NEW_BLOG_POST'
export const ERROR_BLOG_POST = 'ERROR_BLOG_POST'
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION'
export const INCREASE_BLOG_LIKES = 'INCREASE_BLOG_LIKES'
export const DELETE_BLOG = 'DELETE_BLOG'
export const CANCELLED_DELETE_BLOG = 'CANCELLED_DELETE_BLOG'
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const WRONG_CREDENTIALS = 'WRONG_CREDENTIALS'

const initialState = {
    notification: ''
}

const noticeReducer = (state= initialState, action) => {
    switch(action.type) {
        case NEW_BLOG_POST:
            return {
                notification: action.message
            }
        case ERROR_BLOG_POST:
            return {
                notification: action.message
            }
        case RESET_NOTIFICATION:
            return {
                notification: ''
            }
        case INCREASE_BLOG_LIKES:
            return {
                notification: action.message
            }
        case DELETE_BLOG:
            return {
                notification: action.message
            }
        case CANCELLED_DELETE_BLOG:
            return {
                notification: action.message
            }
        case WRONG_CREDENTIALS:
            return {
                notification: action.message
            }
        case LOGGED_IN:
            return {
                notification: action.message
            }
        case LOGGED_OUT:
            return {
                notification: action.message
            }
        
        default:
            return state
    }
}

export default noticeReducer