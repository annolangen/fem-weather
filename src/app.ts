import { html } from "lit-html";
import { type AppState, actions } from "./store";
import { searchBarHtml } from "./ui/search-bar";
import { currentWeatherHtml } from "./ui/current-weather";
import { dailyForecastHtml } from "./ui/daily-forecast";
import { hourlyForecastHtml } from "./ui/hourly-forecast";
import { unitSwitcherHtml } from "./ui/unit-switcher";
import { weatherDetailsHtml } from "./ui/weather-details";

type AppTemplateProps = {
  state: AppState;
  actions: typeof actions;
};

export const appHtml = ({ state, actions }: AppTemplateProps) => html`
  <main class="container mx-auto p-4 md:max-w-screen-xl">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Weather</h1>
      ${unitSwitcherHtml({ state, actions })}
    </div>

    ${searchBarHtml({ onSearch: actions.fetchWeatherForLocation })}

    <div class="mt-8 md:flex md:gap-8">
      ${state.isLoading
        ? html`<p class="text-center md:w-full">Loading...</p>`
        : state.error
          ? html`<p class="text-center text-red-500 md:w-full">
              Error: ${state.error}
            </p>`
          : state.weather && state.location
            ? html`
                <div class="md:w-1/2">
                  ${currentWeatherHtml(state)} ${weatherDetailsHtml(state)}
                </div>
                <div class="md:w-1/2">
                  ${dailyForecastHtml({ state, actions })}
                  ${hourlyForecastHtml({ state, actions })}
                </div>
              `
            : html`<p class="text-center md:w-full">
                Search for a city to get started.
              </p>`}
    </div>
  </main>
`;
