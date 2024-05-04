
interface ErrorMessageProp {
    errorMessage: string
}

function Notice({errorMessage}: ErrorMessageProp): JSX.Element {

    if (!errorMessage || errorMessage.length < 1) {
        return <></>
    }

    return <p style={{ 
        fontSize: 18, 
        fontWeight: 'bolder',
        fontFamily: 'Noto-sans; sans-serif', 
        color: errorMessage.includes('fail') ? 'red' : 'green'}}>
            {errorMessage}
        </p>
}

export default Notice