"use client";

import Link from "next/link";
import { Calculator, CheckSquare, Cloud, Timer, DollarSign, Lightbulb, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const appIcons = {
  todo: CheckSquare,
  calculator: Calculator,
  weather: Cloud,
  timer: Timer,
  taxcalc: DollarSign,
  godquote: Sparkles,
};

const appColors = {
  todo: "bg-blue-500",
  calculator: "bg-green-500",
  weather: "bg-purple-500",
  timer: "bg-red-500",
  taxcalc: "bg-emerald-500",
  godquote: "bg-gradient-to-br from-yellow-400 to-orange-500",
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
      id: "timer",
      name: t("apps.timer.name"),
      description: t("apps.timer.description"),
      href: "/apps/timer"
    },
    {
      id: "taxcalc",
      name: t("apps.taxcalc.name"),
      description: t("apps.taxcalc.description"),
      href: "/apps/taxcalc"
    },
    {
      id: "godquote",
      name: t("apps.godquote.name"),
      description: t("apps.godquote.description"),
      href: "/apps/godquote"
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

        {/* Call to Action Section */}
        <div className="mt-20 mb-16">
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            {/* Content */}
            <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Lightbulb className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t("home.cta.title")}
              </h2>

              <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-4">
                {t("home.cta.subtitle")}
              </p>

              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                {t("home.cta.description")}
              </p>

              <div className="flex flex-col items-center gap-2">
                <a
                  href={`mailto:nmdat.it@gmail.com?subject=${encodeURIComponent(t("home.cta.emailSubject"))}&body=${encodeURIComponent(t("home.cta.emailBody"))}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-6 h-6" />
                  {t("home.cta.button")}
                </a>
                <p className="text-xs text-white/60 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {t("home.cta.emailHint")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>{t("home.footer")}</p>
        </div>
      </div>
    </div>
  );
}
