

const Notice = ({ notification }) => {

    const noticeStyles = {
        border: `4px solid ${notification.includes('Failed ') ? 'darkred' : notification.includes('invalid') ? 'darkred' : 'green'}`,
        backgroundColor: 'grey',
        padding: '5px',
        color: `${notification.includes('Failed ') ? 'darkred' : notification.includes('invalid') ? 'darkred' : 'green'}`,
        fontSize: '1rem',
        fontFamily: 'Tahoma'
    }

    return notification ? (<p style={noticeStyles}>{notification}</p>) : null
}

export default Notice