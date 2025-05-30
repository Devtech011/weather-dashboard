import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchWeatherData } from "../Utils/api";
import type { ForecastData } from "../Types/weather";

type TempUnit = "C" | "F";

interface WeatherContextType {
  weather: ForecastData | null;
  lastValidWeather: ForecastData | null;
  city: string;
  error: string;
  isLoading: boolean;
  setCity: (city: string) => void;
  cleanError: () => void;
  refreshWeather: () => Promise<void>;
  unit: TempUnit;
  setUnit: (unit: TempUnit) => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<ForecastData | null>(null);
  const [lastValidWeather, setLastValidWeather] = useState<ForecastData | null>(
    null
  );

  const [city, setCity] = useState<string>(
    () => localStorage.getItem("lastCity") || "Indore"
  );
  const [lastValidCity, setLastValidCity] = useState<string>(
    () => localStorage.getItem("lastCity") || "Indore"
  );

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unit, setUnit] = useState<TempUnit>(() => {
    return (localStorage.getItem("tempUnit") as TempUnit) || "C";
  });

  const refreshWeather = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchWeatherData(lastValidCity);
      setWeather(data);
      setLastValidWeather(data);
      setLastValidCity(data.location.name);
      localStorage.setItem("lastCity", data.location.name);
    } catch (err) {
      setWeather(null);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [lastValidCity]);

  const cleanError = useCallback(() => {
    setError("");
  }, []);

  const updateCity = (newCity: string) => {
    setCity(newCity);
    setLastValidCity(newCity); 
    refreshWeather(); 
  };

  React.useEffect(() => {
    refreshWeather();
    const interval = setInterval(refreshWeather, 30000);
    return () => clearInterval(interval);
  }, [refreshWeather]);

  React.useEffect(() => {
    localStorage.setItem("tempUnit", unit);
  }, [unit]);

  const value = React.useMemo(
    () => ({
      weather,
      lastValidWeather,
      city,
      error,
      isLoading,
      setCity: updateCity,
      refreshWeather,
      cleanError,
      unit,
      setUnit,
    }),
    [
      weather,
      lastValidWeather,
      city,
      error,
      isLoading,
      refreshWeather,
      cleanError,
      unit,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
};
