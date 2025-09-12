import "./style.css";
import { render } from "lit-html";
import { appHtml } from "./app";
import { store, actions } from "./store";

function renderBody() {
  document.body.className = "bg-neutral-900 text-neutral-0 font-sans";
  const state = store.getState();
  render(appHtml({ state, actions }), document.body);
}

// Initial render
renderBody();

// Subscribe to state changes
store.subscribe(renderBody);

// Initial data load
actions.fetchWeatherForLocation("London");

// --- For debugging purposes ---
declare global {
  interface Window {
    store: typeof store;
    actions: typeof actions;
  }
}
window.store = store;
window.actions = actions;
