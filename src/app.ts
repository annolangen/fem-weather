import { html, type TemplateResult } from "lit-html";
import { type AppState, type actions } from "./store";
import { searchBarTemplate } from "./ui/search-bar";
import { currentWeatherTemplate } from "./ui/current-weather";
import { dailyForecastTemplate } from "./ui/daily-forecast";
import { hourlyForecastTemplate } from "./ui/hourly-forecast";
import { unitSwitcherTemplate } from "./ui/unit-switcher";
import { weatherDetailsTemplate } from "./ui/weather-details";

type AppTemplateProps = {
  state: AppState;
  actions: typeof actions;
};

export function appTemplate({
  state,
  actions,
}: AppTemplateProps): TemplateResult {
  return html`
    <main class="container mx-auto p-4 md:max-w-screen-xl">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Weather</h1>
        ${unitSwitcherTemplate({ state, actions })}
      </div>

      ${searchBarTemplate({ onSearch: actions.fetchWeatherForLocation })}

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
                    ${currentWeatherTemplate(state)}
                    ${weatherDetailsTemplate(state)}
                  </div>
                  <div class="md:w-1/2">
                    ${dailyForecastTemplate({ state, actions })}
                    ${hourlyForecastTemplate({ state, actions })}
                  </div>
                `
              : html`<p class="text-center md:w-full">
                  Search for a city to get started.
                </p>`}
      </div>
    </main>
  `;
}
