"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase/auth"
import { toast } from "@/hooks/use-toast"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function LoginDialog({
  open,
  onOpenChange,
  onSuccess,
}: LoginDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      })

      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      setLoading(true)
      await signInWithFacebook()

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      })

      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Iniciar Sesión</DialogTitle>
          <DialogDescription className="text-center">
            Necesitas una cuenta para crear tu libro personalizado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center space-y-2">
            <div className="text-6xl">📚</div>
            <h3 className="text-lg font-semibold">¡Creá tu libro único!</h3>
            <p className="text-sm text-gray-600">
              Inicia sesión para personalizar y crear libros de colorear únicos
              para los más chicos
            </p>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continuar con Google</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleFacebookSignIn}
            disabled={loading}
            className="w-full bg-[#1877F2] hover:bg-[#145db2] text-white flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0h-21.35C.599 0 0 .6 0 1.326v21.348C0 23.4.599 24 1.325 24h11.49V14.708h-3.13v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.401 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
                </svg>
                <span>Continuar con Facebook</span>
              </>
            )}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            Al continuar, aceptas nuestros términos de servicio y política de
            privacidad
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
