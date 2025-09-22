import React, { useState, useEffect } from 'react';

function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is available in the browser
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const success = (position) => {
      // If location is successfully fetched, update the state
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setError(null); // Clear any previous errors
    };

    const error = (err) => {
      // If there's an error, update the error state
      setError(err.message);
    };

    // Call the Geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(success, error);
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading location...</div>;
  }

  return (
      <div>
      {coords ? (
        <p>GPS: {coords.latitude.toFixed(4)}° N, {coords.longitude.toFixed(4)}° E</p>
      ) : (
        <p>{error || 'Loading location...'}</p>
      )}
    </div>
  );
}

export default LocationComponent;