import { DailyForecast } from "@/lib/weather";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ForecastCardProps {
    forecast: DailyForecast
}

export default function ForecastCard ({ forecast }: ForecastCardProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                {new Date(forecast.date).toLocaleDateString("da-DK", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                })}
            </CardTitle>
        </CardHeader>
        <CardContent>
        <p className="text-5xl font-bold text-card-foreground mt-2">
            {Math.round(forecast.maxTemp)}°C / {Math.round(forecast.minTemp)}°C
        </p>
        <p className="text-base text-muted-foreground">{forecast.description}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span>Nedbørssandsynlighed {Math.round(forecast.precipationChance)}%</span>
            <span>Vind {forecast.maxWindSpeed} m/s</span>
        </div>
        </CardContent>
    </Card>
  );
}