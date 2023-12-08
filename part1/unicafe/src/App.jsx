import { useState } from 'react'

const Statistics = (props) => {

  return(
    <table>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={...} />
      <StatisticLine text="bad" value ={...} />
      // ...
    </table>
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

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <br />
      <Statistics 
      good={good} 
      neutral={neutral}
      bad={bad}
      />
    </div>
  )
}

export default App