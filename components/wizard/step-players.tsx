"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { FEATURED_PLAYERS, searchPlayers, PLAYERS_BY_CATEGORY, type Player } from "@/lib/players-database"

interface StepPlayersProps {
  value: string[]
  onChange: (players: string[]) => void
}

export default function StepPlayers({ value, onChange }: StepPlayersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Player[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<"featured" | "argentina" | "brasil" | "europe" | "legends">(
    "featured",
  )

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setShowDropdown(term.length > 0)

    if (term.trim() === "") {
      setSearchResults([])
    } else {
      const results = searchPlayers(term)
      setSearchResults(results)
    }
  }

  const addPlayer = (player: Player) => {
    if (!value.includes(player.name) && value.length < 3) {
      onChange([...value, player.name])
      setSearchTerm("")
      setShowDropdown(false)
    }
  }

  const removePlayer = (playerName: string) => {
    onChange(value.filter((p) => p !== playerName))
  }

  const addCustomPlayer = () => {
    if (searchTerm.trim() && !value.includes(searchTerm.trim()) && value.length < 3) {
      onChange([...value, searchTerm.trim()])
      setSearchTerm("")
      setShowDropdown(false)
    }
  }

  const getDisplayPlayers = () => {
    switch (selectedCategory) {
      case "argentina":
        return PLAYERS_BY_CATEGORY.argentina.slice(0, 12)
      case "brasil":
        return PLAYERS_BY_CATEGORY.brasil.slice(0, 12)
      case "europe":
        return PLAYERS_BY_CATEGORY.europe.slice(0, 12)
      case "legends":
        return PLAYERS_BY_CATEGORY.legends.slice(0, 12)
      default:
        return FEATURED_PLAYERS
    }
  }

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case "argentina":
        return "Liga Profesional Argentina"
      case "brasil":
        return "Brasileirão"
      case "europe":
        return "Ligas Europeas"
      case "legends":
        return "Leyendas del Fútbol"
      default:
        return "Jugadores Destacados"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">⚽</div>
        <h3 className="text-xl font-semibold mb-2">Elegí los jugadores favoritos</h3>
        <p className="text-gray-600">Seleccioná hasta 3 jugadores que van a aparecer en el libro</p>
      </div>

      {/* Selected Players */}
      {value.length > 0 && (
        <Card className="border-sky-200 bg-sky-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sky-800 mb-3">Jugadores seleccionados ({value.length}/3)</h4>
            <div className="flex flex-wrap gap-2">
              {value.map((player, index) => (
                <Badge key={index} variant="secondary" className="bg-sky-600 text-white hover:bg-sky-700 px-3 py-1">
                  {player}
                  <button onClick={() => removePlayer(player)} className="ml-2 hover:text-red-200">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Input */}
      {value.length < 3 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscá jugador (ej: Messi, Cristiano, Di María...)"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {/* Dropdown de sugerencias */}
            {showDropdown && searchResults.length > 0 && (
              <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto shadow-lg">
                <CardContent className="p-2">
                  {searchResults.map((player, index) => (
                    <div
                      key={`${player.name}-${index}`}
                      className="p-3 hover:bg-cyan-50 cursor-pointer rounded-md transition-colors"
                      onClick={() => addPlayer(player)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                            <span className="text-cyan-600 text-sm">⚽</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{player.name}</h3>
                            <p className="text-sm text-gray-500">
                              {player.country} • {player.currentTeam} • {player.position}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {player.league}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Opción para jugador personalizado */}
            {showDropdown && searchTerm && searchResults.length === 0 && (
              <Card className="absolute top-full left-0 right-0 z-10 mt-1 shadow-lg">
                <CardContent className="p-4 text-center">
                  <p className="text-gray-500 mb-3">No encontramos ese jugador</p>
                  <Button variant="outline" onClick={addCustomPlayer} className="border-cyan-600 text-cyan-600">
                    Agregar "{searchTerm}" como jugador personalizado
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      {value.length < 3 && (
        <div className="flex justify-center space-x-1 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory("featured")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === "featured" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            ⭐ Destacados
          </button>
          <button
            onClick={() => setSelectedCategory("argentina")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === "argentina"
                ? "bg-cyan-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🇦🇷 Argentina
          </button>
          <button
            onClick={() => setSelectedCategory("brasil")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === "brasil" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🇧🇷 Brasil
          </button>
          <button
            onClick={() => setSelectedCategory("europe")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === "europe" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🇪🇺 Europa
          </button>
          <button
            onClick={() => setSelectedCategory("legends")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === "legends" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🌟 Leyendas
          </button>
        </div>
      )}

      {/* Players Grid */}
      {value.length < 3 && (
        <div>
          <h4 className="font-semibold mb-3 text-center">{getCategoryTitle()}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getDisplayPlayers().map((player, index) => (
              <Card
                key={`${selectedCategory}-${player.name}-${index}`}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  value.includes(player.name)
                    ? "border-cyan-500 bg-cyan-50 opacity-50 cursor-not-allowed"
                    : "hover:border-cyan-300"
                }`}
                onClick={() => !value.includes(player.name) && addPlayer(player)}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 text-sm">⚽</span>
                  </div>
                  <h3 className="font-medium text-sm">{player.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {player.country} • {player.position}
                  </p>
                  <p className="text-xs text-gray-400">{player.currentTeam}</p>
                  {value.includes(player.name) && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Seleccionado
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {value.length === 3 && (
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-yellow-800">🎉 ¡Bárbaro! Elegiste 3 jugadores increíbles</p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        💡 Tip: Podés elegir cualquier jugador, incluso de equipos locales o juveniles
      </div>
    </div>
  )
}
