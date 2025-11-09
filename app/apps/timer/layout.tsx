import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Timer - Productivity Timer & Stopwatch",
  description: "Free Pomodoro timer and stopwatch. Improve productivity with the Pomodoro Technique. Work 25 minutes, break 5 minutes.",
  keywords: ["pomodoro timer", "productivity timer", "online timer", "stopwatch", "pomodoro technique", "focus timer"],
  openGraph: {
    title: "Pomodoro Timer - Productivity Timer & Stopwatch",
    description: "Free Pomodoro timer and stopwatch. Improve productivity with the Pomodoro Technique.",
    type: "website",
  }
};

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
