import { getAarhusWeather, getAarhusForecast } from "@/lib/weather";
import WeatherWidget from "@/components/weather-widget";
import CommuteList from "./components/commute-list";

export default async function Opgave3() {
  const [weather, forecast] = await Promise.all([
      getAarhusWeather(),
      getAarhusForecast(),
    ]);

  return (
    <main className="w-full max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Bedste pendlermetode</h1>
        <WeatherWidget data={weather} />
        <h2 className="text-xl font-semibold mb-4 mt-8">Ugens anbefalinger</h2>
        <CommuteList forecasts={forecast} />
    </main>
);
}