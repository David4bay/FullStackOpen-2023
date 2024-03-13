import Blog from '../components/Blog'

const BlogList = ({ setBlogs, blogs }) => {
    return (
        <ul>
            {blogs.length ? blogs?.map(blog =>
          <Blog 
          key={blog.id} 
          blog={blog} 
          setBlogs={setBlogs}
          />
        ) : <p>No blogs are available at the moment. Feel free to create one</p>
        }
        </ul>
    )
}

export default BlogList