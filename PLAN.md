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
  - [x] **Define Data Types**: Create TypeScript interfaces for the API responses (e.g., `GeocodingResponse`, `WeatherResponse`) to ensure type safety throughout the application.

**Verification:**

- Temporarily call the geocoding function from `main.ts` with a city like "London" and `console.log` the result. It should show the correct latitude and longitude.
- Temporarily call the weather fetch function with the resulting lat/lon and `console.log` the weather data.
- The fetched data should match the defined TypeScript interfaces without any type errors.

## 3. State Management & Rendering Loop

**Goal:** Create a global state store that automatically triggers re-renders on change, using mock data.

- **Tasks:**
  - [ ] **Define Data Types**: Create `src/services/api.ts` and define TypeScript interfaces for the API responses (e.g., `GeocodingResponse`, `WeatherResponse`). This ensures the mock data and later the real data have the same shape.
  - [ ] **Create Mock Data**: Create a new file `src/mock-data.ts` that exports sample data conforming to the new interfaces. This data should be comprehensive enough to build the entire UI.
  - [ ] **Create State Store**: Create a new file `src/store.ts`. This module will define and export the store.
  - [ ] **Define State and Actions (with mocks)**: Inside `src/store.ts`, define the shape of the application state. Implement actions (`fetchWeatherForLocation`) that use the mock data to update the state.
    - `location` (city name, country, lat, lon)
    - `currentWeather`
    - `dailyForecast`
    - `hourlyForecast`
    - `selectedDayIndex`
    - `units` (metric/imperial, C/F, etc.)
    - `isLoading` and `error` for handling UI states.
  - [ ] **Connect to Rendering**: In `src/main.ts`, import the store and the main `appTemplate`.
  - [ ] **Subscribe to State Changes**: In `src/main.ts`, subscribe to the store. The subscription callback will be the `renderBody` function. This makes re-rendering automatic whenever the state changes.
  - [ ] **Refine `renderBody`**: The `renderBody` function will now get the latest state from the store and pass it to the main template: `render(appTemplate(store.getState()), document.body)`.
  - [ ] **Initial Load**: In `src/main.ts`, call an action from the store to load the mock weather data, which will trigger the first render via the subscription.

**Verification:**

- The application should render UI based on the initial _mock_ state defined in the store.
- Calling a state action from the browser's developer console (e.g., `store.getState().actions.setSelectedDay(2)`) should update the state and trigger a re-render, showing the change in the UI.

## 2. API Service Layer & Integration

**Goal:** Implement the real API service and integrate it into the state management actions.

- **Tasks:**
  - [ ] **Implement API Service**: In `src/services/api.ts`, implement the geocoding and weather fetch functions that call the Open-Meteo API.
  - [ ] **Integrate into Store Actions**: In `src/store.ts`, modify the actions (`fetchWeatherForLocation`) to call the new API service functions instead of using mock data.
  - [ ] **Handle Loading/Error States**: Update the actions to set `isLoading` and `error` state properties during the API call lifecycle.

- **Tasks:**
  **Verification:**

- The app now fetches and displays real data from the API for a default location, replacing the mock data.
- The `isLoading` state should be briefly `true` during the fetch.
- Intentionally making a bad API call should populate the `error` state.

## 4. Building UI Template Functions

**Goal:** Create the individual template functions for each part of the UI. These functions will receive state and actions as arguments.

- **Tasks:**
  - [ ] **Search Bar (`ui/search-bar.ts`):**
    - Create a template function that accepts an `onSearch` action as an argument.
    - Use `lit-html`'s `@submit` directive on the form to call the action, extracting form data within the handler.
  - [ ] **Current Weather (`ui/current-weather.ts`):**
    - Create a template function that accepts `currentWeather`, `location`, and `units` data as arguments.
    - Display temperature, weather icon, location, "feels like", humidity, wind, and precipitation.
  - [ ] **Daily Forecast (`ui/daily-forecast.ts`):**
    - Create a template function that accepts `dailyForecast`, `units`, and an `onDaySelect` action.
    - Render a list of 7 days, showing high/low temp and a weather icon for each.
    - Use `@click` on each day element to call the `onDaySelect` action with the day's index.
  - [ ] **Hourly Forecast (`ui/hourly-forecast.ts`):**
    - Create a template function that accepts the `hourlyForecast` for the selected day and `units`.
    - Render a list or chart of hourly temperatures and icons.
  - [ ] **Unit Switcher (`ui/unit-switcher.ts`):**
    - Create a template function that accepts an `onUnitsChange` action.
    - Use `@change` on dropdowns or toggles to call the action with the new unit settings.

