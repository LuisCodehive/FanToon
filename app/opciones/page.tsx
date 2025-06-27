"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Truck, Clock } from "lucide-react"
import Image from "next/image"
import SiteHeader from "@/components/site-header"

interface Option {
  id: string
  title: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  badge?: string
  productionTime?: string
  shipping?: boolean
}

const OPTIONS: Option[] = [
  {
    id: "pdf",
    title: "Libro Digital PDF",
    price: 5999,
    description: "Descarga inmediata del libro personalizado",
    features: [
      "11 páginas personalizadas",
      "Descarga inmediata",
      "Calidad de impresión profesional",
      "Formato A4",
      "Sin límite de impresiones",
    ],
    badge: "Más Popular",
  },
  // {
  //   id: "tapa-blanda",
  //   title: "Libro Impreso Tapa Blanda",
  //   price: 13999,
  //   description: "Libro físico con impresión profesional",
  //   features: [
  //     "11 páginas personalizadas",
  //     "Papel ilustración 150gr",
  //     "Tapa blanda plastificada",
  //     "Formato A4 (21x29.7cm)",
  //     "Anillado espiral",
  //     "Incluye crayones de colores",
  //   ],
  //   productionTime: "5 días de producción",
  //   shipping: true,
  // },
  // {
  //   id: "tapa-dura",
  //   title: "Libro Impreso Tapa Dura",
  //   price: 24999,
  //   description: "Edición premium con tapa dura",
  //   features: [
  //     "11 páginas personalizadas",
  //     "Papel ilustración 200gr",
  //     "Tapa dura con laminado UV",
  //     "Formato A4 (21x29.7cm)",
  //     "Encuadernación cosida",
  //     "Incluye crayones de colores",
  //     "Caja de regalo incluida",
  //   ],
  //   badge: "Premium",
  //   productionTime: "5 días de producción",
  //   shipping: true,
  // },
]

export default function OptionsPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleContinue = () => {
    if (selectedOption) {
      window.location.href = `/checkout?option=${selectedOption}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Tu libro está listo!</h1>
          <p className="text-xl text-gray-600 mb-6">Elegí cómo querés recibir tu libro personalizado</p>

          {/* Book Preview */}
          <div className="max-w-md mx-auto mb-8">
            <Card className="transform hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=300&width=200"
                  alt="Vista previa del libro"
                  width={200}
                  height={300}
                  className="mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-4">Vista previa de tu libro personalizado</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {OPTIONS.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-xl relative ${
                selectedOption === option.id
                  ? "border-cyan-500 bg-cyan-50 shadow-lg scale-105"
                  : "hover:border-cyan-300"
              }`}
              onClick={() => handleSelectOption(option.id)}
            >
              {option.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                  {option.badge}
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-cyan-600">
                    ${option.price.toLocaleString()}
                    <span className="text-sm text-gray-500 ml-1">ARS</span>
                  </div>
                  {option.originalPrice && (
                    <div className="text-lg text-gray-400 line-through">${option.originalPrice.toLocaleString()}</div>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Production Time */}
                {option.productionTime && (
                  <div className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                    <Clock className="w-4 h-4" />
                    <span>{option.productionTime}</span>
                  </div>
                )}

                {/* Shipping */}
                {option.shipping && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    <Truck className="w-4 h-4" />
                    <span>+ Costo de envío (se calcula en checkout)</span>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Selection Indicator */}
                {selectedOption === option.id && (
                  <div className="bg-cyan-600 text-white p-3 rounded-lg text-center font-semibold">
                    ✓ Opción seleccionada
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedOption}
            className="bg-cyan-600 hover:bg-cyan-700 px-12 py-6 text-xl"
          >
            Continuar con la compra
          </Button>

          {!selectedOption && <p className="text-sm text-gray-500 mt-2">Seleccioná una opción para continuar</p>}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
          <Card className="text-center p-6">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Pago 100% Seguro</h3>
            <p className="text-sm text-gray-600">Procesado por MercadoPago con máxima seguridad</p>
          </Card>

          <Card className="text-center p-6">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-semibold mb-2">Calidad Garantizada</h3>
            <p className="text-sm text-gray-600">Impresión profesional con materiales premium</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
