import { useState, useEffect } from 'react'
import axios from 'axios'
import SingleCountry from './components/SingleCountry'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])
  
  const handleChange = (e) => {
    setFilter(e.target.value.toLowerCase())
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter)
      )
    )
  }

  // onkeyup added to enhance the backspace registration on the filteredCountries state
  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleChange} onKeyUp={handleChange}></input>
      </div>
      {filteredCountries.length === 1 ? (
        <SingleCountry country={filteredCountries[0]} />
      ) : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        filteredCountries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))
      )}
    </div>
  )
}

export default App
