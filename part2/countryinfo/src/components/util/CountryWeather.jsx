/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import axios from 'axios'

const CountryWeather = ({ info, isActive }) => {

    const [weatherData, setWeatherData] = useState(null)

    const countryCapitalData = info.capital[0]

    console.log("countryCapitalData", countryCapitalData, "isActive", isActive)

        useEffect(() => {

            if (!weatherData) {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryCapitalData}&appid=${import.meta.env.VITE_API_KEY}`).then((response) => {
                    console.log(response.data)
                    setWeatherData(response.data)
                    console.log("weatherData", weatherData)
    
                }).catch((error) => {
                    console.error(error)
                })
            }
        })

    return (
    <>
    {weatherData ? <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather info' /> : ''}
    <br />
    {weatherData ? <strong>Description: {weatherData?.weather[0].description}</strong> : ''}
    <br />
    {weatherData ? <strong>Temperature: {weatherData?.wind.deg} deg</strong> : ''}
    <br />
    </>
    )
}

export default CountryWeather