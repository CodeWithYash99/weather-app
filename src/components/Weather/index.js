import React, { useEffect, useState } from "react";
import { Loading } from "react-loading-dot";
import Search from "../Search";

import "./index.css";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=48cd5f2bbf9ce670e4df4cfa400930dc`
      );
      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchWeatherData("Hyderabad");
  }, []);
  
  function handleSearch() {
    if (search !== "") {
      fetchWeatherData(search);
    }
  }
  
  const onChangeCity = (event) => {
    setSearch(event.target.value);
  };

  function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  console.log(weatherData, "OK");
  
  return (
    <div className="weather-container">
      <Search
        search={search}
        setSearch={onChangeCity}
        handleSearch={handleSearch}
      />

      <div className="weather-report-container">
        {loading ? (
          <Loading 
            className='loading'
            height="80"
            width="80"
            radius="9"
            color="skyblue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        ) : (
          <div className="weather-report-details">
            <div className="city-name">
              <h2>
                {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
              </h2>
            </div>

            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>

            <div className="temperature">
              <h1>{weatherData?.main.temp}</h1>
              <p>{weatherData?.weather[0].description}</p>
            </div>

            <div className="wind-humidity">
              <div className="wind">
                <h3>{weatherData?.wind.speed}</h3>
                <p>Wind Speed</p>
              </div>
              <div className="humidity">
                <h3>{weatherData?.main.humidity}%</h3>
                <p>Humidity</p>
              </div>
            </div>

            <div className="visibility">
              <h2>{weatherData?.visibility}</h2>
              <p>Visibility</p>
            </div>

            <div className="sunrise-sunset">
              <div className="sunrise">
                <h3>{weatherData?.sys.sunrise}</h3>
                <p>Sunrises</p>
              </div>
              <div className="sunset">
                <h3>{weatherData?.sys.sunset}</h3>
                <p>Sunsets</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
