import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const personList = persons.map((person) => person.name)

    if (personList.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.filter(
          (person) => person.name === newName
        )[0]
        personService
          .update(personToUpdate.id, nameObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : updatedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService.create(nameObject).then((createdPerson) => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteName = (person) => {
    if (window.confirm('Delete ' + person.name)) {
      personService.remove(person.id).then((response) => {
        setPersons(persons.filter((element) => element.id !== person.id))
      })
    }
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h2>add new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deleteName={deleteName}
      ></Persons>
    </div>
  )
}

export default App
