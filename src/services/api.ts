import { fetchWeatherApi } from "openmeteo";

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  generationtime_ms: number;
}

export async function getGeocoding(
  name: string
): Promise<GeocodingResponse | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch geocoding data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface WeatherData {
  current: {
    time: Date;
    temperature2m: number;
    apparentTemperature: number;
    precipitation: number;
    weatherCode: number;
    windSpeed10m: number;
    humidity: number;
  };
  hourly: {
    time: Date[];
    temperature2m: Float32Array;
    weatherCode: Float32Array;
  };
  daily: {
    time: Date[];
    weatherCode: Float32Array;
    temperature2mMax: Float32Array;
    temperature2mMin: Float32Array;
  };
}

export async function getWeather(
  latitude: number,
  longitude: number,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherData | null> {
  const temperatureUnit = units === "metric" ? "celsius" : "fahrenheit";
  const windspeedUnit = units === "metric" ? "kmh" : "mph";
  const precipitationUnit = units === "metric" ? "mm" : "inch";

  const params = {
    latitude,
    longitude,
    current:
      "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,relative_humidity_2m",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    temperature_unit: temperatureUnit,
    wind_speed_unit: windspeedUnit,
    precipitation_unit: precipitationUnit,
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();
    if (!current || !hourly || !daily) {
      throw new Error("Incomplete weather data received");
    }
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    return {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)?.value() ?? NaN,
        apparentTemperature: current.variables(1)?.value() ?? NaN,
        precipitation: current.variables(2)?.value() ?? NaN,
        weatherCode: current.variables(3)?.value() ?? NaN,
        windSpeed10m: current.variables(4)?.value() ?? NaN,
        humidity: current.variables(5)?.value() ?? NaN,
      },
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)?.valuesArray() ?? new Float32Array(),
        weatherCode: hourly.variables(1)?.valuesArray() ?? new Float32Array(),
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)?.valuesArray() ?? new Float32Array(),
        temperature2mMax:
          daily.variables(1)?.valuesArray() ?? new Float32Array(),
        temperature2mMin:
          daily.variables(2)?.valuesArray() ?? new Float32Array(),
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
