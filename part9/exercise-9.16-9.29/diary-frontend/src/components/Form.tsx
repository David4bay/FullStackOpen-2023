import diaryService from '../services/services'
import { DiaryEntry, NewDiaryEntry } from '../types';

interface FormProps {
    diaries: DiaryEntry[];
    setDiaries: (diaries: DiaryEntry[] | any) => void;
    setErrorMessage: (errorMessage: string) => void;
}

interface SubmitTypes { 
    preventDefault: () => void;
    target: HTMLFormElement | any;
}

function Form({ setErrorMessage, setDiaries, diaries }: FormProps): JSX.Element {

    function handleSubmit(e: SubmitTypes): void {
        e.preventDefault()

        let target = e.target
        console.log("typeof target", typeof target)
        const formData = new FormData(target)

        const date = formData.get('date') as string || ''
        const visibility = formData.get('visibility') as string || ''
        const weather = formData.get('weather') as string || ''
        const comment = formData.get('comment') as string || ''

        let newDiaryData: NewDiaryEntry = {
            date,
            visibility,
            weather,
            comment,
        }
        
        console.log("New Diary Info", ...new FormData(target))
        console.log("Diary Data Format", newDiaryData)
        
        diaryService.postDiary(newDiaryData).then((data) => { 
        console.log(data)
        setDiaries(diaries.concat(data))
        }).catch((err: { message: string}) => {
            console.log(err.message)
            setErrorMessage(err.message)
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">date</label>
                <input type="date" id="date" name="date" />
            </div>
            <div>
            <span style={{marginRight: 8}}>visibility</span>
                <span>
                    <label htmlFor="great">great</label>
                    <input type="radio" name="visibility" id="great" />
                </span>
                <span>
                    <label htmlFor="good">good</label>
                    <input type="radio" name="visibility" id="good" />
                </span>
                <span>
                    <label htmlFor="okay">okay</label>
                    <input type="radio" name="visibility" id="okay" />
                </span>
                <span>
                    <label htmlFor="poor">poor</label>
                    <input type="radio" name="visibility" id="poor" />
                </span>
            </div> 
            {/*  sunny stormy windy cloudy rainy */}
            <div>
                <span style={{marginRight: 8}}>weather</span>
                <span>
                    <label htmlFor="sunny">sunny</label>
                    <input type="radio" name="weather" id="sunny" />
                </span>
                <span>
                    <label htmlFor="stormy">stormy</label>
                    <input type="radio" name="weather" id="stormy" />
                </span>
                <span>
                    <label htmlFor="windy">windy</label>
                    <input type="radio" name="weather" id="windy" />
                </span>
                <span>
                    <label htmlFor="cloudy">cloudy</label>
                    <input type="radio" name="weather" id="cloudy" />
                </span>
                <span>
                    <label htmlFor="rainy">rainy</label>
                    <input type="radio" name="weather" id="rainy" />
                </span>
            </div>
            <label htmlFor="comment">comment</label>
            <input type="text" id="comment" name="comment" />
            <input type="submit" value="add" />
        </form>
    )
}

export default Form