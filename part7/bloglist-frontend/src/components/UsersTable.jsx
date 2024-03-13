import { Link } from "react-router-dom"


const UsersTable = ({blogsTable}) => {
    return (
        <>
        <table>
        <thead>
        <tr>
            <td>
                <strong>name(s)</strong>
            </td>
            <td>
                <strong>blogs created</strong>
            </td>
        </tr>
        </thead>
        {blogsTable?.map(({ blogs, username, name, id }) => (
        <tbody key={name}>
            <tr>
                <td>
                    <Link to={`/users/${id}`}>{name}</Link>
                </td>
                <td>
                    {blogs.length}
                </td>
            </tr>
        </tbody>))}
    </table>
        </>
    )
}

export default UsersTable