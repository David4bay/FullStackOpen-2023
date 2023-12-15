import React from 'react'

const SearchCountry = ({handleSearchText, searchValue}) => {
    return (
        <React.Fragment>
            <span>find countries</span> <input type="text" onChange={handleSearchText} value={searchValue} autoComplete="true" />
        </React.Fragment>
    )
}

export default SearchCountry