import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather App - Check Weather Forecast",
  description: "Check weather forecasts and conditions for any city. Free online weather app with real-time updates.",
  keywords: ["weather app", "weather forecast", "weather check", "online weather", "city weather"],
  openGraph: {
    title: "Weather App - Check Weather Forecast",
    description: "Check weather forecasts and conditions for any city.",
    type: "website",
  }
};

export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
