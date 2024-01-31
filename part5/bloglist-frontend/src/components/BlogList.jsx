import Blog from '../components/Blog'

const BlogList = ({ blogs }) => {
    return (
        <>
            {blogs.length ? blogs?.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ) : <p>No blogs are available at the moment. Feel free to create one</p>
        }
        </>
    )
}

export default BlogList