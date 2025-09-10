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

export const actions = {
  fetchWeatherForLocation: async (locationName: string) => {
    setState({ isLoading: true, error: null });

    const useMockData = window.location.hash === "#mock";

    if (useMockData) {
      console.log(`Fetching weather for ${locationName}... (mock)`);
      setTimeout(() => {
        if (locationName.toLowerCase() === "london") {
          setState({
            location: mockGeocodingResult,
            weather: mockWeatherData,
            isLoading: false,
          });
        } else {
          setState({
            error: `Could not find location: ${locationName}`,
            isLoading: false,
            location: null,
            weather: null,
          });
        }
      }, 500);
      return;
    }

    // Real API logic
    try {
      console.log(`Fetching weather for ${locationName}... (real)`);
      const geocodingData = await getGeocoding(locationName);
      if (!geocodingData || !geocodingData.results || geocodingData.results.length === 0) {
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
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setState({ error: message, isLoading: false, location: null, weather: null });
    }
  },

  setSelectedDay: (index: number) => {
    if (index >= 0 && index < (state.weather?.daily?.time?.length ?? 0)) {
      setState({ selectedDayIndex: index });
    }
  },

  changeUnits: (newUnits: Units) => {
    setState({ units: newUnits });
    if (state.location) {
      actions.fetchWeatherForLocation(state.location.name);
    }
  },
};

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