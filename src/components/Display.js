const Display = ({matches, setCountrySearch, countrySearch}) => {

  if (matches.length > 10) {
    return (
      <div>
        {countrySearch === '' ? null : <p>Too many matches, keep typing</p>}
      </div>
    )}

  if (matches.length <= 10 && matches.length > 1) {
    return (
    <div>
      {matches.map(country => <div key={country.fifa}>
        {country.name.common}
        <button onClick={() => setCountrySearch(country.name.common)}>
           Show
        </button></div>)
      }
    </div>
  )}

  if (matches.length === 1) {
    return (
      <div>
        <h6>{matches[0].name.common}</h6>
        <b>Capital:</b> {matches[0].capital}
        <p></p>
        <b>Population:</b> {matches[0].population}
        <h2>Languages:</h2>
        <ul>
          {matches[0].languages ? Object.values(matches[0].languages).map(language => <li key={language}>{language}</li>) : <p>None</p>}
        </ul>
        <h5>Flag:</h5>
        <p><img src={matches[0].flags.png} alt='flag' height='100'/> </p>
      </div>
    )
  }
  
  return (
    <div>
      Nothing found!
        <p>Check your search for typos or clear the search bar</p>
    </div>
  )
}

export default Display