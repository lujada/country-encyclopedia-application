import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './index.css'
import Display from './components/Display'
import DisplayWeather from './components/DisplayWeather'
require('dotenv').config()

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleResults = (event) => {
    setCountrySearch(event.target.value)
  }

  const matches =
  countries.filter(country =>
    country.name.common.includes(countrySearch.charAt(0).toUpperCase() + countrySearch.slice(1))
  )
  if (!matches) {
    return (<div> <p>Loading...</p> </div>)}

  return (
    <div>
      <h1>Country Encyclopedia</h1>
      <p>Search for a country to find information about it</p>
      <b>
        Search: <input
        value={countrySearch}
        onChange={handleResults} />
      </b>
      <div>
        <button onClick={() => setCountrySearch('')}>
        Reset/Clear Search Bar
        </button>
      </div>
      <p></p>
      <Display matches={matches} setCountrySearch={setCountrySearch} countrySearch={countrySearch}/>
      {matches.length === 1 ?  <DisplayWeather matches={matches}/> : null}
    </div>
  )
}

export default App