

const ListOfBlogs = ({blogOfUsers}) => {
    return (
        <ul>
        {blogOfUsers?.map(({ title }) => (
                <li key={title}>{title}</li>
            ))}
        </ul>
    )
}

export default ListOfBlogs