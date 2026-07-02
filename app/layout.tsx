import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./src/components/ThemeProvider";
import Chatbot from "./src/components/Chatbot"; // <-- Import it here
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
  title: "Angelito P. Decatoria - Portfolio",
  description: "Full Stack Developer | CS Student",
  icons: {
    icon: "/img/icon.webp",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Chatbot /> {/* <-- Render it here */}
        </ThemeProvider>
      </body>
    </html>
  );
}