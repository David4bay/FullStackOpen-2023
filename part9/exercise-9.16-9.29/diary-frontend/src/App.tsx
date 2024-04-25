import { useState } from 'react'
import './App.css'
import Notice from './components/Notice'
import Form from './components/Form'

function App() {

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
    <h1>
      Add new entry
    </h1>
    <Notice
    errorMessage={errorMessage}
    />
    <Form
    setErrorMessage={setErrorMess}
    </>
  )
}

export default App
