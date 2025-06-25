"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, MapPin, Clock, Truck, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import SiteHeader from "@/components/site-header"
import { useAuth } from "@/lib/auth-context"
import type { FormData } from "@/app/crear/page"

interface ProductOption {
  id: string
  title: string
  price: number
  description: string
  productionTime?: string
  shipping?: boolean
}

const PRODUCT_OPTIONS: Record<string, ProductOption> = {
  pdf: {
    id: "pdf",
    title: "Libro Digital PDF",
    price: 2999,
    description: "Descarga inmediata del libro personalizado",
  },
  "tapa-blanda": {
    id: "tapa-blanda",
    title: "Libro Impreso Tapa Blanda",
    price: 13999,
    description: "Libro físico con impresión profesional",
    productionTime: "5 días de producción",
    shipping: true,
  },
  "tapa-dura": {
    id: "tapa-dura",
    title: "Libro Impreso Tapa Dura",
    price: 24999,
    description: "Edición premium con tapa dura",
    productionTime: "5 días de producción",
    shipping: true,
  },
}

const PROVINCES = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null)
  const [bookData, setBookData] = useState<FormData | null>(null)
  const [shippingCost, setShippingCost] = useState(0)
  const [shippingTime, setShippingTime] = useState("")
  const [mapUrl, setMapUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    addressNumber: "",
    barrio: "",
    city: "",
    province: "",
    postalCode: "",
    observations: "",
  })
  const [mapValidated, setMapValidated] = useState(false)
  const [showMapError, setShowMapError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const option = searchParams.get("option")
    if (option && PRODUCT_OPTIONS[option]) {
      setSelectedOption(PRODUCT_OPTIONS[option])
    }

    // Load pre-order data instead of localStorage
    const loadPreOrderData = async () => {
      const preOrderId = localStorage.getItem("preOrderId")
      if (preOrderId) {
        try {
          const response = await fetch(`/api/pre-orders/${preOrderId}`)
          const result = await response.json()

          if (result.success) {
            const preOrderData = result.preOrder
            setBookData({
              storyType: preOrderData.bookDetails.storyType,
              team: preOrderData.bookDetails.team,
              childName: preOrderData.bookDetails.childName,
              coach: preOrderData.bookDetails.coach,
              trophy: preOrderData.bookDetails.trophy,
              players: preOrderData.bookDetails.players,
              photo: null, // Photo is already uploaded
            })
          }
        } catch (error) {
          console.error("Error loading pre-order:", error)
          // Fallback to localStorage
          const savedBookData = localStorage.getItem("bookData")
          if (savedBookData) {
            setBookData(JSON.parse(savedBookData))
          }
        }
      } else {
        // Fallback to localStorage
        const savedBookData = localStorage.getItem("bookData")
        if (savedBookData) {
          setBookData(JSON.parse(savedBookData))
        }
      }
    }

    loadPreOrderData()

    // Pre-fill user data if authenticated
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.displayName || "",
      }))
    }
  }, [searchParams, user])

  const calculateShipping = () => {
    if (!selectedOption?.shipping || !formData.province) return

    // Simulación de cálculo de envío
    const baseCost = formData.province === "Buenos Aires" ? 2500 : 3500
    const timeInDays = formData.province === "Buenos Aires" ? "2-3 días" : "3-5 días"

    setShippingCost(baseCost)
    setShippingTime(timeInDays)
  }

  useEffect(() => {
    calculateShipping()
  }, [formData.province, selectedOption])

  useEffect(() => {
    // Actualizar el mapa cuando cambia la dirección
    if (formData.address && formData.city && formData.province) {
      const address = `${formData.address} ${formData.addressNumber}, ${formData.barrio ? formData.barrio + ", " : ""}${formData.city}, ${formData.province}, Argentina`
      const encodedAddress = encodeURIComponent(address)
      setMapUrl(`https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`)
    }
  }, [formData.address, formData.addressNumber, formData.barrio, formData.city, formData.province])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getTotalPrice = () => {
    return selectedOption ? selectedOption.price * quantity + shippingCost : 0
  }

  const handlePayment = async () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con el pago.")
      return
    }

    if (selectedOption?.shipping && !mapValidated) {
      setShowMapError(true)
      return
    }

    if (!bookData) {
      alert("No se encontraron los datos del libro. Por favor, vuelve a crear tu libro.")
      return
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }

    if (selectedOption?.shipping && (!formData.address || !formData.city || !formData.province)) {
      alert("Por favor, completa la dirección de envío.")
      return
    }

    setIsLoading(true)

    try {
      // First, create the order
      const orderFormData = new FormData()

      // Add user ID
      orderFormData.append("userId", user.uid)

      // Add customer data
      orderFormData.append("customerName", formData.name)
      orderFormData.append("customerEmail", formData.email)
      orderFormData.append("customerPhone", formData.phone)

      // Add book data
      orderFormData.append("storyType", bookData.storyType || "futbol")
      orderFormData.append("childName", bookData.childName)
      orderFormData.append("team", JSON.stringify(bookData.team))
      orderFormData.append("coach", bookData.coach)
      orderFormData.append("trophy", bookData.trophy)
      orderFormData.append("players", JSON.stringify(bookData.players))

      // Add photo if exists
      if (bookData.photo) {
        orderFormData.append("photo", bookData.photo)
      }

      // Add product data
      orderFormData.append("productType", selectedOption.id)
      orderFormData.append("productTitle", selectedOption.title)
      orderFormData.append("productPrice", selectedOption.price.toString())
      orderFormData.append("quantity", quantity.toString())
      orderFormData.append("paymentTotal", getTotalPrice().toString())
      orderFormData.append("paymentMethod", "MercadoPago")

      // Add shipping if needed
      if (selectedOption.shipping) {
        orderFormData.append(
          "shipping",
          JSON.stringify({
            address: formData.address,
            addressNumber: formData.addressNumber,
            barrio: formData.barrio,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode,
            observations: formData.observations,
            cost: shippingCost,
            estimatedDays: shippingTime,
          }),
        )
      }

      // Add preOrderId to the order
      const preOrderId = localStorage.getItem("preOrderId")
      if (preOrderId) {
        orderFormData.append("preOrderId", preOrderId)
      }

      // Create order
      const orderResponse = await fetch("/api/orders/create", {
        method: "POST",
        body: orderFormData,
      })

      const orderResult = await orderResponse.json()

      // if (!orderResult.success) {
      //   throw new Error(orderResult.error || "Error al crear el pedido")
      // }

      // Create MercadoPago preference
      const preferenceData = {
        orderId: orderResult.orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: [
          {
            id: selectedOption.id,
            title: selectedOption.title,
            description: `Libro personalizado para ${bookData.childName}`,
            quantity: quantity,
            price: selectedOption.price,
          },
        ],
        shippingCost: selectedOption.shipping ? shippingCost : 0,
        shippingAddress: selectedOption.shipping
          ? {
              address: formData.address,
              addressNumber: formData.addressNumber,
              barrio: formData.barrio,
              city: formData.city,
              province: formData.province,
              postalCode: formData.postalCode,
            }
          : null,
      }

      const preferenceResponse = await fetch("/api/payment/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferenceData),
      })

      const preferenceResult = await preferenceResponse.json()

      if (!preferenceResult.success) {
        throw new Error(preferenceResult.error || "Error al crear la preferencia de pago")
      }

      // Clear localStorage
      localStorage.removeItem("bookData")

      // Redirect to MercadoPago
      // const paymentUrl =
      //   process.env.NODE_ENV === "production" ? preferenceResult.init_point : preferenceResult.sandbox_init_point

        const paymentUrl = preferenceResult.init_point

      window.location.href = paymentUrl
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar el pedido: " + (error instanceof Error ? error.message : "Error desconocido"))
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading if user is still being loaded
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Inicia sesión requerida</h2>
            <p className="text-gray-600 mb-4">Debes iniciar sesión para continuar con el checkout.</p>
            <Link href="/">
              <Button>Volver al inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!selectedOption) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Opción no encontrada</h2>
            <p className="text-gray-600 mb-4">No se pudo cargar la información del producto.</p>
            <Link href="/opciones">
              <Button>Volver a opciones</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!bookData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Datos del libro no encontrados</h2>
            <p className="text-gray-600 mb-4">Por favor, vuelve a crear tu libro personalizado.</p>
            <Link href="/crear">
              <Button>Crear libro</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/opciones" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a opciones
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>Información de contacto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      placeholder="+54 9 11 1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* User Info */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>Usuario autenticado</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Nombre:</strong> {user.displayName}
                  </div>
                  <div className="text-sm text-green-600">✅ Tu pedido quedará asociado a tu cuenta</div>
                </CardContent>
              </Card>

              {/* Book Summary */}
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>Tu libro personalizado</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <strong>Protagonista:</strong> {bookData.childName}
                  </div>
                  <div>
                    <strong>Equipo:</strong> {bookData.team?.name || "No seleccionado"}
                  </div>
                  <div>
                    <strong>Entrenador:</strong> {bookData.coach}
                  </div>
                  <div>
                    <strong>Trofeo:</strong> {bookData.trophy}
                  </div>
                  <div>
                    <strong>Jugadores:</strong> {bookData.players.join(", ")}
                  </div>
                  <div>
                    <strong>Foto:</strong> {bookData.photo ? "✅ Subida" : "❌ No subida"}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address - Only for physical books */}
              {selectedOption.shipping && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Dirección de envío</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="address">Calle *</Label>
                        <Input
                          id="address"
                          placeholder="Av. Corrientes"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="addressNumber">Número *</Label>
                        <Input
                          id="addressNumber"
                          placeholder="1234"
                          value={formData.addressNumber}
                          onChange={(e) => handleInputChange("addressNumber", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="barrio">Barrio</Label>
                      <Input
                        id="barrio"
                        placeholder="Palermo, Belgrano, etc."
                        value={formData.barrio}
                        onChange={(e) => handleInputChange("barrio", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          placeholder="Buenos Aires"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Código Postal *</Label>
                        <Input
                          id="postalCode"
                          placeholder="1000"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="province">Provincia *</Label>
                      <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROVINCES.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="observations">Observaciones</Label>
                      <Textarea
                        id="observations"
                        placeholder="Piso, departamento, referencias para el envío..."
                        value={formData.observations}
                        onChange={(e) => handleInputChange("observations", e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Google Maps Preview */}
                    {mapUrl && formData.address && formData.city && formData.province && (
                      <div className="mt-4">
                        <Label className="mb-2 block">Verificá tu dirección en el mapa</Label>
                        <div className="border rounded-lg overflow-hidden h-[200px]">
                          <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={mapUrl}
                            title="Mapa de dirección"
                          ></iframe>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-start space-x-2">
                            <input
                              type="checkbox"
                              id="mapValidation"
                              checked={mapValidated}
                              onChange={(e) => {
                                setMapValidated(e.target.checked)
                                if (e.target.checked) {
                                  setShowMapError(false)
                                }
                              }}
                              className="mt-1"
                            />
                            <label htmlFor="mapValidation" className="text-sm text-gray-700">
                              Confirmo que la ubicación mostrada en el mapa es correcta
                            </label>
                          </div>

                          {showMapError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <p className="text-sm text-red-700">
                                ⚠️ Por favor, verificá que la dirección en el mapa sea correcta. Si no es así, revisá los
                                datos de calle, número y barrio.
                              </p>
                            </div>
                          )}

                          <p className="text-xs text-gray-500">
                            Si la ubicación no es correcta, revisá los datos de calle, número y barrio
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedOption.title}</h3>
                      <p className="text-sm text-gray-600">{selectedOption.description}</p>

                      {/* Production Time */}
                      {selectedOption.productionTime && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-orange-600">{selectedOption.productionTime}</span>
                        </div>
                      )}
                    </div>
                    <span className="font-semibold">${selectedOption.price.toLocaleString()}</span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span>Cantidad:</span>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-100 text-lg font-semibold"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x text-center min-w-[3rem]">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(10, quantity + 1))}
                          className="px-3 py-1 hover:bg-gray-100 text-lg font-semibold"
                          disabled={quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {quantity > 1 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        📚 ¡Genial! Estás comprando {quantity} libros.{" "}
                        {quantity > 3 ? "¡Perfecto para regalar!" : "¡Excelente elección!"}
                      </p>
                    </div>
                  )}

                  {/* Shipping */}
                  {selectedOption.shipping && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-blue-500" />
                          <span>Envío</span>
                          {shippingTime && (
                            <Badge variant="outline" className="text-xs">
                              {shippingTime}
                            </Badge>
                          )}
                        </div>
                        <span className="font-semibold">
                          {shippingCost > 0 ? `$${shippingCost.toLocaleString()}` : "Calculando..."}
                        </span>
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-cyan-600">${getTotalPrice().toLocaleString()} ARS</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Button */}
              <Card>
                <CardContent className="p-6">
                  <Button
                    size="lg"
                    onClick={handlePayment}
                    disabled={isLoading || !formData.name || !formData.email || !formData.phone}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 py-6 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pagar con MercadoPago
                      </>
                    )}
                  </Button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>🔒 Pago 100% seguro con MercadoPago</p>
                    <p>Aceptamos todas las tarjetas y medios de pago</p>
                  </div>
                </CardContent>
              </Card>

              {/* MercadoPago Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Medios de pago disponibles
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Tarjetas de crédito y débito</li>
                    <li>• Transferencia bancaria</li>
                    <li>• Efectivo (Rapipago, Pago Fácil)</li>
                    <li>• Cuotas sin interés disponibles</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">ℹ️ Información importante</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {selectedOption.id === "pdf" && (
                      <>
                        <li>
                          • Recibirás {quantity} {quantity === 1 ? "link" : "links"} de descarga por email
                        </li>
                        <li>• Descarga disponible por 30 días</li>
                        <li>• Formato PDF listo para imprimir</li>
                        {quantity > 1 && <li>• Cada libro será único y personalizado</li>}
                      </>
                    )}
                    {selectedOption.shipping && (
                      <>
                        <li>• Producción: 5 días hábiles</li>
                        <li>• Envío: {shippingTime || "Se calcula según destino"}</li>
                        <li>• Seguimiento incluido</li>
                        {quantity > 1 && <li>• Todos los libros se envían juntos</li>}
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
