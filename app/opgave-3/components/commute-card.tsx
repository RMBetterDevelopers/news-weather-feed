import { DailyForecast } from "@/lib/weather";
import { TrafficCondition } from "../lib/traffic";
import { CommuteRecommendation, CommuteMode } from "../lib/recommend";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, Bus, Car } from "lucide-react";

interface CommuteCardProps {
  forecast: DailyForecast;
  traffic: TrafficCondition;
  recommendation: CommuteRecommendation;
}

function getCommuteIcon(mode: CommuteMode) {
  if (mode === "cykel") return Bike;
  if (mode === "bus") return Bus;
  return Car;
}

const CONGESTION_LABELS: Record<TrafficCondition["congestion"], string> = {
  low: "Lav trafik",
  medium: "Moderat trafik",
  high: "Høj trafik",
};

const CONGESTION_VARIANTS: Record<
  TrafficCondition["congestion"],
  "secondary" | "outline" | "destructive"
> = {
  low: "secondary",
  medium: "outline",
  high: "destructive",
};

export default function CommuteCard({
  forecast,
  traffic,
  recommendation,
}: CommuteCardProps) {
  const Icon = getCommuteIcon(recommendation.mode);

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
        <div className="flex flex-col items-center gap-2 py-2">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon vælges blandt faste, statisk importerede ikoner; der oprettes ingen ny komponent ved render */}
          <Icon className="size-12 text-primary" />
          <p className="text-lg font-semibold capitalize">{recommendation.mode}</p>
        </div>

        <Badge variant={CONGESTION_VARIANTS[traffic.congestion]} className="mt-2">
          {CONGESTION_LABELS[traffic.congestion]}
        </Badge>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span>Nedbør {Math.round(forecast.precipationChance)}%</span>
          <span>Vind {forecast.maxWindSpeed} m/s</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
          <span>Cykel: {recommendation.scores.cykel.toFixed(1)}</span>
          <span>Bus: {recommendation.scores.bus.toFixed(1)}</span>
          <span>Bil: {recommendation.scores.bil.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
}