// app/opgave-3/lib/recommend.ts

import { DailyForecast } from "@/lib/weather";
import { TrafficCondition } from "./traffic";

export type CommuteMode = "cykel" | "bus" | "bil";

export interface CommuteRecommendation {
  mode: CommuteMode;
  scores: Record<CommuteMode, number>;
}

export function getCommuteRecommendation(
  forecast: DailyForecast,
  traffic: TrafficCondition
): CommuteRecommendation {
  const bikeScore =
    10 - forecast.precipationChance / 10 - (forecast.maxWindSpeed > 25 ? 5 : 0);

  const carScore =
    8 - (traffic.congestion === "high" ? 5 : traffic.congestion === "medium" ? 2 : 0);

  const busScore =
    7 - (traffic.congestion === "high" ? 3 : traffic.congestion === "medium" ? 1 : 0);

  const scores: Record<CommuteMode, number> = {
    cykel: bikeScore,
    bil: carScore,
    bus: busScore,
  };

  const [mode] = Object.entries(scores).reduce((best, current) =>
    current[1] > best[1] ? current : best
  );

  return {
    mode: mode as CommuteMode,
    scores,
  };
}