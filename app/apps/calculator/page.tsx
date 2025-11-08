"use client";

import { useState } from "react";
import { Calculator as CalcIcon, Delete } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CalculatorApp() {
  const { t } = useLanguage();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(display);
    } else if (!newNumber) {
      calculate();
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setNewNumber(false);
    }
  };

  const buttons = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "÷", type: "operation" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "×", type: "operation" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operation" },
    { label: "0", type: "number" },
    { label: ".", type: "decimal" },
    { label: "=", type: "equals" },
    { label: "+", type: "operation" },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <CalcIcon className="w-10 h-10 text-green-500" />
          {t("apps.calculator.title")}
        </h1>

        {/* Display */}
        <div className="mb-6 p-6 bg-gray-900 dark:bg-gray-950 rounded-xl">
          <div className="text-right text-4xl font-mono text-white overflow-x-auto">
            {display}
          </div>
          {operation && previousValue && (
            <div className="text-right text-sm text-gray-400 mt-2">
              {previousValue} {operation}
            </div>
          )}
        </div>

        {/* Clear Button */}
        <button
          onClick={clear}
          className="w-full mb-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <Delete className="w-5 h-5" />
          {t("apps.calculator.clear")}
        </button>

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => {
                if (btn.type === "number") handleNumber(btn.label);
                else if (btn.type === "operation") handleOperation(btn.label);
                else if (btn.type === "decimal") handleDecimal();
                else if (btn.type === "equals") calculate();
              }}
              className={`py-4 text-xl font-semibold rounded-lg transition-colors ${
                btn.type === "operation" || btn.type === "equals"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
