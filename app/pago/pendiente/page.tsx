"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"

export default function PaymentPendingPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const orderParam = searchParams.get("order")
    if (orderParam) {
      setOrderId(orderParam)
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-yellow-200 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <Clock className="w-16 h-16 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl text-yellow-800">Pago pendiente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">Tu pago está siendo procesado</p>
                <p className="text-gray-600">Te notificaremos cuando se confirme el pago</p>
              </div>

              {orderId && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-700 mb-2">
                    <strong>Número de pedido:</strong> {orderId}
                  </p>
                  <p className="text-sm text-yellow-600">Guarda este número para hacer seguimiento de tu pedido</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Medios de pago pendientes:</h3>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>
                    • <strong>Transferencia bancaria:</strong> Hasta 1 día hábil
                  </li>
                  <li>
                    • <strong>Efectivo (Rapipago/Pago Fácil):</strong> Hasta 2 días hábiles
                  </li>
                  <li>
                    • <strong>Tarjeta de crédito:</strong> Verificación del banco
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">¿Qué hacer mientras tanto?</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>1. Conserva el comprobante de pago</li>
                  <li>2. Revisa tu email regularmente</li>
                  <li>3. Puedes consultar el estado en cualquier momento</li>
                  <li>4. Te avisaremos cuando se confirme el pago</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {orderId && (
                  <Link href={`/pedido/${orderId}`}>
                    <Button className="bg-yellow-600 hover:bg-yellow-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver estado del pedido
                    </Button>
                  </Link>
                )}
                <Link href="/">
                  <Button variant="outline">Volver al inicio</Button>
                </Link>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>¿Problemas con tu pago?</p>
                <Link href="/contacto" className="text-cyan-600 hover:text-cyan-700">
                  Contáctanos aquí
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
