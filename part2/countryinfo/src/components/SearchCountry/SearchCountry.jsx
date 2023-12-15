import PropTypes from 'prop-types'
import React from 'react'

const SearchCountry = ({handleSearchText, searchValue}) => {
    return (
        <React.Fragment>
            <span>find countries</span> <input type="text" onChange={handleSearchText} value={searchValue} autoComplete="true" />
        </React.Fragment>
    )
}

SearchCountry.propTypes = {
    handleSearchText: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
}

export default SearchCountry