import { html, type TemplateResult } from "lit-html";
import type { AppState, actions } from "../store";
import { getWeatherInfo } from "../utils/weather";

type HourlyForecastProps = {
  state: AppState;
  actions: typeof actions;
};

export function hourlyForecastTemplate({
  state,
  actions,
}: HourlyForecastProps): TemplateResult {
  if (!state.weather) {
    return html``;
  }

  const { hourly, daily } = state.weather;
  const tempUnit = state.units === "metric" ? "°C" : "°F";

  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  };

  const handleDayChange = (event: Event) => {
    const selectElement = event.target as HTMLSelectElement;
    actions.setSelectedDay(parseInt(selectElement.value, 10));
  };

  // Get the start and end index for the selected day's hourly forecast (24 hours)
  const startIndex = state.selectedDayIndex * 24;
  const endIndex = startIndex + 24;

  const dayHourlyTime = hourly.time.slice(startIndex, endIndex);
  const dayHourlyTemp = hourly.temperature2m.slice(startIndex, endIndex);
  const dayHourlyWeatherCode = hourly.weatherCode.slice(startIndex, endIndex);

  const formatHour = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      hour12: true,
    });
  };

  return html`
    <div class="mt-8 rounded-lg bg-neutral-800 p-4">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-bold text-white">Hourly Forecast</h3>
        <select
          @change=${handleDayChange}
          class="focus:ring-primary-400 rounded-full bg-neutral-700 px-4 py-2 text-white focus:ring-2 focus:outline-none"
        >
          ${daily.time.map(
            (date, index) => html`
              <option
                value="${index}"
                ?selected=${state.selectedDayIndex === index}
              >
                ${getDayOfWeek(date)}
              </option>
            `
          )}
        </select>
      </div>
      <div class="flex flex-col space-y-2">
        ${dayHourlyTime.map(
          (date, i) => html`
            <div
              class="flex items-center justify-between rounded-lg bg-neutral-700 p-4 text-white"
            >
              <p class="text-sm text-neutral-400">${formatHour(date)}</p>
              <img
                src="/weather-app-main/assets/images/${getWeatherInfo(
                  dayHourlyWeatherCode[i]
                ).icon}"
                alt="${getWeatherInfo(dayHourlyWeatherCode[i]).description}"
                class="my-2 h-10 w-10"
              />
              <p>${dayHourlyTemp[i].toFixed(0)}${tempUnit}</p>
            </div>
          `
        )}
      </div>
    </div>
  `;
}
