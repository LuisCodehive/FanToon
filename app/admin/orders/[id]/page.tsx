"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  Package,
  CreditCard,
  MapPin,
  FileText,
  Mail,
  Phone,
  Save,
  Download,
  Printer,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  getOrderById,
  updateOrderStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  type Order,
} from "@/lib/orders-database"

export default function OrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<Order["status"]>("pending")
  const [notes, setNotes] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar autenticación
    const auth = localStorage.getItem("admin_auth")
    if (auth === "authenticated") {
      setIsAuthenticated(true)
      loadOrder()
    } else {
      window.location.href = "/admin"
    }
  }, [])

  const loadOrder = () => {
    const orderId = params.id as string
    const orderData = getOrderById(orderId)
    if (orderData) {
      setOrder(orderData)
      setNewStatus(orderData.status)
      setNotes(orderData.notes || "")
    }
  }

  const handleUpdateStatus = () => {
    if (order) {
      const success = updateOrderStatus(order.id, newStatus, notes)
      if (success) {
        setOrder({ ...order, status: newStatus, notes })
        alert("Estado actualizado correctamente")
      }
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

  if (!isAuthenticated || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">Pedido no encontrado</h2>
          <Link href="/admin">
            <Button>Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900">Pedido {order.id}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Estado del Pedido</span>
                  <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Cambiar Estado</label>
                    <Select value={newStatus} onValueChange={(value: Order["status"]) => setNewStatus(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="processing">Procesando</SelectItem>
                        <SelectItem value="production">En Producción</SelectItem>
                        <SelectItem value="shipped">Enviado</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleUpdateStatus} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Actualizar
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Notas Internas</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Agregar notas sobre el pedido..."
                    rows={3}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <div>Creado: {formatDate(order.createdAt)}</div>
                  <div>Última actualización: {formatDate(order.lastUpdated)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Información del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre</label>
                    <div className="text-lg font-semibold">{order.customer.name}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={`mailto:${order.customer.email}`} className="text-blue-600 hover:underline">
                        {order.customer.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Teléfono</label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={`tel:${order.customer.phone}`} className="text-blue-600 hover:underline">
                        {order.customer.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Detalles del Libro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre del Protagonista</label>
                    <div className="text-lg font-semibold">{order.bookDetails.childName}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Foto Subida</label>
                    <div className="flex items-center">
                      {order.bookDetails.photoUploaded ? (
                        <Badge className="bg-green-100 text-green-800">✓ Sí</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">✗ No</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-700">Equipo Favorito</label>
                  <div className="text-lg font-semibold">{order.bookDetails.team.name}</div>
                  <div className="text-sm text-gray-600">
                    {order.bookDetails.team.country}
                    {order.bookDetails.team.league && ` • ${order.bookDetails.team.league}`}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Entrenador</label>
                  <div className="text-lg font-semibold">{order.bookDetails.coach}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Trofeo</label>
                  <div className="text-lg font-semibold">{order.bookDetails.trophy}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Jugadores Seleccionados</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {order.bookDetails.players.map((player, index) => (
                      <Badge key={index} variant="outline">
                        {player}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            {order.shipping && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dirección</label>
                      <div className="text-lg">
                        {order.shipping.address} {order.shipping.addressNumber}
                        {order.shipping.barrio && `, ${order.shipping.barrio}`}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Ciudad</label>
                        <div>{order.shipping.city}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Provincia</label>
                        <div>{order.shipping.province}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Código Postal</label>
                        <div>{order.shipping.postalCode}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Tiempo Estimado</label>
                        <div>{order.shipping.estimatedDays}</div>
                      </div>
                    </div>
                    {order.shipping.observations && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Observaciones</label>
                        <div className="text-gray-600">{order.shipping.observations}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Producto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold">{order.product.title}</div>
                    <div className="text-2xl font-bold text-green-600">{formatPrice(order.product.price)}</div>
                  </div>
                  {order.shipping && (
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span>Envío:</span>
                        <span>{formatPrice(order.shipping.cost)}</span>
                      </div>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">{formatPrice(order.payment.total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Método</label>
                    <div>{order.payment.method}</div>
                  </div>
                  {order.payment.transactionId && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">ID Transacción</label>
                      <div className="font-mono text-sm">{order.payment.transactionId}</div>
                    </div>
                  )}
                  {order.payment.paidAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Pagado el</label>
                      <div>{formatDate(order.payment.paidAt)}</div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Estado</label>
                    <div>
                      {order.payment.paidAt ? (
                        <Badge className="bg-green-100 text-green-800">Pagado</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email al Cliente
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Libro PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Package className="w-4 h-4 mr-2" />
                  Generar Etiqueta de Envío
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
