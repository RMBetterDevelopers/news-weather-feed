import Image from "next/image";
import { getAarhusWeather } from "@/lib/weather";
import { getTopNews } from "@/lib/news";
import WeatherWidget from "@/components/WeatherWidget";
import NewsList from "@/components/NewsList";

const [weather, news] = await Promise.all([
      getAarhusWeather(),
      getTopNews(),
    ]);

export default async function Home() {
  return (
    <main className="max-w-5x1 mx-auto p-6">
      <h1>Dagens overblik</h1>
      <WeatherWidget data={weather} />
      <h2>Nyheder</h2>
      <NewsList articles={news} />
    </main>

  );
}
