import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  title: "Alic3X Studio",
  description: "AI creative collaborator for music production",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden">
        <TooltipProvider>
          {/* Ambient background glow */}
          <div className="fixed inset-0 pointer-events-none z-[-1] animate-pulse-slow">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--mx-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--mx-purple)] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
          </div>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
