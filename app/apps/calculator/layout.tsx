import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculator - Free Online Calculator",
  description: "Simple and free online calculator for quick calculations. Fast, responsive, and easy to use.",
  keywords: ["calculator", "online calculator", "free calculator", "web calculator", "math calculator"],
  openGraph: {
    title: "Calculator - Free Online Calculator",
    description: "Simple and free online calculator for quick calculations.",
    type: "website",
  }
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
