import { useDispatch } from "react-redux"
import { addNewNote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleNewNote = (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)

        const newNote = formData.get('note')

        if (!newNote) {
            return
        }

        dispatch(addNewNote(newNote))

        const input = document.querySelector('#new_note')

        input.value = ''
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={handleNewNote}>
            <div>
                <label htmlFor="new_note"></label>
                <input type="text" id="new_note" name="note" />
            </div>
            <button type="submit">create</button>
        </form>
        </>
    )
}

export default AnecdoteForm