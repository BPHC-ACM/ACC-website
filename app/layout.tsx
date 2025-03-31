import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/cursor/theme-provider"
import CursorEffect from "./components/cursor/cursor-effect"
import NeuralBackground from "./components/cursor/neural-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ACC - Academic Counselling Cell",
  description: "Empowering Your Academic Journey",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider>
          <CursorEffect />
          <NeuralBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

