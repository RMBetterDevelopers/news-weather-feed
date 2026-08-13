import mockTrafficData from "../data/mock-traffic.json";

export interface TrafficCondition {
  weekday: string;
  congestion: "low" | "medium" | "high";
}

const mockTraffic = mockTrafficData as TrafficCondition[];

export function getTrafficForDate(date: string): TrafficCondition {
  const weekday = new Date(date).toLocaleDateString("da-DK", { weekday: "long" });

  const match = mockTraffic.find((entry) => entry.weekday === weekday);

  return match ?? { weekday, congestion: "medium" };
}