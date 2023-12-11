/* eslint-disable react/prop-types */

const Filter = ({searchRef, searchFieldInput, handleSearchFieldInput}) => {
    return (
        <div>
        <p>
          filter shown with<input ref={searchRef} type="text" value={searchFieldInput} onChange={handleSearchFieldInput} autoComplete="true" />
        </p>
      </div>
    )
}

export default Filter