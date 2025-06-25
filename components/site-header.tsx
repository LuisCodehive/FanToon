"use client"

import Link from "next/link"
import Image from "next/image"
import CountrySelector from "@/components/country-selector"
import { useAuth } from "@/lib/auth-context"
import UserMenu from "@/components/auth/user-menu"
import LoginDialog from "@/components/auth/login-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SiteHeader() {
  const { user, loading } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/toonfan-logo.png" alt="ToonFan Logo" width={140} height={60} className="h-12 w-auto" />
        </Link>
        <div className="flex items-center space-x-4">
          <CountrySelector />
          <nav className="hidden md:flex space-x-6">
            <Link href="/contacto" className="text-gray-600 hover:text-orange-500 transition-colors">
              Contacto
            </Link>
          </nav>

          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <UserMenu />
          ) : (
            <Button
              onClick={() => setShowLoginDialog(true)}
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
            >
              Iniciar Sesión
            </Button>
          )}

          <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
        </div>
      </div>
    </header>
  )
}
