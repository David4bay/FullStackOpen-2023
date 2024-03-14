import blogs from "../services/blogs"

export const LOAD_BLOGS = "LOAD_BLOGS"
export const NEW_COMMENT = "NEW_COMMENT"

const initialState = []


const blogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_BLOGS:
            return [...action.detail]
        case NEW_COMMENT:
            return [...action.detail]
        default:
            return state
    }
}

export default blogsReducer