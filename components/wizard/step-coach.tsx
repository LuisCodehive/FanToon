"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { FEATURED_COACHES, searchCoaches, COACHES_BY_CATEGORY, type Coach } from "@/lib/coaches-database"

interface StepCoachProps {
  value: string
  onChange: (coach: string) => void
}

export default function StepCoach({ value, onChange }: StepCoachProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Coach[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<"featured" | "argentina" | "world">("featured")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setShowDropdown(term.length > 0)

    if (term.trim() === "") {
      setSearchResults([])
    } else {
      const results = searchCoaches(term)
      setSearchResults(results)
    }
  }

  const selectCoach = (coach: Coach) => {
    onChange(coach.name)
    setSearchTerm("")
    setShowDropdown(false)
    setSearchResults([])
  }

  const handleCustomCoach = () => {
    if (searchTerm.trim()) {
      onChange(searchTerm.trim())
      setSearchTerm("")
      setShowDropdown(false)
    }
  }

  const getDisplayCoaches = () => {
    switch (selectedCategory) {
      case "argentina":
        return COACHES_BY_CATEGORY.argentina.slice(0, 12)
      case "world":
        return COACHES_BY_CATEGORY.world.slice(0, 12)
      default:
        return FEATURED_COACHES
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">👨‍💼</div>
        <h3 className="text-xl font-semibold mb-2">¿Quién va a ser el técnico?</h3>
        <p className="text-gray-600">Elegí al DT que va a dirigir al equipo hacia la victoria</p>
      </div>

      {/* Search Input with Dropdown */}
      <div className="space-y-2 relative">
        <Label htmlFor="coach">Buscá tu entrenador favorito</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="coach"
            placeholder="Ej: Scaloni, Guardiola, Gallardo..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
            maxLength={30}
          />

          {/* Dropdown de sugerencias */}
          {showDropdown && searchResults.length > 0 && (
            <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto shadow-lg">
              <CardContent className="p-2">
                {searchResults.map((coach, index) => (
                  <div
                    key={`${coach.name}-${index}`}
                    className="p-3 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
                    onClick={() => selectCoach(coach)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">👨‍💼</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{coach.name}</h3>
                          <p className="text-sm text-gray-500">
                            {coach.country}
                            {coach.currentTeam && ` • ${coach.currentTeam}`}
                          </p>
                        </div>
                      </div>
                      {coach.achievements && coach.achievements.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {coach.achievements[0]}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Opción para entrenador personalizado */}
          {showDropdown && searchTerm && searchResults.length === 0 && (
            <Card className="absolute top-full left-0 right-0 z-10 mt-1 shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-gray-500 mb-3">No encontramos ese entrenador</p>
                <button onClick={handleCustomCoach} className="text-blue-600 hover:text-blue-700 font-medium">
                  Usar "{searchTerm}" como entrenador personalizado
                </button>
              </CardContent>
            </Card>
          )}
        </div>

        <p className="text-sm text-gray-500 text-center">Máximo 30 caracteres</p>
      </div>

      {/* Selected Coach Display */}
      {value && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">👨‍💼</span>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800">{value}</h3>
                  <p className="text-sm text-blue-600">Entrenador seleccionado</p>
                </div>
              </div>
              <button onClick={() => onChange("")} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Cambiar
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Tabs */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setSelectedCategory("featured")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === "featured" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Destacados
        </button>
        <button
          onClick={() => setSelectedCategory("argentina")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === "argentina" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🇦🇷 Argentina
        </button>
        <button
          onClick={() => setSelectedCategory("world")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === "world" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🌍 Mundial
        </button>
      </div>

      {/* Coaches Grid */}
      <div>
        <h4 className="font-semibold mb-3 text-center">
          {selectedCategory === "argentina" && "Entrenadores Argentinos"}
          {selectedCategory === "world" && "Entrenadores del Mundo"}
          {selectedCategory === "featured" && "Entrenadores Destacados"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getDisplayCoaches().map((coach, index) => (
            <Card
              key={`${selectedCategory}-${coach.name}-${index}`}
              className={`cursor-pointer transition-all hover:shadow-md ${
                value === coach.name ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"
              }`}
              onClick={() => selectCoach(coach)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm">👨‍💼</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{coach.name}</h3>
                      <p className="text-xs text-gray-500">
                        {coach.country}
                        {coach.currentTeam && ` • ${coach.currentTeam}`}
                      </p>
                    </div>
                  </div>
                  {coach.achievements && coach.achievements.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {coach.achievements[0]}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {value && (
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-blue-800">
            🎯 ¡Excelente elección! <strong>{value}</strong> va a dirigir al equipo hacia la gloria
          </p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        💡 Tip: Podés elegir cualquier técnico, incluso el DT de tu equipo del barrio
      </div>
    </div>
  )
}
