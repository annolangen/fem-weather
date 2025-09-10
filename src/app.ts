import { html, type TemplateResult } from "lit-html";
import { type AppState } from "./store";

export function appTemplate(state: AppState): TemplateResult {
  return html`
    <h1 class="font-display text-3xl font-bold underline">Weather App</h1>
    ${
      state.isLoading
        ? html`<p>Loading...</p>`
        : state.error
        ? html`<p>Error: ${state.error}</p>`
        : state.location
        ? html`
            <p>Weather for ${state.location.name}</p>
            <p>Selected Day Index: ${state.selectedDayIndex}</p>
          `
        : html`<p>No location data</p>`
    }
  `;
}
