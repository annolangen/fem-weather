# Weather App Development Plan

This document outlines the steps to build the Frontend Mentor Weather App challenge using `lit-html`, Vite, and Tailwind CSS, following a functional, top-down rendering approach.

## 1. Project Setup & Foundation

**Goal:** Configure the project, set up the basic file structure, and integrate the style guide.

- **Tasks:**
  - [x] **Review `package.json`**: Familiarize yourself with the available scripts (`dev`, `build`, `format`).
  - [x] **Configure Tailwind CSS**: Open `src/style.css` and add a `@theme` block with the custom colors and fonts specified in `weather-app-main/style-guide.md`. This is the Tailwind v4 way of extending the theme.
  - [x] **Refine `src/main.ts`**: Keep the `renderBody` function. Remove the placeholder `weatherHtml` and the `window.onclick` event handlers, as re-rendering will be handled by a state subscription.
  - [x] **Create the Main App Template**: Create a new file `src/app.ts`. This will export a single function, e.g., `appTemplate`, that takes the entire application state and returns a `lit-html` `TemplateResult`.
  - [x] **Template Scaffolding**: Create placeholder files for the other UI parts inside a new `src/ui/` directory. These will export template functions, not components.
    - `src/ui/search-bar.ts`
    - `src/ui/current-weather.ts`
    - `src/ui/daily-forecast.ts`
    - `src/ui/hourly-forecast.ts`
    - `src/ui/unit-switcher.ts`

**Verification:**

- Running `npm run dev` should display a blank page with the correct background color from the style guide.
- Adding temporary text to `app.ts` should show that the custom fonts are correctly applied.
- The project structure should contain the new `app.ts` and `ui/` directory with placeholder files.

## 2. API Service Layer

**Goal:** Create a dedicated module for interacting with the Open-Meteo API. This keeps API logic separate from UI and state logic.

- **Tasks:**
  - [x] **Create API Service**: Create a new file `src/services/api.ts`.
  - [x] **Geocoding Function**: Implement a function to get latitude and longitude from a city name. Open-Meteo provides a geocoding API for this: `https://geocoding-api.open-meteo.com/`.
  - [x] **Weather Fetch Function**: Implement a function to fetch weather data from the main forecast API: `https://api.open-meteo.com/v1/forecast`. This function should accept latitude, longitude, and unit preferences as parameters.
  - [x] **Define Data Types**: Create TypeScript interfaces for the API responses (e.g., `GeocodingResponse`, `WeatherData`) to ensure type safety throughout the application.

**Verification:**

- Temporarily call the geocoding function from `main.ts` with a city like "London" and `console.log` the result. It should show the correct latitude and longitude.
- Temporarily call the weather fetch function with the resulting lat/lon and `console.log` the weather data.
- The fetched data should match the defined TypeScript interfaces without any type errors.

## 3. State Management & Rendering Loop

**Goal:** Create a global state store that automatically triggers re-renders on change, using mock data.

- **Tasks:**
  - [x] **Define Data Types**: The data types (`GeocodingResult`, `WeatherData`) from `api.ts` will be used.
  - [x] **Create Mock Data**: Create a new file `src/mock-data.ts` that exports sample data conforming to the API interfaces.
  - [x] **Create State Store**: Create a new file `src/store.ts` to define the `AppState` and export the observable store.
  - [x] **Define State and Actions (with mocks)**: Inside `src/store.ts`, define the application state shape and implement actions that update the state using mock data.
  - [x] **Connect to Rendering**: In `src/main.ts`, import the store and the main `appTemplate`.
  - [x] **Subscribe to State Changes**: In `src/main.ts`, subscribe the main `renderBody` function to the store to enable automatic re-renders.
  - [x] **Refine `renderBody`**: The `renderBody` function will now get the latest state from the store and pass it to the main `appTemplate`.
  - [x] **Initial Load**: In `src/main.ts`, call an action to load the initial mock weather data.
  - [x] **Add Temporary State Display**: In `app.ts`, add temporary placeholder UI that displays simple state properties like `location.name` and `selectedDayIndex` to confirm the state is connected.

**Verification:**

- The application should render a simple UI based on the initial mock state (e.g., showing "Weather for London").
- The mock weather data should be inspectable in the console via `store.getState().weather`.
- Calling an action from the browser's developer console (e.g., `actions.setSelectedDay(2)`) should update the state and trigger a re-render, showing the change in the UI (e.g., "Selected Day Index: 2").

## 4. API Service Layer & Integration

**Goal:** Implement the real API service and integrate it into the state management actions, while providing a mock data mode for UI development.

- **Tasks:**
  - [x] **Add Mock Data Mode**: In `store.ts`, update the `fetchWeatherForLocation` action to check for `#mock` in the URL. If present, use the existing mock data logic; otherwise, proceed with real API calls.
  - [x] **Integrate API into Store Actions**: In `src/store.ts`, modify the `fetchWeatherForLocation` action to call the real `getGeocoding` and `getWeather` service functions when not in mock mode.
  - [x] **Handle Loading/Error States**: Update the actions to set `isLoading` and `error` state properties during the API call lifecycle.

**Verification:**

- The app now fetches and displays real data from the API for a default location.
- Visiting the app with `#mock` in the URL should force it to use mock data instead.
- A loading indicator should be briefly visible during the fetch.
- Intentionally making a bad API call (e.g., searching for a nonsense city) should populate the `error` state and display an error message.

## 5. Build, Style, and Compose UI Components

**Goal:** Create, style, and compose the individual UI components into the main application template, matching the provided design files.

- **Tasks:**
  - [x] **Build and Style Components**: Create and style the individual UI templates (`search-bar.ts`, `current-weather.ts`, `daily-forecast.ts`, `hourly-forecast.ts`, `unit-switcher.ts`).
  - [x] **Compose Main Template**: In `src/app.ts`, import and use all the UI template functions to build the full application UI.
  - [x] **Pass State and Actions**: Ensure the main `appTemplate` passes the global `state` and `actions` down to the child template functions as needed.

**Verification:**

- The application UI should be fully composed and functional.
- The components should closely match the `mobile-design-metric.jpg` design.
- The components should correctly display data from the mock state (using the `#mock` flag).
- All interactive elements (search, day selection, unit switching) should be wired up and working correctly.

## 6. Finalization

**Goal:** Add final touches, handle responsiveness, and prepare the project for submission.

- **Tasks:**
  - [x] **Responsiveness**: Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`) to adapt the layout for desktop screens, matching the desktop design files.
  - [ ] **Accessibility**: Review the app for accessibility best practices (semantic HTML, keyboard navigation, ARIA attributes).
  - [ ] **README**: Fill out the `README-template.md`.
  - [ ] **Deploy**: Deploy the final site to a public URL.

**Verification:**

- The UI should be a pixel-perfect match of both the mobile and desktop designs.
- The layout should adapt smoothly when the browser window is resized.
- The application is fully accessible via keyboard navigation.
- The deployed application at the public URL works as expected.