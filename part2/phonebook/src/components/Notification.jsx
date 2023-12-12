/* eslint-disable react/prop-types */

const Notification = ({ success, message }) => {
    if (message === null || !message) {
        return null
    }
    return (
        <div className={success ? 'success' : 'error'}>
            {message}
        </div>
    )
}

export default Notification