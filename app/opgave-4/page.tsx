import { getAarhusWeather } from "@/lib/weather"
import { getJoke } from "./lib/joke"
import { getUpcomingEvents } from "./lib/events"
import WeatherWidget from "@/components/weather-widget"
import ResourceLinks from "./components/resource-links"
import JokeWidget from "./components/joke-widget"
import CalendarWidget from "./components/calendar-widget"

export default async function Opgave4() {
    const [weather, joke, events] = await Promise.all([
    getAarhusWeather(),
    getJoke(),
    getUpcomingEvents(),
]);
return (
    <main className="w-full max-w-5xl mx-auto p-6">
        <ResourceLinks />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <WeatherWidget data={weather} />
            <JokeWidget joke={joke} />
            <CalendarWidget events={events} />
        </div>
    </main>
);
}