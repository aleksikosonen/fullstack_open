const Persons = ({persons, filter}) => {
    return (
        persons.map((person) => {
            if (person.name.toLowerCase().includes(filter.toLowerCase())) {
              return (
                <div key={person.name}>
                  {person.name} {person.number}
                </div>
              )
            }
            return false
          })
    )
}

export default Persons