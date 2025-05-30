import React from "react";

import { WeatherProvider } from "./context/weatherContext";
import WeatherDashboard from "./components/weatherInfo";

import "./App.css";

function App() {
  return (
    <WeatherProvider>
      <div className="app-container">
        <WeatherDashboard />
      </div>
    </WeatherProvider>
  );
}

export default App;
