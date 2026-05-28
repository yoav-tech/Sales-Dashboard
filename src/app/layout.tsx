import type { Metadata } from "next";
import { Poppins, Bodoni_Moda, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IMAI · AI Influencer Marketing Platform | 400M+ Creators",
  description:
    "IMAI is the #1 AI-powered influencer marketing platform. Find, evaluate, and activate creators from a database of 400M+ influencers across Instagram, TikTok, YouTube, and X.",
  authors: [{ name: "IMAI Labs Inc." }],
  openGraph: {
    type: "website",
    siteName: "IMAI",
    title: "IMAI — #1 AI Influencer Marketing Platform",
    description:
      "Find, evaluate, and activate creators from 400M+ influencers. AI discovery, campaign management, ROI tracking, and creator payouts — all in one platform.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMAI — #1 AI Influencer Marketing Platform",
    description:
      "Find, evaluate, and activate creators from 400M+ influencers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${bodoni.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
