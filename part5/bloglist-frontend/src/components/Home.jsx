

const Home = ({ user, logout }) => {
    return (
        <>
        <strong>{user}</strong> is logged in at the moment
        <button type="button" onClick={logout}>logout</button>
        </>
    )
}

export default Home