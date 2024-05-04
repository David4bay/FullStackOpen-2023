import React from "react"
import { DiaryEntry } from "../types"

interface DiaryProps {
    diaries: DiaryEntry[]
}


function Diaries({diaries}: DiaryProps) {
    return diaries.map((diary) => (
        <div key={`${diary.id}%20${diary.comment}%20${diary.date}%20${diary.weather}`}>
            <h3>
                {diary.date}
            </h3>
            <span style={{fontSize: '1.2em'}}>
                {diary.visibility}
            </span><br/>
            <span style={{fontSize: '1.2em'}}>
                {diary.weather}
            </span>
        </div>
    ))
}

export default Diaries