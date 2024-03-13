

const Notice = ({ notification }) => {

    const stylingNotification = notification.includes('Failed') ? 'error' : notification.includes('wrong ') ? 'error' : 'success'

    const noticeStyles = {
        border: `4px solid ${notification.includes('Failed ') ? 'rgb(255, 0, 0)' : notification.includes('invalid') ? 'rgb(255, 0, 0)' : notification.includes('wrong') ? 'rgb(255, 0, 0)' : 'green'}`,
        backgroundColor: 'grey',
        padding: '5px',
        color: `${notification.includes('Failed ') ? 'rgb(255, 0, 0)' : notification.includes('invalid') ? 'rgb(255, 0, 0)' : notification.includes('wrong') ? 'rgb(255, 0, 0)' : 'green'}`,
        fontSize: '1rem',
        fontFamily: 'Tahoma'
    }

    return notification ? (<p className={stylingNotification} style={noticeStyles}>{notification}</p>) : null
}

export default Notice