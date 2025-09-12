import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { type AppState, actions } from "../store";
import { getWeatherInfo } from "../utils/weather";

type DailyForecastProps = {
  state: AppState;
  actions: typeof actions;
};

export function dailyForecastHtml({ state, actions }: DailyForecastProps) {
  if (!state.weather) return html``;

  const { daily } = state.weather;
  const tempUnit = state.units === "metric" ? "°C" : "°F";
  const getDayOfWeek = (date: Date) =>
    date.toLocaleDateString(undefined, { weekday: "short" });

  return html`
    <div class="mt-8 rounded-lg bg-neutral-800 p-4">
      <h3 class="mb-4 text-lg font-bold text-white">Daily Forecast</h3>
      <div class="grid grid-cols-2 gap-4">
        ${daily.time.map(
          (date, index) => html`
            <button
              @click=${() => actions.setSelectedDay(index)}
              class=${classMap({
                "flex flex-col items-center rounded-lg p-4 text-left": true,
                "bg-primary-400 text-white": state.selectedDayIndex === index,
                "bg-neutral-700 text-neutral-400 hover:bg-neutral-600":
                  state.selectedDayIndex !== index,
              })}
            >
              <span class="mb-2 text-lg font-bold">${getDayOfWeek(date)}</span>
              <img
                src="/weather-app-main/assets/images/${getWeatherInfo(
                  daily.weatherCode[index]
                ).icon}"
                alt="${getWeatherInfo(daily.weatherCode[index]).description}"
                class="mb-2 h-12 w-12"
              />
              <div class="text-center">
                <span class="text-white"
                  >${daily.temperature2mMax[index].toFixed(0)}${tempUnit}</span
                >
                <span class="ml-2 text-neutral-400"
                  >${daily.temperature2mMin[index].toFixed(0)}${tempUnit}</span
                >
              </div>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
