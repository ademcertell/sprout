import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import type React from "react" // Added import for React
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Sprout",
  description: "A productivity tool that grows with you. Sprout is a minimalistic and engaging Pomodoro app that visualizes your progress by growing a tree as you work. Stay focused, stay motivated",
  icons: {
    icon: "logo.jpg",
    apple: "logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0d0d0f] text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
