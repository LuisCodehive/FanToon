"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"

export default function PaymentErrorPage() {
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
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-rose-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-red-200 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl text-red-800">Error en el pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">No pudimos procesar tu pago</p>
                <p className="text-gray-600">Esto puede deberse a varios motivos</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Posibles causas:</h3>
                <ul className="text-sm text-red-700 space-y-1 text-left">
                  <li>• Fondos insuficientes en la tarjeta</li>
                  <li>• Datos de la tarjeta incorrectos</li>
                  <li>• Límite de compra excedido</li>
                  <li>• Problemas temporales con el banco</li>
                  <li>• Pago cancelado por el usuario</li>
                </ul>
              </div>

              {orderId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>Número de pedido:</strong> {orderId}
                  </p>
                  <p className="text-sm text-blue-600">Tu pedido está guardado, puedes intentar pagar nuevamente</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {orderId && (
                  <Link href={`/pedido/${orderId}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Intentar pagar nuevamente
                    </Button>
                  </Link>
                )}
                <Link href="/crear">
                  <Button variant="outline">Crear nuevo pedido</Button>
                </Link>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>¿Necesitas ayuda?</p>
                <Link href="/contacto" className="text-cyan-600 hover:text-cyan-700">
                  Contáctanos para asistencia
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
