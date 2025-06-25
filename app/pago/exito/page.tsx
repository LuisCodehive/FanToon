"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"

export default function PaymentSuccessPage() {
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
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-800">¡Pago exitoso!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">Tu pago ha sido procesado correctamente</p>
                <p className="text-gray-600">Recibirás un email de confirmación en los próximos minutos</p>
              </div>

              {orderId && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700 mb-2">
                    <strong>Número de pedido:</strong> {orderId}
                  </p>
                  <p className="text-sm text-green-600">Guarda este número para hacer seguimiento de tu pedido</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">¿Qué sigue ahora?</h3>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>1. Tu libro está en cola de generación</li>
                  <li>2. Nuestro sistema de IA creará el libro personalizado</li>
                  <li>3. Te avisaremos cuando esté listo (24-48 horas)</li>
                  <li>4. Podrás descargar o recibir tu libro según la opción elegida</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {orderId && (
                  <Link href={`/pedido/${orderId}`}>
                    <Button className="bg-green-600 hover:bg-green-700">
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
                <p>¿Problemas con tu pedido?</p>
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
