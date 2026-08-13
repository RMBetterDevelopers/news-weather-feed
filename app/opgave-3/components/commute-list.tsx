import { DailyForecast } from "@/lib/weather";
import { getTrafficForDate } from "../lib/traffic";
import { getCommuteRecommendation } from "../lib/recommend";
import CommuteCard from "./commute-card";

interface CommuteListProps {
  forecasts: DailyForecast[];
}

export default function CommuteList({ forecasts }: CommuteListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {forecasts.map((forecast) => {
        const traffic = getTrafficForDate(forecast.date);
        const recommendation = getCommuteRecommendation(forecast, traffic);

        return (
          <CommuteCard
            key={forecast.date}
            forecast={forecast}
            traffic={traffic}
            recommendation={recommendation}
          />
        );
      })}
    </div>
  );
}