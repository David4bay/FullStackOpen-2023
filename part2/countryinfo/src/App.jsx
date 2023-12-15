import Results from "./components/Results/Results"
import SearchCountry from "./components/SearchCountry/SearchCountry"
import { useState } from "react"

const App = () => {

  const [searchValue, setSearchValue] = useState('')

  const handleSearchText = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <SearchCountry
      searchValue={searchValue}
      handleSearchText={handleSearchText}
      />
      <Results />
    </div>
  )
}

export default App