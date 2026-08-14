import { getCurrentAirQuality, getAirQualityTrend } from "./lib/air-quality";
import AirQualityWidget from "./components/air-quality-widget";
import AirQualityChart from "./components/air-quality-chart";

export default async function Opgave5() {
    const [current, trend] = await Promise.all([
    getCurrentAirQuality(),
    getAirQualityTrend(),
]);
return (
    <main className="w-full max-w-5xl mx-auto p-6">
        <h1>Luftkvalitet</h1>
        <div className="flex flex-col gap-4 mt-6">
            <AirQualityWidget current={current} />
            <AirQualityChart trend={trend} />
        </div>
    </main>
);
}