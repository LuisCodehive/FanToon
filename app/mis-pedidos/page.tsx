"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Package, Eye, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import AuthGuard from "@/components/auth/auth-guard"
import SiteHeader from "@/components/site-header"
import type { Order } from "@/lib/firebase/types"

const ORDER_STATUS_LABELS = {
  pending: "Pendiente de pago",
  payment_pending: "Pago pendiente",
  payment_failed: "Pago fallido",
  paid: "Pagado",
  processing: "Procesando",
  generating: "Generando libro",
  completed: "Completado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
}

const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  payment_pending: "bg-orange-100 text-orange-800",
  payment_failed: "bg-red-100 text-red-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  generating: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-800",
  refunded: "bg-orange-100 text-orange-800",
}

export default function MisPedidosPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserOrders()
    }
  }, [user])

  const loadUserOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders/user/${user?.uid}`)
      const result = await response.json()

      if (result.success) {
        setOrders(result.orders)
      }
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setLoading(false)
    }
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
    return `$${price.toLocaleString()} ARS`
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50">
        <SiteHeader />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
              <p className="text-gray-600">Aquí puedes ver el estado de todos tus libros personalizados</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Cargando tus pedidos...</p>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No tienes pedidos aún</h3>
                  <p className="text-gray-600 mb-6">¡Crea tu primer libro personalizado!</p>
                  <Link href="/crear">
                    <Button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600">
                      Crear mi primer libro
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-white border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Libro para {order.bookDetails.childName}</CardTitle>
                          <p className="text-sm text-gray-600">
                            Pedido #{order.id.slice(0, 8)}... • {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Detalles del libro */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Detalles del libro</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Protagonista:</span>
                              <span className="font-medium">{order.bookDetails.childName}</span>
                            </div>
                            {order.bookDetails.team && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Equipo:</span>
                                <span className="font-medium">{order.bookDetails.team.name}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Jugadores:</span>
                              <span className="font-medium">{order.bookDetails.players.length}</span>
                            </div>
                            {order.bookDetails.trophy && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Trofeo:</span>
                                <span className="font-medium">{order.bookDetails.trophy}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Información del producto */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Producto</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tipo:</span>
                              <span className="font-medium">{order.product.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Precio:</span>
                              <span className="font-medium">{formatPrice(order.product.price)}</span>
                            </div>
                            {order.shipping && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Envío:</span>
                                <span className="font-medium">{formatPrice(order.shipping.cost)}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-semibold">
                              <span>Total:</span>
                              <span>{formatPrice(order.payment.total)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Estado y acciones */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Estado</h4>
                          <div className="space-y-3">
                            <Badge className={`${ORDER_STATUS_COLORS[order.status]} text-xs`}>
                              {ORDER_STATUS_LABELS[order.status]}
                            </Badge>

                            {order.payment.paidAt && (
                              <div className="text-xs text-green-600 flex items-center">
                                <DollarSign className="w-3 h-3 mr-1" />
                                Pagado el {formatDate(order.payment.paidAt)}
                              </div>
                            )}

                            {order.estimatedDelivery && (
                              <div className="text-xs text-blue-600 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Entrega estimada: {formatDate(order.estimatedDelivery)}
                              </div>
                            )}

                            <Link href={`/pedido/${order.id}`}>
                              <Button size="sm" variant="outline" className="w-full">
                                <Eye className="w-4 h-4 mr-2" />
                                Ver detalles
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
