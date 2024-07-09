import { useState, useEffect } from 'react';
import countries from './countries.json'; 

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return;

    const fetchCountry = () => {
      setLoading(true);
      setError(null);
      try {
        const countryData = countries.find(
          (country) => country.name.common.toLowerCase() === countryName.toLowerCase()
        );
        if (countryData) {
          setCountry(countryData);
        } else {
          setError('Country not found');
          setCountry(null);
        }
      } catch (err) {
        setError('Error fetching country data');
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  return { country, loading, error };
};

export default useCountry;
