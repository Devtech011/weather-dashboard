import axios from "axios";
import type { ForecastData } from "../Types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL as string;

export const fetchWeatherData = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get<ForecastData>(BASE_URL, {
      params: {
        key: API_KEY,
        q: city,
        days: 6,
        aqi: "no",
        alerts: "no",
      },
    });

    return response.data;

  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          throw new Error("Invalid request. Please enter a valid city name.");
        case 401:
          throw new Error("Unauthorized. Check your API key.");
        case 403:
          throw new Error("Access denied. You might have exceeded the quota.");
        case 404:
          throw new Error("City not found. Please try another one.");
        case 429:
          throw new Error("Too many requests. Please wait and try again.");
        case 500:
        case 502:
        case 503:
        case 504:
          throw new Error("Weather service is temporarily unavailable. Try again later.");
        default:
          throw new Error("Something went wrong. Please try again.");
      }
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error("No response from weather server. Check your connection.");
    } else {
      throw new Error("Unexpected error occurred.");
    }
  }
};
