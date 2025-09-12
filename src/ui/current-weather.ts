import { html } from "lit-html";
import type { AppState } from "../store";
import { getWeatherInfo } from "../utils/weather";

export function currentWeatherHtml(state: AppState) {
  if (!state.weather || !state.location) {
    return html``;
  }

  const { weather, location, units } = state;
  const { current } = weather;
  const weatherInfo = getWeatherInfo(current.weatherCode);

  const tempUnit = units === "metric" ? "°C" : "°F";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseUrl = import.meta.env.BASE_URL;

  return html`
    <h1 class="mb-8 text-4xl font-bold text-white">
      How's the sky looking today?
    </h1>
    <div
      class="rounded-lg bg-neutral-800 p-6 text-white"
      style="background-image: url('${baseUrl}assets/images/bg-today-small.svg'); background-size: cover; background-position: center;"
    >
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">${location.name}</h2>
          <p class="text-neutral-400">${today}</p>
        </div>
        <img
          src="${baseUrl}assets/images/${weatherInfo.icon}"
          alt="${weatherInfo.description}"
          class="h-24 w-24"
        />
      </div>
      <div class="mb-6 text-center">
        <span class="text-8xl font-bold"
          >${current.temperature2m.toFixed(0)}</span
        >
        <span class="text-4xl font-light">${tempUnit}</span>
        <p class="text-2xl">${weatherInfo.description}</p>
      </div>
    </div>
  `;
}
