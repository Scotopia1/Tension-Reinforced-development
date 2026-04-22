import type { Metadata } from "next";
import { Anton, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thetrdgroup.com.au"),
  title: "TRD Group — Post-Tension Specialists | Sydney, Australia",
  description:
    "Australia's trusted post-tensioning specialists. Design, supply, and installation of post-tension systems, steel fixing, and structural remedial. $2B+ delivered across residential, commercial and infrastructure projects.",
  keywords: [
    "post-tensioning",
    "post tension",
    "structural remedial",
    "steel fixing",
    "construction",
    "Sydney",
    "Australia",
    "TRD Group",
    "Tension Reinforced Developments",
  ],
  openGraph: {
    title: "TRD Group | The structure beneath everything that stands.",
    description:
      "Post-tensioning specialists. Sydney. $2B+ delivered. Family-led, engineer-architect-builder.",
    type: "website",
    locale: "en_AU",
    siteName: "TRD Group",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
