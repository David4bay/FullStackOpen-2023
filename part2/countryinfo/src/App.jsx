import { useState, useEffect, useLayoutEffect } from "react"
import SearchCountry from "./components/SearchCountry/SearchCountry"
import Results from "./components/Results/Results"
import axios from 'axios'
import './App.css'

// https://studies.cs.helsinki.fi/restcountries/api/all

/* 
 Preceding axios api calls cancelled to prevent race conditions
*/

const App = () => {

  const [searchValue, setSearchValue] = useState('')

  const [countryData, setCountryData] = useState([])

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
    const source = axios.CancelToken.source()

    if (loading) {
    
      axios.get('db.json', { cancelToken: source.token }).then((response) => {

      console.log("response.data", response.data)

      return response.data.filter((info) => {
      
        let nameOfCountry = info.name.common

        if (nameOfCountry.toLowerCase().includes(searchValue.toLowerCase())) {
          return info
        }

      })  
      }).then((data) => {

        setLoading(false)
        console.log("data", data)
        setCountryData(data)

      }).catch((error) => {

          console.log("error", error)
          setLoading(false)   
          
      })
    }
    return () => source.cancel()
  }, [countryData, loading, searchValue, setLoading])

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