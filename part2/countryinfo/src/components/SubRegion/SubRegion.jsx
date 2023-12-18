/* eslint-disable react/prop-types */

const SubRegion = ({ country }) => {
    return (
        <p>
            <strong>Sub-Region</strong>: <li>{country?.subregion}</li>
        </p>
    )
}

export default SubRegion