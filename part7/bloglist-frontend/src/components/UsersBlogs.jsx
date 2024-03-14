import { useParams } from "react-router-dom"
import ListOfBlogs from "./ListOfBlogs"


const UsersBlogs = ({blogsTable}) => {

    const blogId = useParams().id

    console.log("blogsTableInsideUserBlogs", blogsTable)

    const usersBlogsIndex = blogsTable?.findIndex(({ blogs, username, name, id}) => {
        blogs.filter((blog) => blog.id === blogId)
    })

    const userInfo = blogsTable?.filter(({id}) => id === blogId)[0]

    const blogOfUsers = userInfo?.blogs

    console.log("usersBlogsIndex", usersBlogsIndex)

    console.log("userInfo", userInfo)

    console.log("blogOfUsers", blogOfUsers)

    return (
        <>
        <h2>{userInfo?.name}</h2>
            <h3>
                added blogs
            </h3>
            {blogOfUsers.length> 0 ? 
            <>
                <ListOfBlogs blogOfUsers={blogOfUsers} />
            </> : 
            <p>No blogs available from this user.</p>
            }
        </>
    )
}

export default UsersBlogs