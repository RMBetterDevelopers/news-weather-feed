import { DailyForecast } from "@/lib/weather";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sun, CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

interface ForecastCardProps {
    forecast: DailyForecast
}

function getWeatherIcon(code: number) {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code <= 48) return CloudFog;
  if (code <= 57) return CloudDrizzle;
  if (code <= 67) return CloudRain;
  if (code <= 77) return CloudSnow;
  if (code <= 82) return CloudRain;
  return CloudLightning;
}

export default function ForecastCard ({ forecast }: ForecastCardProps) {
    const Icon = getWeatherIcon(forecast.weatherCode);
  return (
    <Card>
        <Icon className="mx-auto mt-4 size-16 text-muted-foreground" />
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