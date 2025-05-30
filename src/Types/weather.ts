export type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
  };
};

export type ForecastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export type ForecastData = WeatherData & {
  forecast: {
    forecastday: ForecastDay[];
  };
};