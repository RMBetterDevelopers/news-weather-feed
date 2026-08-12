import { getAarhusWeather } from "@/lib/weather";
import { getTopNews } from "@/lib/news";
import WeatherWidget from "@/components/WeatherWidget";
import NewsList from "@/components/NewsList";

export default async function Home() {
  const [weather, news] = await Promise.all([
      getAarhusWeather(),
      getTopNews(),
    ]);

  return (
    <main className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dagens overblik</h1>
      <WeatherWidget data={weather} />
      <h2 className="text-xl font-semibold mb-4 mt-8">Nyheder</h2>
      <NewsList articles={news} />
    </main>

  );
}