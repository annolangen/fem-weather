import "./style.css";
import { html, render } from "lit-html";

const weatherHtml = html` Units Switch to Imperial/Metric Temperature Celsius
  (°C) Fahrenheit (°F) Wind Speed km/h mph Precipitation Millimeters (mm) Inches
  (in) How's the sky looking today? Search for a city, e.g., New York Search
  Feels like
  <!-- Insert temperature here -->

  Humidity
  <!-- Insert humidity here -->

  Wind
  <!-- Insert wind here -->

  Precipitation
  <!-- Insert precipitation here -->

  Daily forecast
  <!-- Insert daily forecast for the next 7 days here -->

  Hourly forecast
  <!-- Insert hourly forecast for the selected day here -->

  <div class="attribution">
    Challenge by
    <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
    Coded by <a href="#">Your Name Here</a>.
  </div>`;

function renderBody() {
  render(
    html`<h1 class="text-3xl font-bold underline">Hello world!</h1>`,
    document.body
  );
}

renderBody();
window.onclick = window.onhashchange = renderBody;
