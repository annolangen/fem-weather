import type { GeocodingResult, WeatherData } from "./services/api";

export const mockGeocodingResult: GeocodingResult = {
  id: 2643743,
  name: "London",
  latitude: 51.50853,
  longitude: -0.12574,
  elevation: 25,
  feature_code: "PPLC",
  country_code: "GB",
  admin1_id: 6269131,
  timezone: "Europe/London",
  population: 7556900,
  postcodes: [],
  country_id: 2635167,
  country: "United Kingdom",
  admin1: "England",
};

export const mockWeatherData: WeatherData = {
  current: {
    time: new Date(),
    temperature2m: 15.0,
    apparentTemperature: 14.0,
    precipitation: 0.1,
    weatherCode: 3,
    windSpeed10m: 10.0,
  },
  hourly: {
    time: Array.from({ length: 24 }, (_, i) => {
      const d = new Date();
      d.setHours(i, 0, 0, 0);
      return d;
    }),
    temperature2m: new Float32Array(
      Array.from({ length: 24 }, () => 10 + Math.random() * 10)
    ),
    weatherCode: new Float32Array(
      Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
    ),
  },
  daily: {
    time: Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    }),
    weatherCode: new Float32Array(
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
    ),
    temperature2mMax: new Float32Array(
      Array.from({ length: 7 }, () => 15 + Math.random() * 5)
    ),
    temperature2mMin: new Float32Array(
      Array.from({ length: 7 }, () => 8 + Math.random() * 5)
    ),
  },
};
