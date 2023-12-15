/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

const Results = ({searchedCountries, loading}) => {

    if (loading) {
        return <p>Loading...</p>
    }

    if (searchedCountries?.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    // if (searchedCountries?.length === 1) {
    //     return (
    //         <div>
    //             {searchedCountries?.map(())}
    //         </div>
    //     )
    // }

    return (
    <ul>
    {searchedCountries?.map((name) => (
        <>
        <li key={name.toString()}>{name} <button>Show</button></li>
        </>
    ))}
    </ul>
    )
}

// Results.propTypes = {
//     searchedCountries: PropTypes.array,
//     loading: PropTypes.bool
// }

export default Results