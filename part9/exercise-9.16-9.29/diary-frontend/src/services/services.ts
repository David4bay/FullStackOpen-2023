import axios from 'axios'
import { mainUrl } from '../common/common'
import { DiaryEntry, NewDiaryEntry } from '../types'

async function fetchDiaries(): Promise<DiaryEntry> {
    const response: DiaryEntry = await axios.get(mainUrl)
    return response
}

async function postDiary(newEntry: NewDiaryEntry): Promise<DiaryEntry> {
    const response: DiaryEntry = await axios.post(mainUrl, {...newEntry})
    return response
}

async function fetchSingleDiary(diaryId: number): Promise<DiaryEntry> {
    const response: DiaryEntry = await axios.get(`${mainUrl}/${diaryId}`)
    return response
}

export {
    fetchSingleDiary,
    postDiary,
    fetchDiaries
}