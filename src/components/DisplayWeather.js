import axios from 'axios'
import React, { useState, useEffect } from 'react'

require('dotenv').config()
const api_key = process.env.REACT_APP_API_KEY

const DisplayWeather = ({matches}) => {
  const [weather, setWeather] = useState({})

  //Parse the country information to use it in the weather API link below.
  const match = Object.values(matches[0])
  const city = match[11]
  const countryTag = match[4]

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryTag}&APPID=${api_key}&units=metric`)
      .then(res => {
        setWeather(res)
      })
  }, [city, countryTag])
  
  if (Object.keys(weather).length !== 0) {
    const weatherData = Object.values(weather.data)
    const currentTemperature = Number(Math.round(weatherData[3].temp))
    const parseIconData = Object.values(weatherData[1])
    const icon = parseIconData[0].icon
    return (
      <div>
        <h4>Current weather in {city}:</h4>
        <div>
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather' height='100'/>
        </div>
        <b>{currentTemperature} Celsius</b>
      </div>
    )
  }
  return (
  <div>
    Weather information not available for this location.
  </div>)
}

export default DisplayWeather