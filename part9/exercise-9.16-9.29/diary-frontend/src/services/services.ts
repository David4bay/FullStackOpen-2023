import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../types'

const mainUrl = `http://localhost:${import.meta.env.VITE_DIARY_BACKEND_PORT}/api/diaries/`

export interface FetchDiaries {
    data: DiaryEntry[] | null | any
}

async function fetchDiaries(): Promise<FetchDiaries> {
    const response: FetchDiaries = await axios.get(mainUrl)
    return response as FetchDiaries
}

async function postDiary(newEntry: NewDiaryEntry): Promise<DiaryEntry> {
    const response: DiaryEntry = await axios.post(mainUrl, newEntry)
    return response as DiaryEntry
}

async function fetchSingleDiary(diaryId: number): Promise<DiaryEntry> {
    const response: DiaryEntry = await axios.get(`${mainUrl}${diaryId}`)
    return response as DiaryEntry
}

export default {
    fetchSingleDiary,
    postDiary,
    fetchDiaries
}