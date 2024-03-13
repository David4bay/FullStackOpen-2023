import {
    useState
} from 'react'

const Togglable = (props) => {

    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const viewBody = {display: visibility ? '' : 'none'}

    const viewCancel = {display: visibility ? 'none' : ''}

    return (
        <div>
            <div style={viewBody}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
            <div style={viewCancel}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
        </div>
    )
}

export default Togglable