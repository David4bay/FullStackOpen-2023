/* eslint-disable react/prop-types */

const ContinentInfo = ({ country }) => {
    return (<p>
            <strong>Continent</strong>: {
            country?.continents.map((continent) => (
            <li key={continent.toString()}>{continent}</li>
        )
            )}
            </p>
    )
    
}

export default ContinentInfo