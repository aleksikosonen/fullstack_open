const Country = ({country}) => {
    return <div key={country.name.common}>{country.name.common}</div>
}

export default Country