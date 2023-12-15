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

    let countryContainer = []

    if (loading) {

      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {

        console.log(response.data)

        response.data.filter(({name}) => {

          const {common} = name

          if (common.toLowerCase().includes(searchValue.toLowerCase())) {

            console.log(common)
            setLoading(false)
            countryContainer.push(common)
            setCountryData(countryContainer)

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
  }, [loading, searchValue, setLoading])

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