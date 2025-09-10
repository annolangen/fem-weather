export function getWeatherInfo(weatherCode: number): {
  description: string;
  icon: string;
} {
  const weatherMap: { [key: number]: { description: string; icon: string } } = {
    0: { description: "Sunny", icon: "icon-sunny.webp" },
    1: { description: "Mainly Sunny", icon: "icon-sunny.webp" },
    2: { description: "Partly Cloudy", icon: "icon-sunny.webp" },
    3: { description: "Overcast", icon: "icon-overcast.webp" },
    45: { description: "Fog", icon: "icon-fog.webp" },
    48: { description: "Depositing Rime Fog", icon: "icon-fog.webp" },
    51: { description: "Light Drizzle", icon: "icon-drizzle.webp" },
    53: { description: "Drizzle", icon: "icon-drizzle.webp" },
    55: { description: "Heavy Drizzle", icon: "icon-drizzle.webp" },
    61: { description: "Light Rain", icon: "icon-rain.webp" },
    63: { description: "Rain", icon: "icon-rain.webp" },
    65: { description: "Heavy Rain", icon: "icon-rain.webp" },
    66: { description: "Freezing Rain", icon: "icon-rain.webp" },
    67: { description: "Heavy Freezing Rain", icon: "icon-rain.webp" },
    71: { description: "Light Snow", icon: "icon-snow.webp" },
    73: { description: "Snow", icon: "icon-snow.webp" },
    75: { description: "Heavy Snow", icon: "icon-snow.webp" },
    77: { description: "Snow Grains", icon: "icon-snow.webp" },
    80: { description: "Light Showers", icon: "icon-rain.webp" },
    81: { description: "Showers", icon: "icon-rain.webp" },
    82: { description: "Heavy Showers", icon: "icon-rain.webp" },
    85: { description: "Light Snow Showers", icon: "icon-snow.webp" },
    86: { description: "Heavy Snow Showers", icon: "icon-snow.webp" },
    95: { description: "Thunderstorm", icon: "icon-storm.webp" },
  };

  return (
    weatherMap[weatherCode] || { description: "Clear", icon: "icon-sunny.webp" }
  );
}
