import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnam Tax Calculator - Free Salary Tax Calculator",
  description: "Calculate Vietnam personal income tax, social insurance, health insurance. Convert between gross and net salary. Free online Vietnam tax calculator for 2025.",
  keywords: ["vietnam tax calculator", "salary calculator vietnam", "income tax vietnam", "gross to net vietnam", "net to gross calculator", "vietnam social insurance calculator", "bhxh calculator", "bhyt calculator"],
  openGraph: {
    title: "Vietnam Tax Calculator - Free Salary Tax Calculator",
    description: "Calculate Vietnam personal income tax, social insurance, health insurance. Convert between gross and net salary.",
    type: "website",
  }
};

export default function TaxCalcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
