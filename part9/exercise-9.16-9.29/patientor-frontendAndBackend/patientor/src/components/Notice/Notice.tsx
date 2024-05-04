import { Message } from '../../types'

function Notice({message}: Message) {

    if (!message) return null

    return (
        <strong style={{ fontWeight: "lighter", backgroundColor: "limegreen", display: "block", padding: "5px", color: "white" }}>{message}</strong>
    )
}

export default Notice