import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {

  let people = useRef(null)

  const [persons, setPersons] = useState(null) 

  const [searchFieldInput, setSearchFieldInput] = useState('')

  const [newName, setNewName] = useState('')
  
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const [postSuccessful, setPostSuccessful] = useState(false)

  const searchRef = useRef(null)

  useLayoutEffect(() => {
    if (searchFieldInput === '') {
      setPersons(people.current)
    }
  }, [persons, searchFieldInput])

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      people.current = response.data
      setPersons(response.data)
      console.log("people.current value", people.current)
      })
  }, [])

  useEffect(() => {
    if (postSuccessful) {
      axios.get('http://localhost:3001/persons').then(response => {
        people.current = response.data
        setPersons(response.data)
        console.log("people.current value", people.current)
        })
    }
    return () => setPostSuccessful(false)
  }, [postSuccessful])

  const handleSubmit = (e) => {

  e.preventDefault()

  let nameInPhoneBook =  persons?.filter((person) => person.name === newName)

  if (nameInPhoneBook.length > 0) {
    return alert(`${newName} is already added to phonebook`)
  }
  const noteObject = { name: newName, number: newPhoneNumber}
  axios
    .post('http://localhost:3001/persons', noteObject)
    .then(response => {
      console.log(response)
      setPostSuccessful(true)
    })

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

    const filterList = people?.current.filter(({ name }) => name.toLowerCase().includes(searchFieldInput.toLowerCase()))

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
        people.current?.map(({name, number, id}) => (
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
      {persons?.length > 0 ? (persons?.map(({name, number, id}) => (
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