import { Link } from 'react-router-dom'

const Home = ({ user, logout }) => {

    const homeStyle = {
        paddingBottom: '10px'
    }

    return (
        <p style={homeStyle}>
            <span>
                <Link to="/users">users </Link>
            </span>
            <span>
                <Link to="/blogs">blogs </Link>
            </span>
            <strong> {user}</strong> is logged in at the moment
        <button type="button" onClick={logout}>logout</button>
        </p>
    )
}

export default Home