"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import type { StoryType } from "@/lib/story-types"

// Importar las diferentes bases de datos
import { searchTeams, type Team } from "@/lib/teams-database"
import { searchNBATeams, type BasketballTeam } from "@/lib/basketball-database"
import { searchHockeyTeams, type HockeyTeam } from "@/lib/hockey-database"
import { searchRugbyTeams, type RugbyTeam } from "@/lib/rugby-database"

type TeamType = Team | BasketballTeam | HockeyTeam | RugbyTeam

interface StepTeamDynamicProps {
  storyType: StoryType
  value: TeamType | null
  onChange: (team: TeamType) => void
}

export default function StepTeamDynamic({ storyType, value, onChange }: StepTeamDynamicProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<TeamType[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  const getStoryConfig = () => {
    switch (storyType) {
      case "futbol":
        return {
          emoji: "⚽",
          title: "¿Cuál es tu equipo favorito?",
          placeholder: "Ej: Argentina, Boca, Real Madrid...",
          searchFunction: searchTeams,
        }
      case "basquet":
        return {
          emoji: "🏀",
          title: "¿Cuál es tu equipo de NBA favorito?",
          placeholder: "Ej: Lakers, Warriors, Bulls...",
          searchFunction: searchNBATeams,
        }
      case "hockey":
        return {
          emoji: "🏑",
          title: "¿Cuál es tu equipo de hockey favorito?",
          placeholder: "Ej: San Isidro, Lomas, GEBA...",
          searchFunction: searchHockeyTeams,
        }
      case "rugby":
        return {
          emoji: "🏉",
          title: "¿Cuál es tu equipo de rugby favorito?",
          placeholder: "Ej: Alumni, CASI, Belgrano...",
          searchFunction: searchRugbyTeams,
        }
      default:
        return {
          emoji: "⚽",
          title: "¿Cuál es tu equipo favorito?",
          placeholder: "Escribe el nombre del equipo...",
          searchFunction: searchTeams,
        }
    }
  }

  const config = getStoryConfig()

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setShowDropdown(term.length > 0)

    if (term.trim() === "") {
      setSearchResults([])
    } else {
      const results = config.searchFunction(term)
      setSearchResults(results)
    }
  }

  const selectTeam = (team: TeamType) => {
    onChange(team)
    setSearchTerm("")
    setShowDropdown(false)
    setSearchResults([])
  }

  const handleCustomTeam = () => {
    if (searchTerm.trim()) {
      const customTeam: TeamType = {
        name: searchTerm.trim(),
        city: "Personalizado",
        ...(storyType === "futbol" && { country: "Personalizado" }),
        ...(storyType === "basquet" && { conference: "Eastern" as const, division: "Personalizado" }),
        ...(storyType === "hockey" && { league: "Personalizado" }),
        ...(storyType === "rugby" && { league: "Personalizado" }),
      } as TeamType
      selectTeam(customTeam)
    }
  }

  const getTeamDisplayInfo = (team: TeamType) => {
    if ("country" in team) {
      // Football team
      return `${team.country}${team.league ? ` • ${team.league}` : ""}`
    } else if ("conference" in team) {
      // Basketball team
      return `${team.city} • ${team.conference} Conference`
    } else if ("league" in team) {
      // Hockey or Rugby team
      return `${team.city} • ${team.league}`
    }
    return team.city || ""
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{config.emoji}</div>
        <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
        <p className="text-gray-600">Escribí el nombre de tu equipo favorito</p>
      </div>

      {/* Search Input with Dropdown */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={config.placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 text-center text-lg py-6"
          maxLength={50}
        />

        {/* Dropdown de sugerencias */}
        {showDropdown && searchResults.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto shadow-lg">
            <CardContent className="p-2">
              {searchResults.map((team, index) => (
                <div
                  key={`${team.name}-${index}`}
                  className="p-3 hover:bg-cyan-50 cursor-pointer rounded-md transition-colors flex items-center justify-between"
                  onClick={() => selectTeam(team)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                      <span className="text-cyan-600 text-sm">{config.emoji}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{team.name}</h3>
                      <p className="text-sm text-gray-500">{getTeamDisplayInfo(team)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Opción para equipo personalizado */}
        {showDropdown && searchTerm && searchResults.length === 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1 shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500 mb-3">No encontramos ese equipo</p>
              <Button variant="outline" onClick={handleCustomTeam} className="border-cyan-600 text-cyan-600">
                Usar "{searchTerm}" como equipo personalizado
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Team */}
      {value && (
        <Card className="border-cyan-200 bg-cyan-50 max-w-md mx-auto">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{config.emoji}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-800">{value.name}</h3>
                  <p className="text-sm text-cyan-600">{getTeamDisplayInfo(value)}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange(null as any)}
                className="text-cyan-600 border-cyan-600"
              >
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {value && (
        <div className="bg-cyan-50 p-4 rounded-lg text-center max-w-md mx-auto">
          <p className="text-cyan-800">
            🎉 ¡Excelente! <strong>{value.name}</strong> va a ser el equipo protagonista del libro
          </p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        💡 Tip: Podés elegir cualquier equipo del mundo, incluso los de tu barrio
      </div>
    </div>
  )
}
