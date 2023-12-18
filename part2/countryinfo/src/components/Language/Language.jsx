/* eslint-disable react/prop-types */


const Language = ({ languageInterpolatedValue }) => {
    return (
        <p>
            <strong>Language(s)</strong>: <li>{languageInterpolatedValue}</li>
        </p>
    )
}

export default Language