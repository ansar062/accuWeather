// Import necessary modules
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Weather = () => {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
  
    const API_KEY = '1b06fa8d6468063d2fbbfcdca37c01e3';
  
    // Function to fetch weather data based on user input
    const fetchWeatherData = async (inputLocation) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            setWeatherData(response.data);
          } catch (error) {
            console.error(error);
          }
        });
      } else {
        console.log('Geolocation is not supported by your browser.');
      }
    }, []); // Empty dependency array ensures this effect runs once on component mount
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search weather for a specific location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              fetchWeatherData(location);
            }
          }}
        />
        <div>
          <h2>Current Weather</h2>
          <p>Location: {weatherData.name}, {weatherData.sys?.country}</p>
          <p>Temperature: {weatherData.main?.temp} K</p>
          <p>Weather Condition: {weatherData.weather?.[0]?.description}</p>
          {/* Add more weather information here */}
        </div>
      </div>
    );
  };
  
  export default Weather;
  