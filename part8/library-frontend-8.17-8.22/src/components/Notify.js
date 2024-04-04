

const Notify = ({error}) => {

    if (!error) return null

    return <div>{error}</div>
}

export default Notify