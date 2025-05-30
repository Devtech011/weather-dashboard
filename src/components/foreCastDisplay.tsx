import React from "react";
import { motion } from "framer-motion";
import "./WeatherDisplay.css";

interface Condition {
  text: string;
  icon: string;
}

interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  condition: Condition;
}

interface ForecastDay {
  date: string;
  day: Day;
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface Props {
  forecast: Forecast;
}

const ForecastDisplay: React.FC<Props> = ({ forecast }) => {
  const days = forecast.forecastday.slice(1, 6); 

  return (
    <div className="forecast-container">
      <h3>5 - Day Forecast</h3>
      <div className="forecast-grid">
        {days.map((day, index) => (
          <motion.div
            className="forecast-card"
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <p className="forecast-date">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="forecast-icon"
            />
            <p className="forecast-condition">{day.day.condition.text}</p>
            <p className="forecast-temp">
              <span className="min-temp">
                {Math.round(day.day.mintemp_c)}°C
              </span>{" "}
              /{" "}
              <span className="max-temp">
                {Math.round(day.day.maxtemp_c)}°C
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
