import { useState, forwardRef, useImperativeHandle } from 'react'

const ToggleBlogList = forwardRef((props, ref) => {

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

    useImperativeHandle(ref, () => {
        return {
            toggleBlogView
        }
    })

    return (
        <>
        <div style={blogList}>
            {props.title} {props.author}
            <button onClick={toggleBlogView}>{props.view}</button>
        </div>
        <div style={hideBlogList}>
            {props.children}
        </div>
        </>
    )
})

export default ToggleBlogList