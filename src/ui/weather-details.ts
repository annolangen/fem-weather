import { html, type TemplateResult } from "lit-html";
import type { AppState } from "../store";

export function weatherDetailsTemplate(state: AppState): TemplateResult {
  if (!state.weather) {
    return html``;
  }

  const { weather, units } = state;
  const { current } = weather;

  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "km/h" : "mph";
  const precipUnit = units === "metric" ? "mm" : "in";

  return html`
    <div class="mt-4 grid grid-cols-2 gap-4">
      <div class="flex flex-col items-center rounded-lg bg-neutral-700 p-4">
        <p class="text-lg text-neutral-400">Feels Like</p>
        <p class="text-xl font-bold text-white">
          ${current.apparentTemperature.toFixed(0)}${tempUnit}
        </p>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-neutral-700 p-4">
        <p class="text-lg text-neutral-400">Humidity</p>
        <p class="text-xl font-bold text-white">
          ${current.humidity.toFixed(0)}%
        </p>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-neutral-700 p-4">
        <p class="text-lg text-neutral-400">Precipitation</p>
        <p class="text-xl font-bold text-white">
          ${current.precipitation.toFixed(1)}${precipUnit}
        </p>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-neutral-700 p-4">
        <p class="text-lg text-neutral-400">Wind</p>
        <p class="text-xl font-bold text-white">
          ${current.windSpeed10m.toFixed(1)}${windUnit}
        </p>
      </div>
    </div>
  `;
}
