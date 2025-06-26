"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Package, Truck, Download, Mail, Phone, MapPin, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import SiteHeader from "@/components/site-header"
import type { Order } from "@/lib/firebase/types"

const ORDER_STATUS_LABELS = {
  pending: "Pendiente de pago",
  paid: "Pago confirmado",
  processing: "Procesando",
  generating: "Generando libro",
  completed: "Libro listo",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-orange-100 text-orange-800",
  generating: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function OrderStatusPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [queuePosition, setQueuePosition] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadOrder = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders/${params.id}`)
      const result = await response.json()

      if (result.success) {
        setOrder(result.order)

        // Get queue position if order is in processing
        if (result.order.status === "processing" || result.order.status === "generating") {
          const queueResponse = await fetch(`/api/orders/queue-position/${params.id}`)
          const queueResult = await queueResponse.json()
          if (queueResult.success && queueResult.position) {
            setQueuePosition(queueResult.position)
          }
        }
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Error al cargar el pedido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrder()

    // Auto-refresh every 30 seconds if order is in progress
    const interval = setInterval(() => {
      if (order && (order.status === "processing" || order.status === "generating")) {
        loadOrder()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [params.id])

  const getProgressPercentage = () => {
    if (!order) return 0

    const statusProgress = {
      pending: 10,
      paid: 25,
      processing: 50,
      generating: 75,
      completed: 100,
      shipped: 100,
      delivered: 100,
      cancelled: 0,
    }

    return statusProgress[order.status] || 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price: number) => {
    return `$${price} ARS`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Cargando pedido...</h2>
              <p className="text-gray-600">Por favor espera un momento</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-xl font-bold mb-2">Pedido no encontrado</h2>
              <p className="text-gray-600 mb-4">{error || "No se pudo cargar la información del pedido"}</p>
              <Link href="/">
                <Button>Volver al inicio</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Estado de tu pedido</h1>
            <p className="text-gray-600">Pedido #{order.id}</p>
            <p className="text-sm text-gray-500">Creado el {formatDate(order.createdAt)}</p>
          </div>

          {/* Status Progress */}
                    <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Estado actual</h3>
                <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
              </div>
              <Progress value={getProgressPercentage()} className="h-3 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className={`p-3 rounded-lg ${order.status === "paid" ? "bg-blue-100" : order.status === "pending" ? "bg-yellow-100" : "bg-gray-100"}`}>
                  <CheckCircle className={`w-6 h-6 mx-auto mb-2 ${order.status !== "pending" ? "text-green-500" : "text-gray-400"}`} />
                  <p className="text-sm font-medium">Pago</p>
                </div>
                <div className={`p-3 rounded-lg ${order.status === "processing" || order.status === "generating" ? "bg-orange-100" : order.status === "completed" || order.status === "shipped" || order.status === "delivered" ? "bg-green-100" : "bg-gray-100"}`}>
                  <Clock className={`w-6 h-6 mx-auto mb-2 ${order.status === "processing" || order.status === "generating" ? "text-orange-500" : order.status === "completed" || order.status === "shipped" || order.status === "delivered" ? "text-green-500" : "text-gray-400"}`} />
                  <p className="text-sm font-medium">Generación</p>
                </div>
                <div className={`p-3 rounded-lg ${order.status === "completed" ? "bg-green-100" : order.status === "shipped" || order.status === "delivered" ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Package className={`w-6 h-6 mx-auto mb-2 ${order.status === "completed" || order.status === "shipped" || order.status === "delivered" ? "text-green-500" : "text-gray-400"}`} />
                  <p className="text-sm font-medium">Listo</p>
                </div>
                <div className={`p-3 rounded-lg ${order.status === "delivered" ? "bg-green-100" : "bg-gray-100"}`}>
                  <Truck className={`w-6 h-6 mx-auto mb-2 ${order.status === "delivered" ? "text-green-500" : "text-gray-400"}`} />
                  <p className="text-sm font-medium">Entregado</p>
                </div>
              </div>
              {queuePosition && (order.status === "processing" || order.status === "generating") && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-orange-800">Posición en cola: #{queuePosition}</span>
                  </div>
                  <p className="text-sm text-orange-700 mt-1">
                    Tu libro está siendo procesado. Te notificaremos por email cuando esté listo.
                  </p>
                </div>
              )}
              {(order.status === "processing" || order.status === "generating") && (
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={loadOrder} size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualizar estado
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              {/* Book Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>Detalles del libro</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Protagonista</label>
                    <div className="text-lg font-semibold">{order.childName}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Equipo</label>
                    <div>{order.team?.name || "No especificado"}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Entrenador</label>
                    <div>{order.coach}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Trofeo</label>
                    <div>{order.trophy}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Jugadores</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {order.players.map((player, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {player}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Foto</label>
                    <div>
                      {order?.photoUrl ? (
                        <Badge className="bg-green-100 text-green-800">✓ Subida</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Sin foto</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>Información de contacto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{order.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.customerPhone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              {order.shipping && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Dirección de envío</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div>
                        {order.shipping.address} {order.shipping.addressNumber}
                      </div>
                      {order.shipping.barrio && <div>{order.shipping.barrio}</div>}
                      <div>
                        {order.shipping.city}, {order.shipping.province}
                      </div>
                      <div>CP: {order.shipping.postalCode}</div>
                      {order.shipping.observations && (
                        <div className="text-sm text-gray-600 mt-2">
                          <strong>Observaciones:</strong> {order.shipping.observations}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Product & Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>💳</span>
                    <span>Resumen del pedido</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{order.productTitle}</span>
                    <span>{formatPrice(order.productPrice)}</span>
                  </div>

                  {order.shipping && (
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>{formatPrice(order?.shipping.cost)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">{formatPrice(order.payment.total)}</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div>Método de pago: {order.payment.method}</div>
                    {order.payment.paidAt && <div>Pagado el: {formatDate(order.payment.paidAt)}</div>}
                  </div>
                </CardContent>
              </Card>

              {/* Download Link */}
              {order.status === "completed" && order.generatedBookUrl && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">¡Tu libro está listo!</h3>
                    <p className="text-green-700 mb-4">Ya puedes descargar tu libro personalizado</p>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a href={order.generatedBookUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Descargar libro
                      </a>
                    </Button>
                    {order.downloadExpiresAt && (
                      <p className="text-xs text-green-600 mt-2">
                        Link válido hasta: {formatDate(order.downloadExpiresAt)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Status Messages */}
              {order.status === "pending" && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                    <h3 className="font-bold text-yellow-800 mb-2">Esperando pago</h3>
                    <p className="text-yellow-700 text-sm">
                      Una vez que se confirme el pago, comenzaremos a generar tu libro personalizado.
                    </p>
                  </CardContent>
                </Card>
              )}

              {order.status === "paid" && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold text-blue-800 mb-2">Pago confirmado</h3>
                    <p className="text-blue-700 text-sm">
                      ¡Perfecto! Tu pago fue confirmado. Pronto comenzaremos a generar tu libro.
                    </p>
                  </CardContent>
                </Card>
              )}

              {(order.status === "processing" || order.status === "generating") && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-6 text-center">
                    <Loader2 className="w-8 h-8 text-orange-600 mx-auto mb-3 animate-spin" />
                    <h3 className="font-bold text-orange-800 mb-2">Generando tu libro</h3>
                    <p className="text-orange-700 text-sm">
                      Nuestro equipo está trabajando en tu libro personalizado. Te notificaremos por email cuando esté
                      listo.
                    </p>
                  </CardContent>
                </Card>
              )}

              {order.status === "shipped" && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6 text-center">
                    <Truck className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold text-blue-800 mb-2">Libro enviado</h3>
                    <p className="text-blue-700 text-sm">
                      Tu libro está en camino. Recibirás un email con el código de seguimiento.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Help */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">¿Necesitás ayuda?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Si tenés alguna pregunta sobre tu pedido, no dudes en contactarnos.
                  </p>
                  <Link href="/contacto">
                    <Button variant="outline" size="sm">
                      Contactar soporte
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
