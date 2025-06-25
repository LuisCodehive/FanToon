"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import type { StoryType } from "@/lib/story-types"

const FOOTBALL_TROPHIES = [
  { id: "mundial", name: "Copa del Mundo", emoji: "🏆", description: "El torneo más importante del fútbol mundial" },
  {
    id: "liga-argentina",
    name: "Liga Profesional Argentina",
    emoji: "🇦🇷",
    description: "Primera División de Argentina",
  },
  { id: "liga-espana", name: "La Liga (España)", emoji: "🇪🇸", description: "Primera División de España" },
  {
    id: "premier-league",
    name: "Premier League (Inglaterra)",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    description: "Primera División de Inglaterra",
  },
  { id: "serie-a", name: "Serie A (Italia)", emoji: "🇮🇹", description: "Primera División de Italia" },
  { id: "champions", name: "Champions League", emoji: "🏆", description: "El mejor torneo de clubes de Europa" },
  { id: "libertadores", name: "Copa Libertadores", emoji: "🏆", description: "El torneo más prestigioso de América" },
  {
    id: "sudamericana",
    name: "Copa Sudamericana",
    emoji: "🏆",
    description: "Segundo torneo más importante de Sudamérica",
  },
  { id: "recopa", name: "Recopa Sudamericana", emoji: "🏆", description: "Enfrentamiento entre campeones" },
  { id: "mundial-clubes", name: "Mundial de Clubes", emoji: "🌍", description: "Torneo mundial de clubes" },
  { id: "europa-league", name: "Europa League", emoji: "🏆", description: "Segundo torneo europeo de clubes" },
  { id: "copa-america", name: "Copa América", emoji: "🏆", description: "Torneo de selecciones sudamericanas" },
  { id: "eurocopa", name: "Eurocopa", emoji: "🏆", description: "Campeonato europeo de selecciones" },
  { id: "custom", name: "Personalizado", emoji: "✨", description: "Creá tu propio torneo" },
]

const BASKETBALL_TROPHIES = [
  { id: "nba-championship", name: "Campeonato NBA", emoji: "🏆", description: "El trofeo más prestigioso del básquet" },
  { id: "nba-finals", name: "Finales NBA", emoji: "🏀", description: "Llegar a las Finales NBA" },
  {
    id: "conference-championship",
    name: "Campeonato de Conferencia",
    emoji: "🏆",
    description: "Ganar la Conferencia Este u Oeste",
  },
  { id: "playoffs", name: "Playoffs NBA", emoji: "🏀", description: "Clasificar a los Playoffs" },
  { id: "mvp", name: "MVP de la Temporada", emoji: "⭐", description: "Mejor Jugador de la Temporada" },
  { id: "finals-mvp", name: "MVP de las Finales", emoji: "🌟", description: "Mejor Jugador de las Finales" },
  { id: "rookie-year", name: "Rookie del Año", emoji: "🆕", description: "Mejor Jugador Novato" },
  { id: "all-star", name: "All-Star Game", emoji: "⭐", description: "Participar en el Juego de las Estrellas" },
  { id: "custom", name: "Personalizado", emoji: "✨", description: "Creá tu propio logro" },
]

const HOCKEY_TROPHIES = [
  { id: "olimpico", name: "Oro Olímpico", emoji: "🥇", description: "Medalla de oro en los Juegos Olímpicos" },
  { id: "mundial", name: "Mundial de Hockey", emoji: "🏆", description: "Campeonato Mundial de Hockey" },
  { id: "panamericanos", name: "Juegos Panamericanos", emoji: "🏆", description: "Oro en los Juegos Panamericanos" },
  { id: "champions-trophy", name: "Champions Trophy", emoji: "🏆", description: "Torneo de las mejores selecciones" },
  { id: "pro-league", name: "Pro League", emoji: "🏑", description: "Liga profesional de hockey" },
  { id: "metropolitano", name: "Torneo Metropolitano", emoji: "🏆", description: "Campeonato local argentino" },
  { id: "nacional", name: "Campeonato Nacional", emoji: "🇦🇷", description: "Torneo nacional de clubes" },
  { id: "sudamericano", name: "Sudamericano", emoji: "🏆", description: "Campeonato Sudamericano" },
  { id: "custom", name: "Personalizado", emoji: "✨", description: "Creá tu propio torneo" },
]

