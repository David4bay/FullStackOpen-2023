

const Notice = ({ notification }) => {

    const noticeStyle = {
        border: '1px solid gray',
        backgroundColor: 'none',
        borderRadius: '5px',
        width: 'max-content',
        paddingRight: '10px',
        paddingLeft: '10px'

        
    }

    if (!notification || notification === null) return

    return (
        <div style={noticeStyle}>{notification} created!</div>
    )
}

export default Notice