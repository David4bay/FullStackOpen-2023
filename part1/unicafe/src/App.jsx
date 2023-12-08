/* eslint-disable react/prop-types */
import { useState } from 'react'
import "./App.css"

const Statistics = ({good, neutral, bad, average, positive, all}) => {

  return(
    <>
    <p>
    <strong>statistics</strong>
    </p>
    <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} />
    </table>
    </>
  )
}

const StatisticLine = (props) => {

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = ({text, onClick}) => {

  return (
    <button type="button" onClick={onClick}>{text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodVote = () => {
    setGood(good + 1)
  }

  const handleNeutralVote = () => {
    setNeutral(neutral + 1)
  }

  const handleBadVote = () => {
    setBad(bad + 1)
  }

  const all = good + bad + neutral
  const average = ((good * 1 + neutral * 0 + bad * - 1) / all) || 0
  const positive = (good / all * 100) ? ((good / all * 100) + "%") : "0%"

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button text="good" onClick={handleGoodVote} />
        <Button text="neutral" onClick={handleNeutralVote} />
        <Button text="bad" onClick={handleBadVote} />
      </p>
        <Statistics 
        good={good} 
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        all={all}
        />
    </div>
  )
}

export default App