"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart";
import { AirQualityTrendPoint } from "../lib/air-quality";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const aqiChartConfig = {
  aqi: { label: "AQI", theme: { light: "#2a78d6", dark: "#3987e5" } },
} satisfies ChartConfig;

const pollutantChartConfig = {
  pm25: { label: "PM2.5", theme: { light: "#2a78d6", dark: "#3987e5" } },
  pm10: { label: "PM10", theme: { light: "#eb6834", dark: "#d95926" } },
  no2: { label: "NO2", theme: { light: "#1baf7a", dark: "#199e70" } },
} satisfies ChartConfig;

interface AirQualityChartProps {
  trend: AirQualityTrendPoint[];
}

export default function AirQualityChart({ trend }: AirQualityChartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>AQI, seneste 5 dage</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={aqiChartConfig} className="h-64 w-full">
            <LineChart data={trend}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("da-DK", { weekday: "short" })
                }
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="aqi" stroke="var(--color-aqi)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forurening, seneste 5 dage</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pollutantChartConfig} className="h-64 w-full">
            <LineChart data={trend}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("da-DK", { weekday: "short" })
                }
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line dataKey="pm25" stroke="var(--color-pm25)" strokeWidth={2} dot={{ r: 4 }} />
              <Line dataKey="pm10" stroke="var(--color-pm10)" strokeWidth={2} dot={{ r: 4 }} />
              <Line dataKey="no2" stroke="var(--color-no2)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}