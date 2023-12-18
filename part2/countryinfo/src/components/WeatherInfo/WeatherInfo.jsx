/* eslint-disable react/prop-types */
import CountryWeather from "../util/CountryWeather"


const WeatherInfo = ({ info, isActive }) => {
    return (
        <p>
        <strong>Weather Info</strong>: 
        <CountryWeather
        info={info}
        isActive={isActive} 
        />
    </p>
    )
}

export default WeatherInfo