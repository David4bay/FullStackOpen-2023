

const ListOfBlogs = ({blogOfUsers}) => {
    return (
        <>
        {blogOfUsers.blogs?.map(({ title }) => (
                <li key={title}>{title}</li>
            ))}
        </>
    )
}

export default ListOfBlogs