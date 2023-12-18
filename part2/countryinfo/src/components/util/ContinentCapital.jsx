/* eslint-disable react/prop-types */


const ContinentCapital = ({country}) => {
    return (
    <ul>
    {country?.capital.map((capital) => (
        <li key={capital.toString()}>{capital}</li>
        ))}
    </ul>
    )
}

export default ContinentCapital