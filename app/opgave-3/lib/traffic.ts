import mockTrafficData from "../data/mock-traffic.json";
import z from "zod";

const trafficConditionSchema = z.object({
  weekday: z.string(),
  congestion: z.enum(["low", "medium", "high"]),
});

export type TrafficCondition = z.infer<typeof trafficConditionSchema>;

const mockTraffic = z.array(trafficConditionSchema).parse(mockTrafficData);

export function getTrafficForDate(date: string): TrafficCondition {
  const weekday = new Date(date).toLocaleDateString("da-DK", { weekday: "long" });

  const match = mockTraffic.find((entry) => entry.weekday === weekday);

  return match ?? { weekday, congestion: "medium" };
}