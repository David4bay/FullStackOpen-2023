import './App.css'
import Form from './components/Form'
import Notice from './components/Notice'
import { useState, useEffect } from 'react'
import diaryServices from './services/services'
import Diaries from './components/Diaries'

function App() {

  const [errorMessage, setErrorMessage] = useState('')
  const [diaries, setDiaries] = useState([])
  const [loadDiaries, setLoadDiaries] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
      if (errorMessage) {
        timeout = setTimeout(() => {
          setErrorMessage('')
        }, 5000)
    }
    
    return () => clearTimeout(timeout)

  }, [errorMessage, setErrorMessage])


  useEffect(() => {
    if (!loadDiaries) {
      diaryServices.fetchDiaries().then((response) => {

        const { data } = response

        setDiaries(data)
        setLoadDiaries(true)

      }).catch((err: { message: string}) => {

        console.log(err.message)
        setErrorMessage(err.message)
        setLoadDiaries(true)
      })
    }
  }, [loadDiaries])

  return (
    <>
    <h1>
      Add new entry
    </h1>
    <Notice errorMessage={errorMessage} />
    <Form setErrorMessage={setErrorMessage} setDiaries={setDiaries} diaries={diaries} />
    <Diaries diaries={diaries} />
    </>
  )
}

export default App
