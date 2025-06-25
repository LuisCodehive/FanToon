import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CountryProvider } from "@/lib/country-context"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ToonFan - Libros de Colorear Personalizados",
  description: "Creá libros de colorear únicos y personalizados para los más chicos",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CountryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </CountryProvider>
      </body>
    </html>
  )
}
