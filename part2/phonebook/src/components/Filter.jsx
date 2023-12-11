/* eslint-disable react/prop-types */

const Filter = ({searchFieldInput, handleSearchFieldInput}) => {
    return (
        <div>
        <p>
          filter shown with<input type="search" value={searchFieldInput} onChange={handleSearchFieldInput} autoComplete="true" />
        </p>
      </div>
    )
}

export default Filter