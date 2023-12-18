/* eslint-disable react/prop-types */
import Borders from '../util/Borders'
import ContinentCapital from '../util/ContinentCapital.jsx'
import ContinentInfo from '../util/ContinentInfo'
import { useState } from 'react'
import Area from '../Area/Area'
import Flag from '../Flag/Flag'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import StartOfTheWeek from '../StartOfTheWeek/StartOfTheWeek'
import CoatOfArms from '../CoatOfArms/CoatOfArms'
import Population from '../Population/Population'
import Language from '../Language/Language'
import CurrencyName from '../CurrencyName/CurrencyName'
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol'
import SubRegion from '../SubRegion/SubRegion'
import CountryCommonName from '../CountryCommonName/CountryCommonName'
import CountryNativeName from '../CountryCommonName/CountryNativeName'

const SingleCountry = ({info, country}) => {

    const [isActive, setIsActive] = useState(false)

    const showCountry = () => {
        setIsActive(!isActive)
    }

    let languages = Object.keys(country.languages)

    let languageKey = languages[0]

    let languageInterpolatedValue = country.languages[languageKey]

    let currencies = Object.keys(country.currencies)

    let currency = currencies[0]

    let individualCurrency = country.currencies[currency]

    let countryNativeKey = country.name.nativeName
    
    let nativeName = Object.keys(countryNativeKey)

    let nativeNameIndex = nativeName[0]

    let dayOfTheWeek = country.startOfWeek[0].toUpperCase() + country.startOfWeek.slice(1,)

    if (!isActive) {
        return<li>{info?.name.common} <button type="button" onClick={showCountry}>Show</button></li>
    }

    if (isActive) {
        return (
            <div>
                <h2>{country.name?.common}</h2>
                <p>
                    <strong>Capital(s)</strong>:
                </p>
                <ContinentCapital
                country={country}
                />
                <Area
                country={country}
                />
                <Flag
                country={country}
                />
                <WeatherInfo
                info={info}
                isActive={isActive}
                />
                <StartOfTheWeek
                dayOfTheWeek={dayOfTheWeek}
                />
                <CoatOfArms
                country={country}
                />
                <Population
                country={country}
                />
                <Language
                languageInterpolatedValue={languageInterpolatedValue}
                />
                  <ContinentInfo
                  country={country}
                  />
                <CurrencyName
                individualCurrency={individualCurrency}
                />
                <CurrencySymbol
                individualCurrency={individualCurrency}
                />
                <p>
                    <strong>Borders</strong>: 
                </p>
                <Borders 
                country={country} 
                />
                <CountryCommonName
                countryNativeKey={countryNativeKey}               
                nativeNameIndex={nativeNameIndex}
                />
                <CountryNativeName
                countryNativeKey={countryNativeKey}               
                nativeNameIndex={nativeNameIndex}
                />
                <SubRegion
                country={country}
                />
            </div>
        )
    }
}

export default SingleCountry