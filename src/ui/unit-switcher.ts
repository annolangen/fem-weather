import { html } from "lit-html";
import type { AppState, actions } from "../store";

type UnitSwitcherProps = {
  state: AppState;
  actions: typeof actions;
};

export function unitSwitcherHtml({ state, actions }: UnitSwitcherProps) {
  return html`
    <div class="flex items-center gap-2">
      <label for="unit-select" class="text-neutral-400">Units</label>
      <select
        id="unit-select"
        @change=${handleUnitChange}
        class="focus:ring-primary-400 rounded-full bg-neutral-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
      >
        <option value="metric" ?selected=${state.units === "metric"}>°C</option>
        <option value="imperial" ?selected=${state.units === "imperial"}>
          °F
        </option>
      </select>
    </div>
  `;

  function handleUnitChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    actions.changeUnits(selectElement.value as "metric" | "imperial");
  }
}