**Verification:**

- Each template function can be tested in isolation by calling it from `app.ts` with mock data.
- The rendered output should contain the correct HTML structure and display the mock data.
- The page should look like a basic, unstyled version of the final design, with all data points present.

## 5. Connecting UI, State, and Actions

**Goal:** Wire up the UI event handlers to call the appropriate store actions, triggering automatic re-renders.

- **Tasks:**
  - [ ] **Compose the Main Template**: In `src/app.ts`, the `appTemplate` function will:
    - Import the other template functions (`searchBarTemplate`, `currentWeatherTemplate`, etc.).
    - Take the global `state` from the store as an argument.
  - [ ] **Pass Actions to UI**: The `appTemplate` will also need access to the store's actions. It will pass these actions down to the child template functions that need them (e.g., passing `fetchWeatherForLocation` to `searchBarTemplate`).
  - [ ] **Connect Handlers in Templates**:
    - In `ui/search-bar.ts`, the form's `@submit` handler will now directly call the `fetchWeatherForLocation` action.
    - In `ui/daily-forecast.ts`, each day's `@click` handler will call the `setSelectedDay` action.
    - In `ui/unit-switcher.ts`, the `@change` handler will call the `changeUnits` action.
  - [ ] **Update `main.ts`**: The `renderBody` function will be simplified. It will get the state from the store and pass it to the `appTemplate`. The event handlers (`handleSearch`, etc.) are no longer needed here as they are part of the store.

**Verification:**

- Searching for a city updates the entire UI with the new location's weather data.
- Clicking a day in the "Daily Forecast" section updates the "Hourly Forecast" section to show data for that day.
- Changing units in the "Unit Switcher" re-fetches data and updates all temperature, wind speed, and precipitation values across the app.
- The application is fully interactive and functional.

## 6. Styling and Responsiveness

**Goal:** Apply styles using Tailwind CSS to match the design and ensure the layout is responsive.

- **Tasks:**
  - [ ] Style each UI part using utility classes based on the provided designs.
  - [ ] Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`) to adapt the layout for mobile and desktop screens.
  - [ ] Implement all hover and focus states for interactive elements like buttons, inputs, and forecast items using `hover:` and `focus:` variants.
  - [ ] Ensure custom fonts from the style guide are loaded (e.g., in `index.html` or via CSS `@font-face`) and applied correctly in the `@theme` block in `src/style.css`.

**Verification:**

- The final UI should be a pixel-perfect match of the `preview.jpg` design for both mobile and desktop views.
- All interactive elements (buttons, inputs, forecast items) must have clear `hover` and `focus` states.
- The layout should adapt smoothly when the browser window is resized, without any visual bugs or overlapping content.

## 7. Finalization

**Goal:** Add loading/error handling, perform final checks, and prepare the project for submission.

- **Tasks:**
  - [ ] **Loading States**: Implement loading indicators (e.g., a spinner) that show when data is being fetched. Use the `isLoading` state property to control visibility within the templates.
  - [ ] **Error Handling**: Display user-friendly error messages if an API call fails or a location is not found. Use the `error` state property.
  - [ ] **Accessibility**: Review the app for accessibility best practices (semantic HTML, keyboard navigation, ARIA attributes for dynamic content).
  - [ ] **README**: Fill out the `README-template.md` with details about your process, what you learned, and links to your solution.
  - [ ] **Screenshot**: Take a screenshot of your finished project and replace `preview.jpg`.
  - [ ] **Deploy**: Deploy the final site to a public URL (e.g., GitHub Pages, Vercel, Netlify).

**Verification:**

- A loading indicator (e.g., a spinner) is visible during API calls.
- An appropriate error message is shown if the API fails or a city is not found.
- The application is fully accessible via keyboard navigation.
- The deployed application at the public URL works as expected.
