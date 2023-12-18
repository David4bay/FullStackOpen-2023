/* eslint-disable react/prop-types */


const CoatOfArms = ({ country }) => {
    return (
        <p>
            <strong>Coat of Arms</strong>: {country.coatOfArms?.png ? <li><img src={country.coatOfArms?.png} alt="coat of arms" width="250" /></li> : ''}
        </p>
    )
}

export default CoatOfArms