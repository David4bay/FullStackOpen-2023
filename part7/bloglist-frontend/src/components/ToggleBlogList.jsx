import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const ToggleBlogList = forwardRef((props, refs) => {
    
    const [blogDetails, setBlogDetails] = useState(false)

    const blogList = { 
                        display: blogDetails ? 'none' : '', 
                        padding: '5px', border: '1px solid black', 
                        margin: '5px 0px' 
                    }

    const hideBlogList = { 
                            display: blogDetails ? '' : 'none', 
                            padding: '5px', border: '1px solid black', 
                            margin: '5px 0px'
                        }

    const toggleBlogView = () => {
        setBlogDetails(!blogDetails)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleBlogView
        }
    })

    return (
        <>
        <div className="brief__BlogDetail" style={blogList}>
            {props.title} {props.author}
            <button className="reveal__BlogBtn" onClick={toggleBlogView}>{props.view}</button>
        </div>
        <div className="full__BlogDetail" style={hideBlogList}>
            {props.children}
        </div>
        </>
    )
})

ToggleBlogList.propTypes = {
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default ToggleBlogList