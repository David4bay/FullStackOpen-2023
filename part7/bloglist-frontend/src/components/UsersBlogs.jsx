import { useParams } from "react-router-dom"
import ListOfBlogs from "./ListOfBlogs"


const UsersBlogs = ({blogsTable}) => {

    const blogId = useParams().id

    console.log("blogsTableInsideUserBlogs", blogsTable)

    const usersBlogsIndex = blogsTable?.findIndex(({ blogs, username, name, id}) => {
        blogs.filter((blog) => blog.id === blogId)
    })

    const userInfo = blogsTable?.filter(({id}) => id === blogId)[0]

    const blogOfUsers = blogsTable[usersBlogsIndex]

    // console.log("usersBlogsIndex", usersBlogsIndex)

    // console.log("userInfo", userInfo)

    // console.log("blogOfUsers", blogOfUsers)

    return (
        <>
        <h2>{userInfo?.name}</h2>
            <h3>
                added blogs
            </h3>
            {blogOfUsers ? 
            <ul>
                <ListOfBlogs blogOfUsers={blogOfUsers} />
            </ul> : 
            <p>No blogs available from this user.</p>
            }
        </>
    )
}

export default UsersBlogs