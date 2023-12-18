/* eslint-disable react/prop-types */


const Population = ({ country }) => {
    return (
    <p>
        <strong>Population</strong>: <li>{country.population.toLocaleString('en-US')}</li>
    </p>
    )
}

export default Population