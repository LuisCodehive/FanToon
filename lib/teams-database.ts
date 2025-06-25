export interface Team {
  name: string
  country: string
  league?: string
}

// Función para normalizar texto (remover acentos y convertir a minúsculas)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-z0-9\s]/g, "") // Remover caracteres especiales excepto espacios
    .trim()
}

// Equipos que se muestran en la página principal
export const FEATURED_TEAMS: Team[] = [
  // Argentina
  { name: "River Plate", country: "Argentina", league: "Liga Profesional" },
  { name: "Boca Juniors", country: "Argentina", league: "Liga Profesional" },
  { name: "Racing Club", country: "Argentina", league: "Liga Profesional" },
  { name: "Independiente", country: "Argentina", league: "Liga Profesional" },
  { name: "San Lorenzo", country: "Argentina", league: "Liga Profesional" },
  { name: "Huracán", country: "Argentina", league: "Liga Profesional" },
  { name: "Vélez Sarsfield", country: "Argentina", league: "Liga Profesional" },

  // España
  { name: "FC Barcelona", country: "España", league: "La Liga" },
  { name: "Real Madrid", country: "España", league: "La Liga" },

  // Inglaterra
  { name: "Manchester United", country: "Inglaterra", league: "Premier League" },
  { name: "Manchester City", country: "Inglaterra", league: "Premier League" },
  { name: "Liverpool", country: "Inglaterra", league: "Premier League" },

  // Italia
  { name: "Inter Milan", country: "Italia", league: "Serie A" },
  { name: "AC Milan", country: "Italia", league: "Serie A" },
  { name: "Juventus", country: "Italia", league: "Serie A" },
]

