"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import StepStoryType from "@/components/wizard/step-story-type"
import StepTeamDynamic from "@/components/wizard/step-team-dynamic"
import StepName from "@/components/wizard/step-name"
import StepPhoto from "@/components/wizard/step-photo"
import StepTrophy from "@/components/wizard/step-trophy"
import StepPlayersDynamic from "@/components/wizard/step-players-dynamic"
import StepCoach from "@/components/wizard/step-coach"
import SiteHeader from "@/components/site-header"
import { type StoryType, getStorySteps } from "@/lib/story-types"
import AuthGuard from "@/components/auth/auth-guard"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export interface FormData {
  storyType: StoryType | null
  team: any | null
  childName: string
  photo: File | null
  trophy: string
  players: string[]
  coach: string
}

export default function CreateBookPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    storyType: null,
    team: null,
    childName: "",
    photo: null,
    trophy: "",
    players: [],
    coach: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Obtener los pasos dinámicamente según el tipo de historia
  const getSteps = () => {
    if (!formData.storyType) {
      return [{ id: 0, title: "Tipo de historia", description: "Elige tu aventura" }]
    }

    const storySteps = getStorySteps(formData.storyType)
    const baseSteps = [{ id: 0, title: "Tipo de historia", description: "Elige tu aventura" }]

    const stepMap: Record<string, any> = {
      team: { title: "Equipo favorito", description: "Elige el equipo" },
      name: { title: "Nombre del protagonista", description: "¿Cómo se llama?" },
      photo: { title: "Foto del protagonista", description: "Sube una foto" },
      trophy: { title: "Trofeo a levantar", description: "¿Qué trofeo ganará?" },
      players: { title: "Jugadores favoritos", description: "Elige hasta 3 jugadores" },
      coach: { title: "Entrenador", description: "¿Quién será el DT?" },
    }

    const dynamicSteps = storySteps.map((step, index) => ({
      id: index + 1,
      ...stepMap[step],
    }))

    return [...baseSteps, ...dynamicSteps]
  }

  const steps = getSteps()

  const nextStep = () => {
    console.log("next step",currentStep)
    

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }

    if(formData.storyType!= "futbol" && currentStep == 2){
      
      handleFinish()
    
    }

  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.storyType !== null
    }

    if (!formData.storyType) return false

    const storySteps = getStorySteps(formData.storyType)
    const currentStepName = storySteps[currentStep - 1]

    switch (currentStepName) {
      case "team":
        return formData.team !== null
      case "name":
        return formData.childName.trim() !== ""
      case "photo":
        return formData.photo !== null
      case "trophy":
        return formData.trophy !== ""
      case "players":
        return formData.players.length > 0
      case "coach":
        return formData.coach.trim() !== ""
      default:
        return false
    }
  }

  const handleFinish = async () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar.")
      return
    }

    setIsLoading(true)

    try {
      // Create FormData for the pre-order
      const preOrderFormData = new FormData()

      console.log("user",user)

      preOrderFormData.append("userId", user.uid)
      preOrderFormData.append("storyType", formData.storyType || "futbol")
      preOrderFormData.append("childName", formData.childName || user.displayName || "Nombre del niño")
      preOrderFormData.append("team", JSON.stringify(formData.team))
      preOrderFormData.append("coach", formData.coach)
      preOrderFormData.append("trophy", formData.trophy)
      preOrderFormData.append("players", JSON.stringify(formData.players))

      if (formData.photo) {
        preOrderFormData.append("photo", formData.photo)
      }

      // Create pre-order
      const response = await fetch("/api/pre-orders/create", {
        method: "POST",
        body: preOrderFormData,
      })

      const result = await response.json()

      if (result.success) {
        // Clear localStorage
        localStorage.removeItem("bookData")

        // Redirect to preview
        window.location.href = `/vista-previa/${result.preOrderId}`
      } else {
        throw new Error(result.error || "Error al crear la vista previa")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al crear la vista previa: " + (error instanceof Error ? error.message : "Error desconocido"))
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <StepStoryType value={formData.storyType} onChange={(storyType) => updateFormData("storyType", storyType)} />
      )
    }

    if (!formData.storyType) return null

    const storySteps = getStorySteps(formData.storyType)
    const currentStepName = storySteps[currentStep - 1]

    switch (currentStepName) {
      case "team":
        return (
          <StepTeamDynamic
            storyType={formData.storyType}
            value={formData.team}
            onChange={(team) => updateFormData("team", team)}
          />
        )
      case "name":
        return <StepName value={formData.childName} onChange={(name) => updateFormData("childName", name)} />
      case "photo":
        return <StepPhoto value={formData.photo} onChange={(photo) => updateFormData("photo", photo)} />
      case "trophy":
        return (
          <StepTrophy
            storyType={formData.storyType}
            value={formData.trophy}
            onChange={(trophy) => updateFormData("trophy", trophy)}
          />
        )
      case "players":
        return (
          <StepPlayersDynamic
            storyType={formData.storyType}
            value={formData.players}
            onChange={(players) => updateFormData("players", players)}
          />
        )
      case "coach":
        return <StepCoach value={formData.coach} onChange={(coach) => updateFormData("coach", coach)} />
      default:
        return null
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50">
        {/* Header */}
        <SiteHeader />

        <div className="container mx-auto px-4 py-8">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${currentStep >= index ? "bg-gradient-to-r from-orange-500 to-blue-500 text-white" : "bg-gray-200 text-gray-600"}
                `}
                  >
                    {step.id + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                    h-1 w-full mx-2
                    ${currentStep > index ? "bg-gradient-to-r from-orange-500 to-blue-500" : "bg-gray-200"}
                  `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-gray-900">Creá tu libro personalizado</h1>
              <span className="text-sm text-gray-600">
                Paso {currentStep + 1} de {steps.length} • {Math.round(progress)}% completado
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">{steps[currentStep]?.title}</CardTitle>
              <p className="text-center text-gray-600">{steps[currentStep]?.description}</p>
            </CardHeader>
            <CardContent>{renderStep()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="max-w-2xl mx-auto mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            <Button
              onClick={currentStep===6? handleFinish:nextStep}
              disabled={!canProceed() || isLoading}
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creando vista previa...</span>
                </>
              ) : (
                <>
                  <span>Ver vista previa</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="max-w-2xl mx-auto mt-4 text-center text-sm text-gray-500">
            ¿Necesitás una mano?{" "}
            <Link href="/contacto" className="text-orange-500 hover:underline">
              Contactanos
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
