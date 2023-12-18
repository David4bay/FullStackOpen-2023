/* eslint-disable react/prop-types */
import CountryWeather from "../util/CountryWeather"


const WeatherInfo = ({ info, isActive }) => {
    return (
        <p>
        <CountryWeather
        info={info}
        isActive={isActive} 
        />
        </p>
    )
}

export default WeatherInfo