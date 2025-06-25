"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import LoginDialog from "./login-dialog"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginDialog(true)
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-blue-50">
            <div className="text-center space-y-6 p-8">
              <div className="text-8xl">🔒</div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Acceso Requerido</h1>
                <p className="text-gray-600">Necesitas iniciar sesión para acceder a esta página</p>
              </div>
            </div>
          </div>
        )}
        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onSuccess={() => setShowLoginDialog(false)}
        />
      </>
    )
  }

  return <>{children}</>
}
