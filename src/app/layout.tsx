import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schrijf Woorden - Leer Nederlands door te typen",
  description: "Een interactieve applicatie voor het oefenen van Nederlandse woordenschat met slimme herhaling en spaced repetition algoritme.",
  keywords: ["Nederlands leren", "woorden oefenen", "taalonderwijs", "spaced repetition", "woordenschat"],
  authors: [{ name: "Schrijf Woorden" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Schrijf Woorden",
    description: "Leer Nederlands woorden door te typen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
