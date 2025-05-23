import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meta Travel International | Let’s Travel & Earn Income",
  description: "Join Meta Travel International's  innovative global travel platform that simplifies holiday planning with seamless digital access, and enjoy complimentary travel experiences worldwide.",
  keywords: "Meta Travel International, community, travel rewards, referral bonuses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cosmic-gradient-animated star-bg min-h-screen`}
      >
        <div className="fixed inset-0 z-[-1] bg-black opacity-50"></div>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
