import React, { useState } from 'react';
const api = {
  key: "89df6154d704e9e870d893d1c8065152",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 10) ? 'app warm' : 'app cold') : 'app cold'}>
      <main>
        <div className="search-box">
          <label className="cityLabel" for="cityLabel">Location : </label>
          <input 
            id="cityInput"
            type="text"
            className="cityInput"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="description">{weather.weather[0].description}</div>
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="">{weather.lat}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              <div>{"Temp: "}
                {Math.round(weather.main.temp)}°c
              </div>
              <div>{"Temp min: "}
                {Math.round(weather.main.temp_min)}°c
              </div>
              <div>{"Temp max: "}
                {Math.round(weather.main.temp_max)}°c
              </div>
              <div>{"Pressure: "}
                {Math.round(weather.main.pressure)} hPa
              </div>
              <div>{"Humidity: "}
                {Math.round(weather.main.humidity)} %
              </div>
              <div>{"Wind Speed: "}
                {Math.round(weather.wind.speed)} m/s
              </div>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
