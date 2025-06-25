"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import type { StoryType } from "@/lib/story-types"

// Importar las diferentes bases de datos
import { searchPlayers, FEATURED_PLAYERS, type Player } from "@/lib/players-database"
import { searchNBAPlayers, FEATURED_NBA_PLAYERS, type BasketballPlayer } from "@/lib/basketball-database"
import { searchHockeyPlayers, FEATURED_HOCKEY_PLAYERS, type HockeyPlayer } from "@/lib/hockey-database"
import { searchRugbyPlayers, FEATURED_RUGBY_PLAYERS, type RugbyPlayer } from "@/lib/rugby-database"

type PlayerType = Player | BasketballPlayer | HockeyPlayer | RugbyPlayer

interface StepPlayersDynamicProps {
  storyType: StoryType
  value: string[]
  onChange: (players: string[]) => void
}

export default function StepPlayersDynamic({ storyType, value, onChange }: StepPlayersDynamicProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<PlayerType[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  const getStoryConfig = () => {
    switch (storyType) {
      case "futbol":
        return {
          emoji: "⚽",
          title: "Elegí los jugadores favoritos",
          description: "Seleccioná hasta 3 jugadores que van a aparecer en el libro",
          placeholder: "Buscá jugador (ej: Messi, Cristiano, Di María...)",
          searchFunction: searchPlayers,
          featuredPlayers: FEATURED_PLAYERS,
          getPlayerInfo: (player: Player) => `${player.country} • ${player.currentTeam} • ${player.position}`,
        }
      case "basquet":
        return {
          emoji: "🏀",
          title: "Elegí los jugadores de NBA favoritos",
          description: "Seleccioná hasta 3 jugadores que van a aparecer en el libro",
          placeholder: "Buscá jugador (ej: LeBron, Curry, Durant...)",
          searchFunction: searchNBAPlayers,
          featuredPlayers: FEATURED_NBA_PLAYERS,
          getPlayerInfo: (player: BasketballPlayer) => `${player.nationality} • ${player.team} • ${player.position}`,
        }
      case "hockey":
        return {
          emoji: "🏑",
          title: "Elegí las jugadoras favoritas",
          description: "Seleccioná hasta 3 jugadoras que van a aparecer en el libro",
          placeholder: "Buscá jugadora (ej: Lucina, Victoria, Agustina...)",
          searchFunction: searchHockeyPlayers,
          featuredPlayers: FEATURED_HOCKEY_PLAYERS,
          getPlayerInfo: (player: HockeyPlayer) => `${player.nationality} • ${player.team} • ${player.position}`,
        }
      case "rugby":
        return {
          emoji: "🏉",
          title: "Elegí los jugadores favoritos",
          description: "Seleccioná hasta 3 jugadores que van a aparecer en el libro",
          placeholder: "Buscá jugador (ej: Montoya, Matera, Kremer...)",
          searchFunction: searchRugbyPlayers,
          featuredPlayers: FEATURED_RUGBY_PLAYERS,
          getPlayerInfo: (player: RugbyPlayer) => `${player.nationality} • ${player.currentTeam} • ${player.position}`,
        }
      default:
        return {
          emoji: "⚽",
          title: "Elegí los jugadores favoritos",
          description: "Seleccioná hasta 3 jugadores que van a aparecer en el libro",
          placeholder: "Buscá jugador...",
          searchFunction: searchPlayers,
          featuredPlayers: FEATURED_PLAYERS,
          getPlayerInfo: (player: any) =>
            `${player.country || player.nationality} • ${player.currentTeam || player.team}`,
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

  const addPlayer = (player: PlayerType) => {
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{config.emoji}</div>
        <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
        <p className="text-gray-600">{config.description}</p>
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
              placeholder={config.placeholder}
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
                            <span className="text-cyan-600 text-sm">{config.emoji}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{player.name}</h3>
                            <p className="text-sm text-gray-500">{config.getPlayerInfo(player)}</p>
                          </div>
                        </div>
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

      {/* Featured Players Grid */}
      {value.length < 3 && (
        <div>
          <h4 className="font-semibold mb-3 text-center">Jugadores Destacados</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {config.featuredPlayers.map((player, index) => (
              <Card
                key={`featured-${player.name}-${index}`}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  value.includes(player.name)
                    ? "border-cyan-500 bg-cyan-50 opacity-50 cursor-not-allowed"
                    : "hover:border-cyan-300"
                }`}
                onClick={() => !value.includes(player.name) && addPlayer(player)}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 text-sm">{config.emoji}</span>
                  </div>
                  <h3 className="font-medium text-sm">{player.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{config.getPlayerInfo(player)}</p>
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
