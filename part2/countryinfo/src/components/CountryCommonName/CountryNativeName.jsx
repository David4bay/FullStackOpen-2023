/* eslint-disable react/prop-types */


const CountryNativeName = ({ countryNativeKey, nativeNameIndex}) => {
    return (
        <p>
            <strong>Country Native Name(official)</strong>: <li>{countryNativeKey[nativeNameIndex]?.official}</li>
        </p>
    )
}

export default CountryNativeName