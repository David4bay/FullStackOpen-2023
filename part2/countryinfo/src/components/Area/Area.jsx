/* eslint-disable react/prop-types */


const Area = ({ country }) => {
    return (
        <p>
            <strong>Area</strong>: <li>{country?.area.toLocaleString('en-US')}</li>
        </p>
    )
}

export default Area