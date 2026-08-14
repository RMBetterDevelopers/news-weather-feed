import mockDataRaw from "../data/mock-air-quality.json";

const AARHUS_LATITUDE = 56.1629;
const AARHUS_LONGITUDE = 10.2039;

export interface CurrentAirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
}

export interface AirQualityTrendPoint {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  date: string;
}

interface MockAirQualityData {
  current: CurrentAirQuality;
  trend: AirQualityTrendPoint[];
}

const mockData = mockDataRaw as MockAirQualityData;

export async function getCurrentAirQuality(): Promise<CurrentAirQuality> {
  try {
    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${AARHUS_LATITUDE}&longitude=${AARHUS_LONGITUDE}&current=european_aqi,pm2_5,pm10,nitrogen_dioxide&timezone=Europe/Berlin`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();

    return {
      aqi: data.current.european_aqi,
      pm25: data.current.pm2_5,
      pm10: data.current.pm10,
      no2: data.current.nitrogen_dioxide,
    };
  } catch {
    return mockData.current;
  }
}

export async function getAirQualityTrend(): Promise<AirQualityTrendPoint[]> {
  try {
    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${AARHUS_LATITUDE}&longitude=${AARHUS_LONGITUDE}&hourly=european_aqi,pm2_5,pm10,nitrogen_dioxide&timezone=Europe/Berlin&forecast_days=5`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();

    const allPoints = data.hourly.time.map((time: string, index: number) => ({
      date: time,
      aqi: data.hourly.european_aqi[index],
      pm25: data.hourly.pm2_5[index],
      pm10: data.hourly.pm10[index],
      no2: data.hourly.nitrogen_dioxide[index],
    }));

    return allPoints.filter((point: AirQualityTrendPoint) =>
      point.date.endsWith("T12:00")
    );
  } catch {
    return mockData.trend;
  }
}