import { html } from "lit-html";
import { type AppState, actions } from "../store";
import { getWeatherInfo } from "../utils/weather";

type HourlyForecastProps = {
  state: AppState;
  actions: typeof actions;
};

export function hourlyForecastHtml({ state, actions }: HourlyForecastProps) {
  if (!state.weather) return html``;

  const { hourly, daily } = state.weather;
  const tempUnit = state.units === "metric" ? "°C" : "°F";

  const getDayOfWeek = (date: Date) =>
    date.toLocaleDateString(undefined, { weekday: "long" });

  const handleDayChange = (event: Event) =>
    actions.setSelectedDay(
      parseInt((event.target as HTMLSelectElement).value, 10)
    );

  // Get the start and end index for the selected day's hourly forecast (24 hours)
  const startIndex = state.selectedDayIndex * 24;
  const endIndex = startIndex + 24;

  const dayHourlyTime = hourly.time.slice(startIndex, endIndex);
  const dayHourlyTemp = hourly.temperature2m.slice(startIndex, endIndex);
  const dayHourlyWeatherCode = hourly.weatherCode.slice(startIndex, endIndex);

  const baseUrl = import.meta.env.BASE_URL;

  const formatHour = (date: Date) =>
    date.toLocaleTimeString(undefined, {
      hour: "numeric",
      hour12: true,
    });

  return html`
    <div class="mt-8 rounded-lg bg-neutral-800 p-4">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-bold text-white">Hourly Forecast</h3>
        <select
          @change=${handleDayChange}
          class="rounded-lg bg-neutral-700 px-4 py-2 text-white"
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
              class="flex items-center justify-between rounded-lg bg-neutral-700 px-4 text-white"
            >
              <span>
                <img
                  src="${baseUrl}assets/images/${getWeatherInfo(
                    dayHourlyWeatherCode[i]
                  ).icon}"
                  alt="${getWeatherInfo(dayHourlyWeatherCode[i]).description}"
                  class="inline h-10 w-10"
                />
                <span class="text-sm text-neutral-400"
                  >${formatHour(date)}</span
                >
              </span>
              <p>${dayHourlyTemp[i].toFixed(0)}${tempUnit}</p>
            </div>
          `
        )}
      </div>
    </div>
  `;
}
