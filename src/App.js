import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  document.title = 'Weather App'

  // Fetched weather data
  const [weatherInfo, setWeatherInfo] = useState({});

  // User input of city name
  const [inputCity, setInputCity] = useState('');

  // API configuration. Utilises OpenWeatherMap
  // My key activation takes a few hours so I found one online that works (253682c0bd759acfb4255d4aa08c3dd7).
  // If problems are encountered later, use my key that is yet to be activated (b90bf6e2e9ba86d6ec6b9ccc89684943)
  const WEATHER_API_KEY = '253682c0bd759acfb4255d4aa08c3dd7';
  const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

  // Didn't have time to implement weather icons
  const weatherIcons = {
    Clear: "sunny.png",
    Clouds: "cloudy.png",
    Rain: "rainy.png"
  }

  // Function to handle fetching weather data from API
  const handleFetchWeather = async (event) => {
    if (event.key === 'Enter') {
      const url = `${WEATHER_ENDPOINT}?q=${inputCity}&units=metric&appid=${WEATHER_API_KEY}`;
      try {
        const response = await axios.get(url);
        setWeatherInfo(response.data);
        console.log(response.data);
        console.log(response.data.weather[0].main)
      } catch (err) { // If invalid city name. Simply console log.
        console.error('Error fetching weather data:', err);
      }
      setInputCity('');
    }
  };


  return (
    <div className="weather-app">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyUp={handleFetchWeather}
        />
      </div>
      <div className="weather-container">
        <div className="header-section">
          <div className="city-name">
            <h2>{weatherInfo?.name}</h2>
          </div>
          <div className="temperature">
            {weatherInfo?.main && (
              <>
                <h1>{weatherInfo.main.temp.toFixed(1)}°C</h1>
                {/* Didn't have time to properly implement weather icons
                <img
                  src={`./assets/${weatherIcons[weatherInfo.weather[0].main]}`}
                  alt={weatherInfo.description}
                />*/}
              </>
            )}
          </div>
          <div className="weather-summary">
            {weatherInfo?.weather && (
              <p>{weatherInfo.weather[0].description}</p>
            )}
          </div>
        </div>
        {weatherInfo.name && (
          <div className="details-section">
            <div className="detail-item">
              <p>Feels Like</p>
              {weatherInfo?.main && (
                <p className="highlighted">
                  {weatherInfo.main.feels_like.toFixed(1)}°C
                </p>
              )}
            </div>
            <div className="detail-item">
              <p>Humidity</p>
              {weatherInfo?.main && (
                <p className="highlighted">{weatherInfo.main.humidity}%</p>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Weather app by Cosmin Tutoveanu</p>
        <p>For Fast Cover</p>
      </footer>
    </div>
  );
}

export default WeatherApp;