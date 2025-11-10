import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divine Wisdom - Personalized Motivational Quotes",
  description: "Receive personalized motivational quotes and wisdom from famous philosophers, leaders, and visionaries. Get inspired with divine wisdom tailored for you.",
  keywords: ["motivational quotes", "inspirational quotes", "divine wisdom", "famous quotes", "philosopher quotes", "motivational app", "inspiration", "wisdom quotes"],
  openGraph: {
    title: "Divine Wisdom - What God Gonna Tell You",
    description: "Receive personalized motivational quotes and wisdom from great minds throughout history.",
    type: "website",
  }
};

export default function GodQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
