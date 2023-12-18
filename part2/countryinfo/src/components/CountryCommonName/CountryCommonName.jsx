/* eslint-disable react/prop-types */


const CountryCommonName = ({ countryNativeKey, nativeNameIndex }) => {
    return (
        <p>
            <strong>Country Native Name(common)</strong>: <li>{countryNativeKey[nativeNameIndex]?.common}</li>
        </p>
    )
}

export default CountryCommonName