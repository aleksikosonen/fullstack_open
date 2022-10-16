/*
Kopioimalla tämän App.js tiedoston sisältöön saa Phonebook tehtävän toimimaan
*/

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons.js'
import Info from './components/Info'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [infoMessage, setInfoMessage] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const showInfoMessage = (message) => {
    setInfoMessage(message)
    setShowInfo(true)
    setTimeout(() => {
      setShowInfo(false)
    }, 2000)
  }

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
            showInfoMessage(`Updated ${personToUpdate.name}`)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            showInfoMessage(
              `Information of ${personToUpdate.name} has already been removed from the server`
            )
          })
      }
    } else {
      personService.create(nameObject).then((createdPerson) => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        showInfoMessage(`Added ${createdPerson.name}`)
      })
    }
  }

  const deleteName = (person) => {
    if (window.confirm('Delete ' + person.name)) {
      personService.remove(person.id).then((response) => {
        setPersons(persons.filter((element) => element.id !== person.id))
        showInfoMessage(`Deleted ${person.name}`)
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
      {showInfo ? <Info infoMessage={infoMessage} /> : null}
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
