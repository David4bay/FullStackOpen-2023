import { useState, useRef, useLayoutEffect, useMemo } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {

  const people = useMemo(() => ([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  ), [])

  const [persons, setPersons] = useState(people) 

  const [searchFieldInput, setSearchFieldInput] = useState('')

  const [newName, setNewName] = useState('')
  
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const searchRef = useRef(null)

  useLayoutEffect(() => {
    if (searchFieldInput === '') {
      setPersons(people)
    }
  }, [people, persons, searchFieldInput])

  const handleSubmit = (e) => {

  let newId = persons[persons.length - 1].id

  e.preventDefault()

  const nameInPhoneBook = persons.filter((person) => person.name === newName)

  if (nameInPhoneBook.length > 0) {
    return alert(`${newName} is already added to phonebook`)
  }
    setPersons([...persons, { name: newName, number: newPhoneNumber, id: newId + 1}])
    setNewName('')
    setNewPhoneNumber('')
}

  const handleTextChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleSearchFieldInput = () => {

    let value = searchRef.current.value.toString()

    setSearchFieldInput(value)

    const filterList = people.filter(({ name }) => name.toLowerCase().includes(searchFieldInput.toLowerCase()))

    setPersons(filterList)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      searchRef={searchRef}
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
      <ul>
        {
        people.map(({name, number, id}) => (
        <Persons
        key={id}
        name={name}
        number={number}
        id={id}
        />
        ))
        }
      </ul>
      {
         searchFieldInput.length > 0 ? (
      <>
      <h2>Found Numbers</h2>
      <ul>      
      {persons.length > 0 ? (persons.map(({name, number, id}) => (
      <Persons 
      key={id}
      name={name}
      number={number}
      id={id}
      />
      ))) : (
        <h3>No results found.</h3>
      )}
      </ul>
      </>
        ) : ''
      }
    </div>
  )
}

export default App