// Base de datos completa para el buscador
export const ALL_TEAMS: Team[] = [
  // Argentina - Top 30
  { name: "River Plate", country: "Argentina", league: "Liga Profesional" },
  { name: "Boca Juniors", country: "Argentina", league: "Liga Profesional" },
  { name: "Racing Club", country: "Argentina", league: "Liga Profesional" },
  { name: "Independiente", country: "Argentina", league: "Liga Profesional" },
  { name: "San Lorenzo", country: "Argentina", league: "Liga Profesional" },
  { name: "Huracán", country: "Argentina", league: "Liga Profesional" },
  { name: "Vélez Sarsfield", country: "Argentina", league: "Liga Profesional" },
  { name: "Estudiantes", country: "Argentina", league: "Liga Profesional" },
  { name: "Gimnasia La Plata", country: "Argentina", league: "Liga Profesional" },
  { name: "Lanús", country: "Argentina", league: "Liga Profesional" },
  { name: "Banfield", country: "Argentina", league: "Liga Profesional" },
  { name: "Defensa y Justicia", country: "Argentina", league: "Liga Profesional" },
  { name: "Talleres", country: "Argentina", league: "Liga Profesional" },
  { name: "Colón", country: "Argentina", league: "Liga Profesional" },
  { name: "Unión", country: "Argentina", league: "Liga Profesional" },
  { name: "Argentinos Juniors", country: "Argentina", league: "Liga Profesional" },
  { name: "Tigre", country: "Argentina", league: "Liga Profesional" },
  { name: "Platense", country: "Argentina", league: "Liga Profesional" },
  { name: "Arsenal", country: "Argentina", league: "Liga Profesional" },
  { name: "Godoy Cruz", country: "Argentina", league: "Liga Profesional" },
  { name: "Rosario Central", country: "Argentina", league: "Liga Profesional" },
  { name: "Newell's Old Boys", country: "Argentina", league: "Liga Profesional" },
  { name: "Central Córdoba", country: "Argentina", league: "Liga Profesional" },
  { name: "Sarmiento", country: "Argentina", league: "Liga Profesional" },
  { name: "Aldosivi", country: "Argentina", league: "Primera Nacional" },
  { name: "Instituto", country: "Argentina", league: "Liga Profesional" },
  { name: "Belgrano", country: "Argentina", league: "Liga Profesional" },
  { name: "Barracas Central", country: "Argentina", league: "Liga Profesional" },
  { name: "Atlético Tucumán", country: "Argentina", league: "Liga Profesional" },
  { name: "Riestra", country: "Argentina", league: "Liga Profesional" },

  // Brasil - Top 30
  { name: "Flamengo", country: "Brasil", league: "Brasileirão" },
  { name: "Palmeiras", country: "Brasil", league: "Brasileirão" },
  { name: "Corinthians", country: "Brasil", league: "Brasileirão" },
  { name: "São Paulo", country: "Brasil", league: "Brasileirão" },
  { name: "Santos", country: "Brasil", league: "Brasileirão" },
  { name: "Fluminense", country: "Brasil", league: "Brasileirão" },
  { name: "Botafogo", country: "Brasil", league: "Brasileirão" },
  { name: "Vasco da Gama", country: "Brasil", league: "Brasileirão" },
  { name: "Grêmio", country: "Brasil", league: "Brasileirão" },
  { name: "Internacional", country: "Brasil", league: "Brasileirão" },
  { name: "Atlético Mineiro", country: "Brasil", league: "Brasileirão" },
  { name: "Cruzeiro", country: "Brasil", league: "Brasileirão" },
  { name: "Bahia", country: "Brasil", league: "Brasileirão" },
  { name: "Vitória", country: "Brasil", league: "Brasileirão" },
  { name: "Fortaleza", country: "Brasil", league: "Brasileirão" },
  { name: "Ceará", country: "Brasil", league: "Brasileirão" },
  { name: "Sport Recife", country: "Brasil", league: "Brasileirão" },
  { name: "Náutico", country: "Brasil", league: "Serie B" },
  { name: "Athletico Paranaense", country: "Brasil", league: "Brasileirão" },
  { name: "Coritiba", country: "Brasil", league: "Brasileirão" },
  { name: "Goiás", country: "Brasil", league: "Brasileirão" },
  { name: "Atlético Goianiense", country: "Brasil", league: "Brasileirão" },
  { name: "Cuiabá", country: "Brasil", league: "Brasileirão" },
  { name: "Red Bull Bragantino", country: "Brasil", league: "Brasileirão" },
  { name: "América Mineiro", country: "Brasil", league: "Brasileirão" },
  { name: "Avaí", country: "Brasil", league: "Serie B" },
  { name: "Figueirense", country: "Brasil", league: "Serie B" },
  { name: "Chapecoense", country: "Brasil", league: "Serie B" },
  { name: "Juventude", country: "Brasil", league: "Brasileirão" },
  { name: "Brusque", country: "Brasil", league: "Serie B" },

  // México - Top 30
  { name: "Club América", country: "México", league: "Liga MX" },
  { name: "Chivas Guadalajara", country: "México", league: "Liga MX" },
  { name: "Cruz Azul", country: "México", league: "Liga MX" },
  { name: "Pumas UNAM", country: "México", league: "Liga MX" },
  { name: "Tigres UANL", country: "México", league: "Liga MX" },
  { name: "Monterrey", country: "México", league: "Liga MX" },
  { name: "Santos Laguna", country: "México", league: "Liga MX" },
  { name: "León", country: "México", league: "Liga MX" },
  { name: "Pachuca", country: "México", league: "Liga MX" },
  { name: "Toluca", country: "México", league: "Liga MX" },
  { name: "Atlas", country: "México", league: "Liga MX" },
  { name: "Necaxa", country: "México", league: "Liga MX" },
  { name: "Puebla", country: "México", league: "Liga MX" },
  { name: "Querétaro", country: "México", league: "Liga MX" },
  { name: "Tijuana", country: "México", league: "Liga MX" },
  { name: "Mazatlán", country: "México", league: "Liga MX" },
  { name: "FC Juárez", country: "México", league: "Liga MX" },
  { name: "Atlético San Luis", country: "México", league: "Liga MX" },
  { name: "Morelia", country: "México", league: "Liga de Expansión" },
  { name: "Veracruz", country: "México", league: "Liga de Expansión" },
  { name: "Dorados", country: "México", league: "Liga de Expansión" },
  { name: "Zacatepec", country: "México", league: "Liga de Expansión" },
  { name: "Alebrijes de Oaxaca", country: "México", league: "Liga de Expansión" },
  { name: "Correcaminos", country: "México", league: "Liga de Expansión" },
  { name: "Mineros de Zacatecas", country: "México", league: "Liga de Expansión" },
  { name: "Celaya", country: "México", league: "Liga de Expansión" },
  { name: "Tampico Madero", country: "México", league: "Liga de Expansión" },
  { name: "Venados", country: "México", league: "Liga de Expansión" },
  { name: "Cancún FC", country: "México", league: "Liga de Expansión" },
  { name: "Tapatío", country: "México", league: "Liga de Expansión" },

  // Colombia - Top 30
  { name: "Millonarios", country: "Colombia", league: "Liga BetPlay" },
  { name: "Santa Fe", country: "Colombia", league: "Liga BetPlay" },
  { name: "Nacional", country: "Colombia", league: "Liga BetPlay" },
  { name: "Medellín", country: "Colombia", league: "Liga BetPlay" },
  { name: "América de Cali", country: "Colombia", league: "Liga BetPlay" },
  { name: "Deportivo Cali", country: "Colombia", league: "Liga BetPlay" },
  { name: "Junior", country: "Colombia", league: "Liga BetPlay" },
  { name: "Once Caldas", country: "Colombia", league: "Liga BetPlay" },
  { name: "Deportivo Pereira", country: "Colombia", league: "Liga BetPlay" },
  { name: "Bucaramanga", country: "Colombia", league: "Liga BetPlay" },
  { name: "Tolima", country: "Colombia", league: "Liga BetPlay" },
  { name: "Pasto", country: "Colombia", league: "Liga BetPlay" },
  { name: "Envigado", country: "Colombia", league: "Liga BetPlay" },
  { name: "Jaguares", country: "Colombia", league: "Liga BetPlay" },
  { name: "Patriotas", country: "Colombia", league: "Liga BetPlay" },
  { name: "Águilas Doradas", country: "Colombia", league: "Liga BetPlay" },
  { name: "Alianza Petrolera", country: "Colombia", league: "Liga BetPlay" },
  { name: "Boyacá Chicó", country: "Colombia", league: "Liga BetPlay" },
  { name: "La Equidad", country: "Colombia", league: "Liga BetPlay" },
  { name: "Fortaleza", country: "Colombia", league: "Liga BetPlay" },
  { name: "Rionegro Águilas", country: "Colombia", league: "Liga BetPlay" },
  { name: "Unión Magdalena", country: "Colombia", league: "Liga BetPlay" },
  { name: "Cortuluá", country: "Colombia", league: "Primera B" },
  { name: "Deportes Quindío", country: "Colombia", league: "Primera B" },
  { name: "Real Cartagena", country: "Colombia", league: "Primera B" },
  { name: "Atlético FC", country: "Colombia", league: "Primera B" },
  { name: "Bogotá FC", country: "Colombia", league: "Primera B" },
  { name: "Llaneros", country: "Colombia", league: "Primera B" },
  { name: "Orsomarso", country: "Colombia", league: "Primera B" },
  { name: "Valledupar", country: "Colombia", league: "Primera B" },

  // España - Top 30
  { name: "Real Madrid", country: "España", league: "La Liga" },
  { name: "FC Barcelona", country: "España", league: "La Liga" },
  { name: "Atlético Madrid", country: "España", league: "La Liga" },
  { name: "Sevilla", country: "España", league: "La Liga" },
  { name: "Real Betis", country: "España", league: "La Liga" },
  { name: "Villarreal", country: "España", league: "La Liga" },
  { name: "Real Sociedad", country: "España", league: "La Liga" },
  { name: "Athletic Bilbao", country: "España", league: "La Liga" },
  { name: "Valencia", country: "España", league: "La Liga" },
  { name: "Espanyol", country: "España", league: "La Liga" },
  { name: "Celta Vigo", country: "España", league: "La Liga" },
  { name: "Getafe", country: "España", league: "La Liga" },
  { name: "Osasuna", country: "España", league: "La Liga" },
  { name: "Rayo Vallecano", country: "España", league: "La Liga" },
  { name: "Mallorca", country: "España", league: "La Liga" },
  { name: "Cádiz", country: "España", league: "La Liga" },
  { name: "Elche", country: "España", league: "Segunda División" },
  { name: "Granada", country: "España", league: "Segunda División" },
  { name: "Almería", country: "España", league: "La Liga" },
  { name: "Girona", country: "España", league: "La Liga" },
  { name: "Las Palmas", country: "España", league: "La Liga" },
  { name: "Deportivo La Coruña", country: "España", league: "Segunda División" },
  { name: "Real Zaragoza", country: "España", league: "Segunda División" },
  { name: "Málaga", country: "España", league: "Segunda División" },
  { name: "Real Oviedo", country: "España", league: "Segunda División" },
  { name: "Sporting Gijón", country: "España", league: "Segunda División" },
  { name: "Eibar", country: "España", league: "Segunda División" },
  { name: "Leganés", country: "España", league: "Segunda División" },
  { name: "Levante", country: "España", league: "Segunda División" },
  { name: "Huesca", country: "España", league: "Segunda División" },

  // Italia - Top 30
  { name: "Juventus", country: "Italia", league: "Serie A" },
  { name: "AC Milan", country: "Italia", league: "Serie A" },
  { name: "Inter Milan", country: "Italia", league: "Serie A" },
  { name: "Napoli", country: "Italia", league: "Serie A" },
  { name: "AS Roma", country: "Italia", league: "Serie A" },
  { name: "Lazio", country: "Italia", league: "Serie A" },
  { name: "Atalanta", country: "Italia", league: "Serie A" },
  { name: "Fiorentina", country: "Italia", league: "Serie A" },
  { name: "Torino", country: "Italia", league: "Serie A" },
  { name: "Bologna", country: "Italia", league: "Serie A" },
  { name: "Sassuolo", country: "Italia", league: "Serie A" },
  { name: "Udinese", country: "Italia", league: "Serie A" },
  { name: "Sampdoria", country: "Italia", league: "Serie B" },
  { name: "Genoa", country: "Italia", league: "Serie A" },
  { name: "Cagliari", country: "Italia", league: "Serie A" },
  { name: "Spezia", country: "Italia", league: "Serie B" },
  { name: "Venezia", country: "Italia", league: "Serie B" },
  { name: "Empoli", country: "Italia", league: "Serie A" },
  { name: "Hellas Verona", country: "Italia", league: "Serie A" },
  { name: "Salernitana", country: "Italia", league: "Serie A" },
  { name: "Lecce", country: "Italia", league: "Serie A" },
  { name: "Monza", country: "Italia", league: "Serie A" },
  { name: "Cremonese", country: "Italia", league: "Serie B" },
  { name: "Frosinone", country: "Italia", league: "Serie A" },
  { name: "Parma", country: "Italia", league: "Serie B" },
  { name: "Brescia", country: "Italia", league: "Serie B" },
  { name: "Benevento", country: "Italia", league: "Serie B" },
  { name: "Pisa", country: "Italia", league: "Serie B" },
  { name: "Como", country: "Italia", league: "Serie B" },
  { name: "Palermo", country: "Italia", league: "Serie B" },

  // Inglaterra - Top 30
  { name: "Manchester United", country: "Inglaterra", league: "Premier League" },
  { name: "Manchester City", country: "Inglaterra", league: "Premier League" },
  { name: "Liverpool", country: "Inglaterra", league: "Premier League" },
  { name: "Chelsea", country: "Inglaterra", league: "Premier League" },
  { name: "Arsenal", country: "Inglaterra", league: "Premier League" },
  { name: "Tottenham", country: "Inglaterra", league: "Premier League" },
  { name: "Newcastle United", country: "Inglaterra", league: "Premier League" },
  { name: "Brighton", country: "Inglaterra", league: "Premier League" },
  { name: "Aston Villa", country: "Inglaterra", league: "Premier League" },
  { name: "West Ham", country: "Inglaterra", league: "Premier League" },
  { name: "Crystal Palace", country: "Inglaterra", league: "Premier League" },
  { name: "Fulham", country: "Inglaterra", league: "Premier League" },
  { name: "Brentford", country: "Inglaterra", league: "Premier League" },
  { name: "Nottingham Forest", country: "Inglaterra", league: "Premier League" },
  { name: "Everton", country: "Inglaterra", league: "Premier League" },
  { name: "Wolverhampton", country: "Inglaterra", league: "Premier League" },
  { name: "Bournemouth", country: "Inglaterra", league: "Premier League" },
  { name: "Sheffield United", country: "Inglaterra", league: "Championship" },
  { name: "Burnley", country: "Inglaterra", league: "Championship" },
  { name: "Luton Town", country: "Inglaterra", league: "Premier League" },
  { name: "Leicester City", country: "Inglaterra", league: "Championship" },
  { name: "Leeds United", country: "Inglaterra", league: "Championship" },
  { name: "Southampton", country: "Inglaterra", league: "Championship" },
  { name: "Norwich City", country: "Inglaterra", league: "Championship" },
  { name: "Watford", country: "Inglaterra", league: "Championship" },
  { name: "Middlesbrough", country: "Inglaterra", league: "Championship" },
  { name: "Birmingham City", country: "Inglaterra", league: "Championship" },
  { name: "Blackburn Rovers", country: "Inglaterra", league: "Championship" },
  { name: "Preston North End", country: "Inglaterra", league: "Championship" },
  { name: "Cardiff City", country: "Inglaterra", league: "Championship" },

  // Selecciones Nacionales - Top 30
  { name: "Argentina", country: "Selección Nacional" },
  { name: "Brasil", country: "Selección Nacional" },
  { name: "Francia", country: "Selección Nacional" },
  { name: "España", country: "Selección Nacional" },
  { name: "Inglaterra", country: "Selección Nacional" },
  { name: "Italia", country: "Selección Nacional" },
  { name: "Portugal", country: "Selección Nacional" },
  { name: "Países Bajos", country: "Selección Nacional" },
  { name: "Alemania", country: "Selección Nacional" },
  { name: "Bélgica", country: "Selección Nacional" },
  { name: "Croacia", country: "Selección Nacional" },
  { name: "Uruguay", country: "Selección Nacional" },
  { name: "Colombia", country: "Selección Nacional" },
  { name: "México", country: "Selección Nacional" },
  { name: "Marruecos", country: "Selección Nacional" },
  { name: "Japón", country: "Selección Nacional" },
  { name: "Corea del Sur", country: "Selección Nacional" },
  { name: "Suiza", country: "Selección Nacional" },
  { name: "Estados Unidos", country: "Selección Nacional" },
  { name: "Senegal", country: "Selección Nacional" },
  { name: "Australia", country: "Selección Nacional" },
  { name: "Polonia", country: "Selección Nacional" },
  { name: "Dinamarca", country: "Selección Nacional" },
  { name: "Chile", country: "Selección Nacional" },
  { name: "Perú", country: "Selección Nacional" },
  { name: "Ecuador", country: "Selección Nacional" },
  { name: "Venezuela", country: "Selección Nacional" },
  { name: "Paraguay", country: "Selección Nacional" },
  { name: "Bolivia", country: "Selección Nacional" },
  { name: "Costa Rica", country: "Selección Nacional" },
]

