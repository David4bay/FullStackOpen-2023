/* eslint-disable react/prop-types */


const Flag = ({ country }) => {
    return (
        <p>
            <strong>Flag</strong>: <li><img src={country.flags?.png} alt={country.flags?.alt} /></li>
        </p>
    )
}

export default Flag