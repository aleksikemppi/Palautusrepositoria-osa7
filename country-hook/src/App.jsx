import React, { useState } from 'react';
import useCountry from './useCountry';

const App = () => {
  const [countryName, setCountryName] = useState('');
  const { country, loading, error } = useCountry(countryName);

  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.elements.countryName.value.trim();
    setCountryName(name);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="countryName" placeholder="Enter country name" />
        <button type="submit">Find</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {country && (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Population: {country.population}</p>
          {country.flags && <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />}
        </div>
      )}
    </div>
  );
};

export default App;
