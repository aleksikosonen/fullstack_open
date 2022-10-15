const SingleCountry = ({ country }) => {
  const languages = Object.values(country.languages)
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
    </div>
  )
}

export default SingleCountry
