import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://apps.dat09vn.com";

export const metadata: Metadata = {
  title: {
    default: "Mini Apps Hub - Free Online Tools & Utilities",
    template: "%s | Mini Apps Hub"
  },
  description: "Free online tools and utilities: Todo List, Calculator, Weather, Pomodoro Timer, and Vietnam Tax Calculator. Built with Next.js 15 - Fast, responsive, and easy to use.",
  keywords: ["online tools", "free utilities", "todo list", "calculator", "weather app", "pomodoro timer", "vietnam tax calculator", "salary calculator", "mini apps"],
  authors: [{ name: "Mini Apps Hub" }],
  creator: "Mini Apps Hub",
  publisher: "Mini Apps Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: siteUrl,
    siteName: "Mini Apps Hub",
    title: "Mini Apps Hub - Free Online Tools & Utilities",
    description: "Free online tools: Todo List, Calculator, Weather, Pomodoro Timer, Vietnam Tax Calculator. Fast and easy to use.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Mini Apps Hub"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Apps Hub - Free Online Tools & Utilities",
    description: "Free online tools: Todo List, Calculator, Weather, Pomodoro Timer, Vietnam Tax Calculator",
    images: [`${siteUrl}/og-image.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here after setting up
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
