const AARHUS_LATITUDE = 56.1629;
const AARHUS_LONGITUDE = 10.2039;

const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${AARHUS_LATITUDE}&longitude=${AARHUS_LONGITUDE}` + `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` + `&timezone=Europe/Berlin`;

export interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
}

interface OpenMeteoResponse {
    current: {
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        weather_code: number;
    };
}

const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
  0: "Klar himmel",
  1: "Overvejende klart",
  2: "Delvist skyet",
  3: "Overskyet",
  45: "Tåge",
  48: "Tåge med rimfrost",
  51: "Let støvregn",
  53: "Støvregn",
  55: "Kraftig støvregn",
  61: "Let regn",
  63: "Regn",
  65: "Kraftig regn",
  71: "Let sne",
  73: "Sne",
  75: "Kraftig sne",
  80: "Byger",
  81: "Kraftige byger",
  82: "Voldsomme byger",
  95: "Tordenvejr",
};

function getWeatherDescription(code: number): string {
    return WEATHER_CODE_DESCRIPTIONS[code] ?? "Ukendt vejr";
}

export async function getAarhusWeather(): Promise<WeatherData> {
    const response = await fetch(WEATHER_API_URL, {
        next: { revalidate: 600 }, 
});

 if (!response.ok) {
    throw new Error(`Kunne ikke hente vejrdata: ${response.status}`);
}

const data: OpenMeteoResponse = await response.json();
const current = data.current;

return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    description: getWeatherDescription(current.weather_code),
  };
}