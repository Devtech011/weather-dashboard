import React from "react";
import { useWeather } from "../context/weatherContext";
import ForecastDisplay from "./foreCastDisplay";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import "./WeatherDisplay.css";
import SearchInput from "./searchBar";
import ErrorDisplay from "./errorDisplay";

const getWeatherClass = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return "rainy";
  if (lowerCondition.includes("cloud")) return "cloudy";
  if (lowerCondition.includes("sun") || lowerCondition.includes("clear"))
    return "sunny";
  if (lowerCondition.includes("snow")) return "snowy";
  return "default";
};

const convertTemp = (tempC: number, unit: "C" | "F"): number =>
  unit === "C" ? tempC : (tempC * 9) / 5 + 32;

const WeatherInfo: React.FC = () => {
  const {
    weather,
    lastValidWeather,
    isLoading,
    error,
    cleanError,
    unit,
    setUnit,
  } = useWeather();

  const weatherToShow = weather || lastValidWeather;

  if (isLoading && !weatherToShow)
    return <div className="loading">Loading...</div>;
  if (!weatherToShow) return null;

  const { location, current } = weatherToShow;
  const weatherClass = getWeatherClass(current.condition.text);

  return (
    <>
      <div className="header-bar">
        <SearchInput />
        <div className="unit-selector">
          <label>Unit: </label>
          <div className="selectBox">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "C" | "F")}
            >
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`weather-card ${weatherClass}`}>
        <div className="weather-widget">
          <div className="main-info">
            <div className="left">
              <h2>
                {location.name}, {location.region}, {location.country}
              </h2>
              <p>{current.condition.text}</p>
              <p className="localtime">Updated: {location.localtime}</p>
            </div>

            <div className="WeatheBox">
              <h1>
                {Math.round(convertTemp(current.temp_c, unit))}°{unit}
              </h1>
              <div className="center">
                <img
                  src={`https:${current.condition.icon}`}
                  alt="Weather icon"
                  className="main-icon"
                />
              </div>
              <div className="right">
                <p>
                  Feels like{" "}
                  {Math.round(convertTemp(current.feelslike_c, unit))}°{unit}
                </p>
                <div className="metric">
                  <WiHumidity className="icon" />
                  <span>{current.humidity}% </span>
                  <small>Humidity</small>
                </div>
                <div className="metric">
                  <WiStrongWind className="icon" />
                  <span>{current.wind_kph} km/h </span>
                  <small>Wind</small>
                </div>
              </div>
            </div>
          </div>
          {weatherToShow.forecast && (
            <ForecastDisplay forecast={weatherToShow.forecast} />
          )}
        </div>
      </div>

      {error && (
        <div className="error-modal-overlay">
          <ErrorDisplay message={error} onClose={cleanError} />
        </div>
      )}
    </>
  );
};

export default WeatherInfo;
