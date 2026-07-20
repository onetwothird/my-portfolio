import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import Chatbot from "./components/Chatbot"; 
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from "react";
import VisitorTracker from "./components/VisitorTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angelito P. Decatoria III | Full Stack Developer",
  description: "Computer Science student specializing in building responsive web applications and software solutions.",
  icons: {
    icon: "/img/icon.png",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0a0a0a]">
        
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Chatbot /> 
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}