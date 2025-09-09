import { getGeocoding, getWeather } from "./services/api";

async function testApi() {
  const geo = await getGeocoding("London");
  console.log(geo);
  if (geo && geo.results.length > 0) {
    const { latitude, longitude } = geo.results[0];
    const weather = await getWeather(latitude, longitude);
    console.log(weather);
  }
}

testApi();

import "./style.css";
import { render } from "lit-html";
import { appTemplate } from "./app";

function renderBody() {
  document.body.className = "bg-neutral-800 text-neutral-0 font-sans";
  render(appTemplate(), document.body);
}

renderBody();
