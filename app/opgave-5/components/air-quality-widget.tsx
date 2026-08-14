import { CurrentAirQuality } from "../lib/air-quality";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AirQualityWidgetProps {
  current: CurrentAirQuality;
}

function getAqiStatus(aqi: number) {
  if (aqi < 40) return { label: "God", color: "#0ca30c" };
  if (aqi < 80) return { label: "Moderat", color: "#fab219" };
  if (aqi < 100) return { label: "Dårlig", color: "#ec835a" };
  return { label: "Meget dårlig", color: "#d03b3b" };
}

export default function AirQualityWidget({ current }: AirQualityWidgetProps) {
    const status = getAqiStatus(current.aqi);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Luftkvalitet Aarhus</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-3">
                <p className="text-4xl font-bold text-card-foreground">{current.aqi}</p>
                <Badge style={{ backgroundColor: status.color, color: "#fff" }}>
                {status.label}
                </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>PM2.5: {current.pm25} µg/m³</span>
                <span>PM10: {current.pm10} µg/m³</span>
                <span>NO2: {current.no2} µg/m³</span>
            </div>
        </CardContent>
    </Card>
  );
}