import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const SingleCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState('')
  const languages = Object.values(country.languages)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={country.flags.png} alt={country.name.common}></img>
      <Weather weather={weatherData} />
    </div>
  )
}

export default SingleCountry
