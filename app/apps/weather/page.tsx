"use client";

import { useState } from "react";
import { Cloud, Search, Droplets, Wind, Eye, Gauge } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WeatherApp() {
  const { t } = useLanguage();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock weather data for demo (in production, use real API)
  const mockWeatherData = {
    city: "San Francisco",
    temperature: 18,
    condition: t("apps.weather.condition"),
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    icon: "🌤️"
  };

  const searchWeather = () => {
    if (!city.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeather({
        ...mockWeatherData,
        city: city,
        temperature: Math.floor(Math.random() * 30) + 10,
        humidity: Math.floor(Math.random() * 40) + 50,
        windSpeed: Math.floor(Math.random() * 20) + 5,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <Cloud className="w-10 h-10 text-purple-500" />
          {t("apps.weather.title")}
        </h1>

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchWeather()}
            placeholder={t("apps.weather.searchPlaceholder")}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={searchWeather}
            disabled={loading}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
            {t("apps.weather.searchButton")}
          </button>
        </div>

        {/* Weather Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t("apps.weather.loading")}</p>
          </div>
        ) : weather ? (
          <div>
            {/* Main Weather */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {weather.city}
              </h2>
              <div className="text-7xl my-4">{weather.icon}</div>
              <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {weather.temperature}°C
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">
                {weather.condition}
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t("apps.weather.humidity")}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {weather.humidity}%
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t("apps.weather.windSpeed")}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {weather.windSpeed} km/h
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t("apps.weather.visibility")}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {weather.visibility} km
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t("apps.weather.pressure")}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {weather.pressure} hPa
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t("apps.weather.noData")}
          </div>
        )}
      </div>
    </div>
  );
}
