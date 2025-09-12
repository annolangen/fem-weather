import type { GeocodingResult, WeatherData } from "./services/api";
import { getGeocoding, getWeather } from "./services/api";
import { mockGeocodingResult, mockWeatherData } from "./mock-data";

// --- STATE TYPE DEFINITIONS ---

export type Units = "metric" | "imperial";

export interface AppState {
  location: GeocodingResult | null;
  weather: WeatherData | null;
  selectedDayIndex: number;
  units: Units;
  isLoading: boolean;
  error: string | null;
}

// --- INITIAL STATE ---

const initialState: AppState = {
  location: null,
  weather: null,
  selectedDayIndex: 0,
  units: "metric",
  isLoading: true,
  error: null,
};

// --- STORE IMPLEMENTATION ---

type Listener = () => void;

let state: AppState = initialState;
const listeners: Listener[] = [];

function notifyListeners() {
  listeners.forEach(listener => listener());
}

function setState(newState: Partial<AppState>) {
  state = { ...state, ...newState };
  notifyListeners();
}

// --- ACTIONS ---

async function fetchWeatherForLocation(locationName: string) {
  if (window.location.hash === "#mock") {
    setState({
      location: mockGeocodingResult,
      weather: mockWeatherData,
      isLoading: false,
    });
    return;
  }

  setState({ isLoading: true, error: null });
  try {
    console.log(`Fetching weather for ${locationName}... `);
    const geocodingData = await getGeocoding(locationName);
    if (
      !geocodingData ||
      !geocodingData.results ||
      geocodingData.results.length === 0
    ) {
      throw new Error(`Could not find location: ${locationName}`);
    }

    const location = geocodingData.results[0];
    const weatherData = await getWeather(
      location.latitude,
      location.longitude,
      state.units
    );

    if (!weatherData) {
      throw new Error("Failed to fetch weather data.");
    }

    setState({ location, weather: weatherData, isLoading: false });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    setState({
      error: message,
      isLoading: false,
      location: null,
      weather: null,
    });
  }
}

function setSelectedDay(index: number) {
  if (index >= 0 && index < (state.weather?.daily?.time?.length ?? 0)) {
    setState({ selectedDayIndex: index });
  }
}

function changeUnits(newUnits: Units) {
  setState({ units: newUnits });
  if (state.location) {
    fetchWeatherForLocation(state.location.name);
  }
}

export const actions = { fetchWeatherForLocation, setSelectedDay, changeUnits };

// --- STORE EXPORT ---

export const store = {
  getState: () => state,
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },
};
