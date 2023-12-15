import { useState, useEffect, useLayoutEffect } from "react"
import SearchCountry from "./components/SearchCountry/SearchCountry"
import Results from "./components/Results/Results"
import axios from 'axios'
import './App.css'

const App = () => {

  const [searchValue, setSearchValue] = useState('')

  const [countryData, setCountryData] = useState(null)

  const [loading, setLoading] = useState(false)
  
  const handleSearchText = (e) => {
    setSearchValue(e.target.value)
    setLoading(true)
  }

  useLayoutEffect(() => {
    if (searchValue.length < 1) {
      setCountryData(null)
      setLoading(false)
    }
  }, [countryData, searchValue.length])

  
  useEffect(() => {
    if (loading) {
      axios.get('../db.json').then((response) => {
        console.log(response.data)
        response.data.filter(({name}) => {
          if (name.common.toLowerCase() == searchValue.trim() || name.common.includes(searchValue.trim())) {
            console.log(name.common)
            setLoading(false)
            // setCountryData()
          } else {
            console.log("too long")
            setLoading(false)
          }
        })
      }).catch((error) => {
          console.log("error", error)
          setLoading(false)
      })
    }
  }, [searchValue, setLoading])

  return (
    <div>
      <SearchCountry
      searchValue={searchValue}
      handleSearchText={handleSearchText}
      />
      <Results 
      searchedCountries={countryData}
      loading={loading}
      />
    </div>
  )
}

export default App