"use client";

import { useState, useEffect } from "react";
import { Timer as TimerIcon, Play, Pause, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TimerApp() {
  const { t } = useLanguage();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");

  const modes = {
    pomodoro: 25,
    short: 5,
    long: 15,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            // Timer finished
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(modes[mode]);
    setSeconds(0);
  };

  const changeMode = (newMode: "pomodoro" | "short" | "long") => {
    setMode(newMode);
    setMinutes(modes[newMode]);
    setSeconds(0);
    setIsActive(false);
  };

  const progress = ((modes[mode] * 60 - (minutes * 60 + seconds)) / (modes[mode] * 60)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <TimerIcon className="w-10 h-10 text-red-500" />
          {t("apps.timer.title")}
        </h1>

        {/* Mode Selection */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => changeMode("pomodoro")}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              mode === "pomodoro"
                ? "bg-red-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t("apps.timer.pomodoro")}
          </button>
          <button
            onClick={() => changeMode("short")}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              mode === "short"
                ? "bg-red-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t("apps.timer.shortBreak")}
          </button>
          <button
            onClick={() => changeMode("long")}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              mode === "long"
                ? "bg-red-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t("apps.timer.longBreak")}
          </button>
        </div>

        {/* Timer Display */}
        <div className="relative mb-8">
          {/* Progress Ring */}
          <svg className="w-full h-64" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-red-500 transition-all duration-1000"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              transform="rotate(-90 100 100)"
            />
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-gray-900 dark:text-white font-mono">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className="px-8 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2 text-lg font-semibold"
          >
            {isActive ? (
              <>
                <Pause className="w-6 h-6" />
                {t("apps.timer.pause")}
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                {t("apps.timer.start")}
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2 text-lg font-semibold"
          >
            <RotateCcw className="w-6 h-6" />
            {t("apps.timer.reset")}
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>{t("apps.timer.info")}</strong> {t("apps.timer.infoText")}
          </p>
        </div>
      </div>
    </div>
  );
}
