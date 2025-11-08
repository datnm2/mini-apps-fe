"use client";

import Link from "next/link";
import { Calculator, CheckSquare, Cloud, Calendar, Timer, FileText, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const appIcons = {
  todo: CheckSquare,
  calculator: Calculator,
  weather: Cloud,
  notes: FileText,
  timer: Timer,
  calendar: Calendar,
  taxcalc: DollarSign,
};

const appColors = {
  todo: "bg-blue-500",
  calculator: "bg-green-500",
  weather: "bg-purple-500",
  notes: "bg-yellow-500",
  timer: "bg-red-500",
  calendar: "bg-indigo-500",
  taxcalc: "bg-emerald-500",
};

export default function Home() {
  const { t } = useLanguage();

  const miniApps = [
    {
      id: "todo",
      name: t("apps.todo.name"),
      description: t("apps.todo.description"),
      href: "/apps/todo"
    },
    {
      id: "calculator",
      name: t("apps.calculator.name"),
      description: t("apps.calculator.description"),
      href: "/apps/calculator"
    },
    {
      id: "weather",
      name: t("apps.weather.name"),
      description: t("apps.weather.description"),
      href: "/apps/weather"
    },
    {
      id: "notes",
      name: t("apps.notes.name"),
      description: t("apps.notes.description"),
      href: "/apps/notes"
    },
    {
      id: "timer",
      name: t("apps.timer.name"),
      description: t("apps.timer.description"),
      href: "/apps/timer"
    },
    {
      id: "calendar",
      name: t("apps.calendar.name"),
      description: t("apps.calendar.description"),
      href: "/apps/calendar"
    },
    {
      id: "taxcalc",
      name: t("apps.taxcalc.name"),
      description: t("apps.taxcalc.description"),
      href: "/apps/taxcalc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("home.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniApps.map((app) => {
            const Icon = appIcons[app.id as keyof typeof appIcons];
            const color = appColors[app.id as keyof typeof appColors];
            return (
              <Link
                key={app.id}
                href={app.href}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {app.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-gray-500 transition-colors duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>{t("home.footer")}</p>
        </div>
      </div>
    </div>
  );
}
