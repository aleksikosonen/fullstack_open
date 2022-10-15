import { useState } from 'react'
import SingleCountry from './SingleCountry'

const Country = ({ country }) => {
  const [infoShown, setInfoShown] = useState(false)
  return (
    <div>
      {infoShown ? (
        <SingleCountry country={country} />
      ) : (
        <div key={country.name.common}>
          {country.name.common}{' '}
          <button
            onClick={() => {
              setInfoShown(!infoShown)
            }}
          >
            show
          </button>
        </div>
      )}
    </div>
  )
}

export default Country
