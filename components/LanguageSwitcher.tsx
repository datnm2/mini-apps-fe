"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
        <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="font-medium text-gray-900 dark:text-white">
          {languages.find((l) => l.code === locale)?.flag}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              locale === lang.code
                ? "bg-blue-50 dark:bg-blue-900/20"
                : ""
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {lang.name}
            </span>
            {locale === lang.code && (
              <span className="ml-auto text-blue-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
