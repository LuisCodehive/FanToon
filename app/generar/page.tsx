"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/components/site-header"

const GENERATION_STEPS = [
  "Analizando los datos del protagonista...",
  "Creando la historia personalizada...",
  "Generando ilustraciones con IA...",
  "Diseñando las páginas del libro...",
  "Compilando el PDF final...",
  "¡Tu libro está listo!",
]

export default function GenerateBookPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          if (newProgress >= 100) {
            setIsGenerating(false)
            setCurrentStep(GENERATION_STEPS.length - 1)
            clearInterval(interval)
            return 100
          }

          // Update step based on progress
          const stepIndex = Math.floor((newProgress / 100) * (GENERATION_STEPS.length - 1))
          setCurrentStep(stepIndex)

          return newProgress
        })
      }, 800)

      return () => clearInterval(interval)
    }
  }, [isGenerating])

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Generando tu libro personalizado</CardTitle>
              <p className="text-gray-600">Estamos creando una experiencia única para el protagonista</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-8xl mb-4">🎨</div>
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progreso</span>
                  <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-green-700">{GENERATION_STEPS[currentStep]}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">¿Sabías que...?</h4>
                <p className="text-sm text-blue-700">
                  Cada libro es único y se genera específicamente para tu protagonista. Estamos creando 11 páginas con
                  ilustraciones originales que incluyen los jugadores y el equipo que seleccionaste.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Tu libro ya está listo!</h1>
          <p className="text-xl text-gray-600">Creamos un libro único de 11 páginas para colorear</p>
        </div>

        {/* Book Preview */}
        <div className="max-w-md mx-auto mb-8">
          <Card className="border-cyan-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-center">Tu libro personalizado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex justify-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Portada del libro"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-md"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 rounded-lg"></div>
                <div className="absolute bottom-4 left-0 w-full text-center text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">La aventura futbolera</h3>
                  <p className="text-sm drop-shadow-lg">¡Un libro único para colorear!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="border-cyan-200 bg-cyan-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-cyan-800 mb-2">¡Tu libro está listo!</h3>
              <p className="text-sm text-cyan-600 mb-4">Ahora elegí cómo querés recibirlo</p>

              <Link href="/opciones">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 py-6 text-lg">Ver opciones de compra</Button>
              </Link>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            📱 PDF Digital • 📚 Tapa Blanda • 🏆 Tapa Dura Premium
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Lo que incluye tu libro</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">📖</div>
                <h3 className="font-semibold mb-2">11 Páginas únicas</h3>
                <p className="text-sm text-gray-600">Cada página cuenta una parte diferente de la historia</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-semibold mb-2">Ilustraciones originales</h3>
                <p className="text-sm text-gray-600">Creadas específicamente para tu protagonista</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-semibold mb-2">PDF de alta calidad</h3>
                <p className="text-sm text-gray-600">Listo para imprimir en casa o en imprenta</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline">Crear otro libro</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
