import { DailyForecast } from "@/lib/weather";
import ForecastCard from "./forecast-card";

interface ForecastListProps {
  forecasts: DailyForecast[];
}

export default function ForecastList({ forecasts }: ForecastListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecasts.map((forecast) => (
                <ForecastCard key={forecast.date} forecast={forecast} />
            ))}
        </div>
    );
}