const Persons = ({ persons, filter, deleteName }) => {
  return persons.map((person) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <div key={person.name}>
          {person.name} {person.number}{' '}
          <button
            onClick={() => {
             deleteName(person)
            }}
          >delete</button>
        </div>
      )
    }
    return false
  })
}

export default Persons
