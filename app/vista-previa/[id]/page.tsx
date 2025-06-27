"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, ShoppingCart, Loader2, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import SiteHeader from "@/components/site-header"
import { useAuth } from "@/lib/auth-context"
import type { PreOrder } from "@/lib/firebase/types"
import VisorPDF from "@/components/VisorPDF"

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [preOrder, setPreOrder] = useState<PreOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

   const intervalRef = useRef<NodeJS.Timer | null>(null)
   
  useEffect(() => {
    const fetchPreOrder = async () => {
      if (!params.id) return

      try {
        const response = await fetch(`/api/pre-orders/${params.id}`)
        const result = await response.json()

        if (result.success) {
          setPreOrder(result.preOrder)
          const po: PreOrder = result.preOrder

          console.log("po.status",po.status)
          if (po.status === "generate_ok" && intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }

        } else {
          setError(result.error || "Error al cargar la vista previa")
        }
      } catch (error) {
        console.error("Error fetching pre-order:", error)
        setError("Error al cargar la vista previa")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreOrder()

        // Iniciar polling cada 10s
    intervalRef.current = setInterval(fetchPreOrder, 10000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

  }, [params.id])

  const handleContinueToOptions = () => {
    // Store preOrderId for checkout
    localStorage.setItem("preOrderId", params.id as string)
    router.push("/opciones")
  }

  const handleEditBook = () => {
    // Store current data and redirect to edit
    if (preOrder) {
      localStorage.setItem("editPreOrderId", preOrder.id)
      localStorage.setItem(
        "bookData",
        JSON.stringify({
          storyType: preOrder.bookDetails.storyType,
          team: preOrder.bookDetails.team,
          childName: preOrder.bookDetails.childName,
          coach: preOrder.bookDetails.coach,
          trophy: preOrder.bookDetails.trophy,
          players: preOrder.bookDetails.players,
          photo: null, // Photo is already uploaded
        }),
      )
      router.push("/crear")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Cargando vista previa...</p>
        </div>
      </div>
    )
  }

  if (error || !preOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/crear">
              <Button>Crear nuevo libro</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if user owns this pre-order
  if (user && preOrder.userId !== user.uid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Acceso denegado</h2>
            <p className="text-gray-600 mb-4">No tienes permiso para ver esta vista previa.</p>
            <Link href="/">
              <Button>Volver al inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/crear" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a editar
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>Vista Previa de tu Libro</span>
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {preOrder.status === "preview_ready" ? "Listo" : "Generando..."}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {preOrder.status == "generate_ok" ? (
                    <div className="border rounded-lg overflow-hidden">
                      <VisorPDF fileUrl={"https://toonfan.s3.us-east-1.amazonaws.com/"+params.id+".pdf"} />
                      {/* <iframe src={preOrder.previewUrl} className="w-full h-[600px]" title="Vista previa del libro" /> */}
                    </div>
                    
                  ) : (
                    <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                        <p>Generando vista previa...</p>
                        <p>Por favor, no refresques la página mientras se genera el Libro.</p>
                        <p>Esto puede demorar 5 minutos o más.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details & Actions */}
            <div className="space-y-6">
              {/* Book Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del Libro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong>Protagonista:</strong>
                    <p className="text-lg text-purple-600 font-semibold">{preOrder.bookDetails.childName}</p>
                  </div>
                  <div>
                    <strong>Equipo:</strong>
                    <p>{preOrder.bookDetails.team?.name || "No seleccionado"}</p>
                  </div>
                  <div>
                    <strong>Entrenador:</strong>
                    <p>{preOrder.bookDetails.coach}</p>
                  </div>
                  <div>
                    <strong>Trofeo:</strong>
                    <p>{preOrder.bookDetails.trophy}</p>
                  </div>
                  <div>
                    <strong>Jugadores:</strong>
                    <p>{preOrder.bookDetails.players.join(", ")}</p>
                  </div>
                  <div>
                    <strong>Foto:</strong>
                    <p>{preOrder.photo ? "✅ Incluida" : "❌ Sin foto"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>¿Te gusta como se ve?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleContinueToOptions}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    ¡Me encanta! Continuar
                  </Button>

                  {/* <Button onClick={handleEditBook} variant="outline" className="w-full" size="lg">
                    Editar detalles
                  </Button> */}

                  {/* <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="w-4 h-4 mr-1" />
                      Descargar
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Share2 className="w-4 h-4 mr-1" />
                      Compartir
                    </Button>
                  </div> */}
                </CardContent>
              </Card>

              {/* Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Información</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Esta es una vista previa simplificada</li>
                    <li>• El libro final tendrá más páginas</li>
                    <li>• Ilustraciones profesionales incluidas</li>
                    <li>• Puedes editar los detalles antes de comprar</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pricing Preview */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💰 Opciones disponibles</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• PDF Digital: $2.999</li>
                    <li>• Tapa Blanda: $13.999</li>
                    <li>• Tapa Dura: $24.999</li>
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
