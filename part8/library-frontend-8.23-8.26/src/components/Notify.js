

const Notify = ({message}) => {

    if (!message) return null

    if (message.title) {
        return <p>{message.title} by {message.author.name} added!</p>
    }

    return (
    <div>
        <p>
            {message}
        </p>
    </div>
        )
}

export default Notify