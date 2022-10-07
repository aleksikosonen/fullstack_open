import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text}</td>
      <td> {props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const average = () => {
    return (props.good - props.bad) / props.total
  }

  const positive = () => {
    return (props.good / props.total) * 100 + ' %'
  }
  return (
    <div>
      <h1>Statistics</h1>
      {props.good !== 0 || props.bad !== 0 || props.neutral !== 0 ? (
        <table>
          <tbody>
            <StatisticLine text={'good'} value={props.good} />
            <StatisticLine text={'neutral'} value={props.neutral} />
            <StatisticLine text={'bad'} value={props.bad} />
            <StatisticLine text={'all'} value={props.total} />
            <StatisticLine text={'average'} value={average()} />
            <StatisticLine text={'positive'} value={positive()} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={() => handleClickGood()}>good</button>
        <button onClick={() => handleClickNeutral()}>neutral</button>
        <button onClick={() => handleClickBad()}>bad</button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}

export default App
