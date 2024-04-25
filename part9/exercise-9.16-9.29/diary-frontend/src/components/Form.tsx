import { diaryService } from '../services/services'

function Form() {

    function handleSubmit(e) {
        e.preventDefault()

        console.log("New Diary Info", ...new FormData(e.target))


        // diaryService.postDiary()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="date">date</label>
            <input type="date" id="date" name="date" />
            <label htmlFor="visibility">visibility</label>
            <input type="text" id="visibility" name="visibility" />
            <label htmlFor="weather">weather</label>
            <input type="text" id="weather" name="weather" />
            <label htmlFor="comment">comment</label>
            <input type="text" id="weather" name="weather" />
            <input type="submit" value="add" />
        </form>
    )
}

export default Form