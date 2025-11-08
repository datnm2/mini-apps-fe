"use client";

import { useState } from "react";
import { DollarSign, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Vietnam Tax Constants 2025
const PERSONAL_DEDUCTION = 11_000_000; // 11M VND/month
const DEPENDENT_DEDUCTION = 4_400_000; // 4.4M VND/month per dependent
const INSURANCE_CAP = 46_800_000; // Maximum salary for insurance calculation

const SOCIAL_INSURANCE_RATE = 0.08; // 8%
const HEALTH_INSURANCE_RATE = 0.015; // 1.5%
const UNEMPLOYMENT_INSURANCE_RATE = 0.01; // 1%

// Progressive tax brackets (monthly)
const TAX_BRACKETS = [
  { limit: 5_000_000, rate: 0.05 },
  { limit: 10_000_000, rate: 0.10 },
  { limit: 18_000_000, rate: 0.15 },
  { limit: 32_000_000, rate: 0.20 },
  { limit: 52_000_000, rate: 0.25 },
  { limit: 80_000_000, rate: 0.30 },
  { limit: Infinity, rate: 0.35 }
];

interface TaxResult {
  grossSalary: number;
  netSalary: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentInsurance: number;
  totalInsurance: number;
  personalDeduction: number;
  dependentDeduction: number;
  taxableIncome: number;
  personalIncomeTax: number;
  taxBreakdown: Array<{ bracket: number; amount: number; tax: number; rate: number }>;
  insuranceBase: number;
}

export default function TaxCalculatorApp() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"grossToNet" | "netToGross">("grossToNet");
  const [grossInput, setGrossInput] = useState("");
  const [grossRaw, setGrossRaw] = useState("");
  const [netInput, setNetInput] = useState("");
  const [netRaw, setNetRaw] = useState("");
  const [dependents, setDependents] = useState(0);
  const [customInsuranceBase, setCustomInsuranceBase] = useState("");
  const [customInsRaw, setCustomInsRaw] = useState("");
  const [useCustomInsurance, setUseCustomInsurance] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);

  const formatCurrency = (amount: number) => {
    // Use en-US format to get commas instead of dots
    return new Intl.NumberFormat("en-US").format(Math.round(amount));
  };

  // Update net/gross when calculation result changes
  const updateFromResult = (res: TaxResult) => {
    setResult(res);
    // Update the opposite field based on calculation
    if (mode === "grossToNet") {
      setNetRaw(res.netSalary.toString());
      setNetInput(formatCurrency(res.netSalary));
    } else {
      setGrossRaw(res.grossSalary.toString());
      setGrossInput(formatCurrency(res.grossSalary));
    }
  };

  const calculateProgressiveTax = (taxableIncome: number) => {
    if (taxableIncome <= 0) return { tax: 0, breakdown: [] };

    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const breakdown: Array<{ bracket: number; amount: number; tax: number; rate: number }> = [];
    let previousLimit = 0;

    for (const bracket of TAX_BRACKETS) {
      const bracketSize = bracket.limit - previousLimit;
      const taxableInBracket = Math.min(remainingIncome, bracketSize);

      if (taxableInBracket > 0) {
        const tax = taxableInBracket * bracket.rate;
        totalTax += tax;
        breakdown.push({
          bracket: previousLimit,
          amount: taxableInBracket,
          tax: tax,
          rate: bracket.rate
        });
        remainingIncome -= taxableInBracket;
      }

      if (remainingIncome <= 0) break;
      previousLimit = bracket.limit;
    }

    return { tax: totalTax, breakdown };
  };

  const calculateGrossToNet = (gross: number, deps: number, customInsBase?: number): TaxResult => {
    // Social and Health Insurance are capped at 46,800,000
    const siHiBase = customInsBase !== undefined
      ? Math.min(customInsBase, INSURANCE_CAP)
      : Math.min(gross, INSURANCE_CAP);

    // Unemployment Insurance uses gross salary (no cap or uses regional minimum wage cap)
    // For simplicity, we use the actual gross or custom base without the SI/HI cap
    const uiBase = customInsBase !== undefined ? customInsBase : gross;

    const socialInsurance = siHiBase * SOCIAL_INSURANCE_RATE;
    const healthInsurance = siHiBase * HEALTH_INSURANCE_RATE;
    const unemploymentInsurance = uiBase * UNEMPLOYMENT_INSURANCE_RATE;
    const totalInsurance = socialInsurance + healthInsurance + unemploymentInsurance;

    const personalDed = PERSONAL_DEDUCTION;
    const dependentDed = deps * DEPENDENT_DEDUCTION;

    const incomeAfterInsurance = gross - totalInsurance;
    const taxableIncome = Math.max(0, incomeAfterInsurance - personalDed - dependentDed);

    const { tax, breakdown } = calculateProgressiveTax(taxableIncome);
    const netSalary = gross - totalInsurance - tax;

    return {
      grossSalary: gross,
      netSalary,
      socialInsurance,
      healthInsurance,
      unemploymentInsurance,
      totalInsurance,
      personalDeduction: personalDed,
      dependentDeduction: dependentDed,
      taxableIncome,
      personalIncomeTax: tax,
      taxBreakdown: breakdown,
      insuranceBase: siHiBase
    };
  };

  const calculateNetToGross = (targetNet: number, deps: number, customInsBase?: number): TaxResult => {
    // Binary search for gross salary
    let low = targetNet;
    let high = targetNet * 2;
    let iterations = 0;
    const maxIterations = 50;

    while (iterations < maxIterations) {
      const mid = (low + high) / 2;
      const result = calculateGrossToNet(mid, deps, customInsBase);

      if (Math.abs(result.netSalary - targetNet) < 100) {
        return result;
      }

      if (result.netSalary < targetNet) {
        low = mid;
      } else {
        high = mid;
      }

      iterations++;
    }

    return calculateGrossToNet((low + high) / 2, deps, customInsBase);
  };

  const handleCalculate = () => {
    const customInsBase = useCustomInsurance && customInsRaw
      ? parseFloat(customInsRaw)
      : undefined;

    if (mode === "grossToNet") {
      const gross = parseFloat(grossRaw);
      if (isNaN(gross) || gross <= 0) return;
      updateFromResult(calculateGrossToNet(gross, dependents, customInsBase));
    } else {
      const net = parseFloat(netRaw);
      if (isNaN(net) || net <= 0) return;
      updateFromResult(calculateNetToGross(net, dependents, customInsBase));
    }
  };

  const handleNumberInput = (
    value: string,
    displaySetter: (val: string) => void,
    rawSetter: (val: string) => void
  ) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, "");

    if (digitsOnly === "") {
      displaySetter("");
      rawSetter("");
      return;
    }

    // Store raw number
    rawSetter(digitsOnly);
    // Format with commas for display
    displaySetter(formatCurrency(parseFloat(digitsOnly)));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <DollarSign className="w-10 h-10 text-emerald-500" />
        {t("apps.taxcalc.title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t("apps.taxcalc.inputSection")}
          </h2>

          {/* Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("apps.taxcalc.mode")}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMode("grossToNet");
                  // Auto-calculate if we have values
                  if (grossRaw && parseFloat(grossRaw) > 0) {
                    const customInsBase = useCustomInsurance && customInsRaw
                      ? parseFloat(customInsRaw)
                      : undefined;
                    updateFromResult(calculateGrossToNet(parseFloat(grossRaw), dependents, customInsBase));
                  }
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  mode === "grossToNet"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {t("apps.taxcalc.grossToNet")}
              </button>
              <button
                onClick={() => {
                  setMode("netToGross");
                  // Auto-calculate if we have values
                  if (netRaw && parseFloat(netRaw) > 0) {
                    const customInsBase = useCustomInsurance && customInsRaw
                      ? parseFloat(customInsRaw)
                      : undefined;
                    updateFromResult(calculateNetToGross(parseFloat(netRaw), dependents, customInsBase));
                  }
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  mode === "netToGross"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {t("apps.taxcalc.netToGross")}
              </button>
            </div>
          </div>

          {/* Salary Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === "grossToNet" ? t("apps.taxcalc.grossSalary") : t("apps.taxcalc.netSalary")} (VND)
            </label>
            <input
              type="text"
              value={mode === "grossToNet" ? grossInput : netInput}
              onChange={(e) =>
                handleNumberInput(
                  e.target.value,
                  mode === "grossToNet" ? setGrossInput : setNetInput,
                  mode === "grossToNet" ? setGrossRaw : setNetRaw
                )
              }
              placeholder="20,000,000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white text-right text-lg font-semibold"
            />
          </div>

          {/* Custom Insurance Base */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={useCustomInsurance}
                onChange={(e) => setUseCustomInsurance(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-2 focus:ring-emerald-500"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("apps.taxcalc.customInsuranceBase")}
              </label>
            </div>
            {useCustomInsurance && (
              <input
                type="text"
                value={customInsuranceBase}
                onChange={(e) => handleNumberInput(e.target.value, setCustomInsuranceBase, setCustomInsRaw)}
                placeholder="20,000,000"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white text-right"
              />
            )}
          </div>

          {/* Dependents */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("apps.taxcalc.dependents")}
            </label>
            <input
              type="number"
              value={dependents}
              onChange={(e) => setDependents(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
          >
            {t("apps.taxcalc.calculate")}
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Note */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-gray-700 dark:text-gray-300">
              <strong>{t("apps.taxcalc.note")}:</strong> {t("apps.taxcalc.noteText")}
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-lg font-medium mb-2 opacity-90">{t("apps.taxcalc.finalAmount")}</h3>
                <div className="text-5xl font-bold mb-6">
                  {formatCurrency(mode === "grossToNet" ? result.netSalary : result.grossSalary)} VND
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-75">{t("apps.taxcalc.grossSalary")}</div>
                    <div className="font-semibold">{formatCurrency(result.grossSalary)} VND</div>
                  </div>
                  <div>
                    <div className="opacity-75">{t("apps.taxcalc.netSalary")}</div>
                    <div className="font-semibold">{formatCurrency(result.netSalary)} VND</div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("apps.taxcalc.breakdown")}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.insuranceBase")} (SI/HI)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.insuranceBase)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.socialInsurance")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.socialInsurance)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.healthInsurance")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.healthInsurance)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.unemploymentIns")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.unemploymentInsurance)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-4 -mx-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{t("apps.taxcalc.totalInsurance")}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.totalInsurance)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.personalDeduction")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.personalDeduction)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.dependentDeduction")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.dependentDeduction)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{t("apps.taxcalc.taxableIncome")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(result.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between py-3 bg-red-50 dark:bg-red-900/20 px-4 -mx-4 rounded-lg">
                    <span className="font-semibold text-gray-900 dark:text-white">{t("apps.taxcalc.personalIncomeTax")}</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(result.personalIncomeTax)}</span>
                  </div>
                </div>

                {/* Tax Brackets */}
                {result.taxBreakdown.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {t("apps.taxcalc.taxBrackets")}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {result.taxBreakdown.map((bracket, idx) => (
                        <div key={idx} className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{formatCurrency(bracket.amount)} × {(bracket.rate * 100).toFixed(0)}%</span>
                          <span className="font-medium">{formatCurrency(bracket.tax)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center text-gray-500 dark:text-gray-400">
              Enter salary information and click calculate to see results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