// Mapeo de países para priorización
const COUNTRY_MAPPING: Record<string, string[]> = {
  AR: ["Argentina"],
  MX: ["México"],
  CO: ["Colombia"],
  BR: ["Brasil"],
}

export function searchTeams(query: string, priorityCountry?: string): Team[] {
  if (!query.trim()) return []

  const normalizedQuery = normalizeText(query)

  const results = ALL_TEAMS.filter((team) => {
    const normalizedTeamName = normalizeText(team.name)
    const normalizedCountry = normalizeText(team.country)
    const normalizedLeague = team.league ? normalizeText(team.league) : ""

    return (
      normalizedTeamName.includes(normalizedQuery) ||
      normalizedCountry.includes(normalizedQuery) ||
      normalizedLeague.includes(normalizedQuery)
    )
  })

  // Priorizar equipos del país seleccionado
  if (priorityCountry && COUNTRY_MAPPING[priorityCountry]) {
    const priorityCountries = COUNTRY_MAPPING[priorityCountry]
    results.sort((a, b) => {
      const aIsPriority = priorityCountries.includes(a.country)
      const bIsPriority = priorityCountries.includes(b.country)

      if (aIsPriority && !bIsPriority) return -1
      if (!aIsPriority && bIsPriority) return 1
      return 0
    })
  }

  return results.slice(0, 10) // Limitar a 10 resultados para mejor UX
}

export function getFeaturedTeams(priorityCountry?: string): Team[] {
  if (!priorityCountry || !COUNTRY_MAPPING[priorityCountry]) {
    return FEATURED_TEAMS
  }

  const priorityCountries = COUNTRY_MAPPING[priorityCountry]
  const priorityTeams = ALL_TEAMS.filter((team) => priorityCountries.includes(team.country)).slice(0, 10)
  const otherTeams = FEATURED_TEAMS.filter((team) => !priorityCountries.includes(team.country)).slice(0, 5)

  return [...priorityTeams, ...otherTeams]
}
