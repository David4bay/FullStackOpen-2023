import services from '../services/blogs'


const CreateBlogForm = ({ input, handleInput, setNotification }) => {

    let { title, author, url } = input
    
    const handleNewBlogSubmit = (e) => {
        e.preventDefault()

        const data = { title, author, url }

        services.createBlog(data).then((response) => {
          console.log("response from create blog form service", response)
          setNotification(`${response.data.title} created by ${response.data.author}`)
        }).catch((e) => {
        setNotification(e.response.data?.error)
        console.log("error in create blog form service",e)
    })
    }

    return (
        <form onSubmit={handleNewBlogSubmit} >
          <h3>create new</h3>
          <div>
            <div className='input-container'>
            <label htmlFor="title">title</label>
            <input 
            type="text" 
            name="title" 
            id="title" 
            value={title} 
            onChange={handleInput} 
            required
            />
            </div>
            <div className="input-container">
            <label htmlFor="author">author</label>
            <input 
            type="text" 
            id="author" 
            name="author" 
            value={author} 
            onChange={handleInput} 
            />
            </div>
            <div className="input-container">
            <label htmlFor="url">url</label>
            <input 
            type="text" 
            id="url" 
            name="url" 
            value={url} 
            onChange={handleInput} 
            required
            />
            </div>
          </div>
        <input className="create-button" type="submit" value="create" />
        </form>
    )
}

export default CreateBlogForm