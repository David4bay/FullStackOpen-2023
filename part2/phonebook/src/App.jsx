import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import services from './services/fetchNumbers'
import Notification from './components/Notification'

const App = () => {

  let people = useRef(null)

  const [persons, setPersons] = useState(null) 

  const [searchFieldInput, setSearchFieldInput] = useState('')

  const [newName, setNewName] = useState('')
  
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const [postSuccessful, setPostSuccessful] = useState(false)

  const [message, setMessage] = useState(null)

  const [success, setSuccess] = useState(true)

  const searchRef = useRef(null)

  const fetchedList = useRef(null)

  useLayoutEffect(() => {
    if (searchFieldInput === '') {
      setPersons(people.current)
    }
  }, [persons, searchFieldInput])

  useEffect(() => {
    services.getAll().then(response => {
      people.current = response
      setPersons(response)
      console.log("people.current value on load", people.current)
      }).catch((e) => {
        console.log('error', e)
      })
  }, [])

  useEffect(() => {
    if (postSuccessful) {
      services.getAll().then(response => {
        people.current = response
        setPersons("fetched on success", response)
        console.log("people.current value", people.current)
        })
    }
    return () => setPostSuccessful(false)
  }, [postSuccessful])

  useEffect(() => {
    let timeout
    if (message) {
      timeout = setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    return () => clearTimeout(timeout)
  }, [message])

  const handleSubmit = async (e) => {

  e.preventDefault()

  let nameInPhoneBook =  persons?.filter((person) => person.name === newName)

  const noteObject = { name: newName, number: newPhoneNumber}

  let confirmReplace

  if (nameInPhoneBook.length > 0) {
      confirmReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    }
    if (confirmReplace) {
          await services.replace(noteObject, nameInPhoneBook[0].id).then((response) => {
          console.log("replaced", response)
          setMessage(`Updated ${newName || response.name}`)
          setSuccess(true)
          setNewName('')
          setNewPhoneNumber('')
        }).catch((error) => {
          setMessage(`Information of ${nameInPhoneBook[0].name} has already been removed from server`)
          setSuccess(false)
          setPostSuccessful(true)
          console.error(error)
        })
    } 


  if (!nameInPhoneBook[0]) {
    await services.create(noteObject).then(response => {
        console.log("created", response)
        setMessage(`Added ${response.name}`)
        setPostSuccessful(true)
        setSuccess(true)
        setNewName('')
        setNewPhoneNumber('')
      }).catch((error) => {
        setMessage(`Unable to create ${noteObject.name} as new contact`)
        setSuccess(false)
        setPostSuccessful(true)
        console.error(error)
      })
  }
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

  const handleDeletedNumber = (name, id) => {
    
    let deletePrompt = window.confirm(`Delete ${name}?`)
      if (deletePrompt) {
        
        services.deleteNumber(id).then(response => {
          
          console.log("deleted", response)
          setPostSuccessful(true)
          setMessage(`${name} deleted.`)
          
        }).catch((error) => {
          
        setMessage(`${name} has already been deleted from phonebook.`)
        
        console.error(error)
      })

    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
      message={message} 
      success={success}
      />
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
        fetchedList={fetchedList.current = true}
        handleDeletedNumber={handleDeletedNumber}
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
      fetchedList={fetchedList.current = false}
      handleDeletedNumber={handleDeletedNumber}
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