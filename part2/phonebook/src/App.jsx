import { useState } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [searchFieldInput, setSearchFieldInput] = useState('')

  const [newName, setNewName] = useState('')
  
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleSubmit = (e) => {

  let newId = persons.at(-1).id

  e.preventDefault()

  const nameInPhoneBook = persons.filter((person) => person.name === newName)

  if (nameInPhoneBook.length > 0) {
    return alert(`${newName} is already added to phonebook`)
  }
    setPersons([...persons, { name: newName, number: newPhoneNumber, id: newId + 1}])
}

  const handleTextChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleSearchFieldInput = (e) => {
    setSearchFieldInput(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      searchFieldInput={searchFieldInput}
      handleSearchFieldInput={handleSearchFieldInput}
      />
      <PersonForm
      newName={newName}
      handleTextChange={handleTextChange}
      newPhoneNumber={newPhoneNumber}
      handleNumberChange={handleNumberChange}
      handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <div>debug: {newName} {newPhoneNumber}</div>
      <Persons persons={persons} />
    </div>
  )
}

export default App