const RUGBY_TROPHIES = [
  {
    id: "mundial",
    name: "Copa del Mundo de Rugby",
    emoji: "🏆",
    description: "El torneo más importante del rugby mundial",
  },
  {
    id: "rugby-championship",
    name: "Rugby Championship",
    emoji: "🏆",
    description: "Torneo de las mejores selecciones del sur",
  },
  { id: "seis-naciones", name: "Torneo de las Seis Naciones", emoji: "🏆", description: "Prestigioso torneo europeo" },
  { id: "olimpico", name: "Oro Olímpico Rugby 7s", emoji: "🥇", description: "Medalla de oro en Rugby Seven" },
  { id: "panamericanos", name: "Juegos Panamericanos", emoji: "🏆", description: "Oro en los Juegos Panamericanos" },
  { id: "sudamericano", name: "Sudamericano de Rugby", emoji: "🏆", description: "Campeonato Sudamericano" },
  { id: "urba", name: "Torneo URBA", emoji: "🏉", description: "Unión de Rugby de Buenos Aires" },
  { id: "nacional-clubes", name: "Nacional de Clubes", emoji: "🇦🇷", description: "Campeonato Nacional de Clubes" },
  { id: "custom", name: "Personalizado", emoji: "✨", description: "Creá tu propio torneo" },
]

interface StepTrophyProps {
  storyType: StoryType
  value: string
  onChange: (trophy: string) => void
}

export default function StepTrophy({ storyType, value, onChange }: StepTrophyProps) {
  const [customTrophy, setCustomTrophy] = useState("")

  const getTrophies = () => {
    switch (storyType) {
      case "futbol":
        return FOOTBALL_TROPHIES
      case "basquet":
        return BASKETBALL_TROPHIES
      case "hockey":
        return HOCKEY_TROPHIES
      case "rugby":
        return RUGBY_TROPHIES
      default:
        return []
    }
  }

  const getConfig = () => {
    switch (storyType) {
      case "futbol":
        return {
          emoji: "🏆",
          title: "¿Qué torneo va a ganar?",
          description: "Elegí el campeonato que va a conquistar el chico/la chica",
        }
      case "basquet":
        return {
          emoji: "🏀",
          title: "¿Qué logro va a conseguir?",
          description: "Elegí el trofeo o reconocimiento que va a ganar en la NBA",
        }
      case "hockey":
        return {
          emoji: "🏑",
          title: "¿Qué torneo va a ganar?",
          description: "Elegí el campeonato que va a conquistar con Las Leonas",
        }
      case "rugby":
        return {
          emoji: "🏉",
          title: "¿Qué torneo va a ganar?",
          description: "Elegí el campeonato que va a conquistar con Los Pumas",
        }
      default:
        return {
          emoji: "🏆",
          title: "¿Qué trofeo va a ganar?",
          description: "Elegí el premio que va a conseguir",
        }
    }
  }

  const trophies = getTrophies()
  const config = getConfig()

  const handleTrophySelect = (trophyId: string) => {
    if (trophyId === "custom") {
      onChange(customTrophy || "Mi Trofeo Especial")
    } else {
      const trophy = trophies.find((t) => t.id === trophyId)
      onChange(trophy?.name || "")
    }
  }

  const isCustomSelected = !trophies.find((t) => t.name === value && t.id !== "custom")

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{config.emoji}</div>
        <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
        <p className="text-gray-600">{config.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trophies.map((trophy) => (
          <Card
            key={trophy.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              (trophy.id !== "custom" && value === trophy.name) || (trophy.id === "custom" && isCustomSelected)
                ? "border-sky-500 bg-sky-50"
                : "hover:border-sky-300"
            }`}
            onClick={() => handleTrophySelect(trophy.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{trophy.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{trophy.name}</h3>
                  <p className="text-sm text-gray-500">{trophy.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Trophy Input */}
      {isCustomSelected && (
        <div className="space-y-2">
          <Label htmlFor="customTrophy">Nombre del trofeo personalizado</Label>
          <Input
            id="customTrophy"
            placeholder="Ej: Copa de mi Barrio, Trofeo del Mejor Jugador..."
            value={customTrophy}
            onChange={(e) => {
              setCustomTrophy(e.target.value)
              onChange(e.target.value || "Mi Trofeo Especial")
            }}
            className="text-center"
            maxLength={30}
          />
          <p className="text-sm text-gray-500 text-center">Máximo 30 caracteres</p>
        </div>
      )}

      {value && (
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-yellow-800">
            🎉 ¡Excelente! El protagonista levantará <strong>{value}</strong>
          </p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        💡 Tip: El trofeo va a aparecer en varias páginas del libro como el gran objetivo
      </div>
    </div>
  )
}
