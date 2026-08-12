import { WeatherData } from "../lib/weather";

interface WeatherWidgetProps {
  data: WeatherData;
}

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  return (
    <div className="rounded-xl bg-blue-50 shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700">Aarhus</h2>

      <p className="text-5xl font-bold text-gray-900 mt-2">
        {Math.round(data.temperature)}°C
      </p>

      <p className="text-base text-gray-600 mt-1">{data.description}</p>

      <div className="flex gap-4 mt-4 text-sm text-gray-500">
        <span>Føles som {Math.round(data.feelsLike)}°C</span>
        <span>Luftfugtighed {data.humidity}%</span>
        <span>Vind {data.windSpeed} m/s</span>
      </div>
    </div>
  );
}