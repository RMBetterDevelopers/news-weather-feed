import { WeatherData } from "../lib/weather";
import { Card } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardTitle } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";

interface WeatherWidgetProps {
  data: WeatherData;
}

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Aarhus</CardTitle>
        </CardHeader>
        <CardContent>
        <p className="text-5xl font-bold text-card-foreground mt-2">
            {Math.round(data.temperature)}°C
        </p>
        <p className="text-base text-muted-foreground">{data.description}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span>Føles som {Math.round(data.feelsLike)}°C</span>
            <span>Luftfugtighed {data.humidity}%</span>
            <span>Vind {data.windSpeed} m/s</span>
        </div>
        </CardContent>
    </Card>
  );
}