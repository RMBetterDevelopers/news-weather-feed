import { getAarhusForecast, getAarhusWeather } from "@/lib/weather";
import WeatherWidget from "@/components/weather-widget";
import ForecastList from "./components/forecast-list";

export default async function Opgave2() {
  const [weather, forecast] = await Promise.all([
      getAarhusWeather(),
      getAarhusForecast(),
    ]);

  return (
    <main className="w-full max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">7-dages vejrudsigt</h1>
        <WeatherWidget data={weather} />
        <h2 className="text-xl font-semibold mb-4 mt-8">Prognose</h2>
        <ForecastList forecasts={forecast} />
    </main>
);
}