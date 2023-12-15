/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

const Results = ({searchedCountries, loading}) => {

    if (loading) {
        return <p>Loading...</p>
    }

    return (
    <ul>
    {searchedCountries?.map((name) => (
        <li key={name.toString()}>{name}</li>
    ))}
    </ul>
    )
}

// Results.propTypes = {
//     searchedCountries: PropTypes.array,
//     loading: PropTypes.bool
// }

export default Results