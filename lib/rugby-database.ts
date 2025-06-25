export interface RugbyTeam {
  name: string
  city: string
  league: string
}

export interface RugbyPlayer {
  name: string
  currentTeam: string
  position: string
  nationality: string
}

// Equipos de Rugby Argentino - Top 15
export const ARGENTINA_RUGBY_TEAMS: RugbyTeam[] = [
  { name: "Club Atlético San Isidro", city: "San Isidro", league: "URBA" },
  { name: "Alumni", city: "Tortuguitas", league: "URBA" },
  { name: "Club Atlético Belgrano", city: "Buenos Aires", league: "URBA" },
  { name: "Hindú Club", city: "Don Torcuato", league: "URBA" },
  { name: "Club Universidad de Buenos Aires", city: "Buenos Aires", league: "URBA" },
  { name: "Club Atlético San Martín", city: "Buenos Aires", league: "URBA" },
  { name: "Club Newman", city: "Boulogne", league: "URBA" },
  { name: "Club de Rugby Ateneo Inmaculada", city: "Buenos Aires", league: "URBA" },
  { name: "Club Atlético del Rosario", city: "Rosario", league: "URS" },
  { name: "Jockey Club Rosario", city: "Rosario", league: "URS" },
  { name: "La Plata Rugby Club", city: "La Plata", league: "URBA" },
  { name: "Club Universitario de Buenos Aires", city: "Buenos Aires", league: "URBA" },
  { name: "Club Atlético Estudiantes", city: "La Plata", league: "URBA" },
  { name: "Club Social y Deportivo Italiano", city: "Buenos Aires", league: "URBA" },
  { name: "Club Atlético Pucará", city: "Buenos Aires", league: "URBA" },
]

// Jugadores de Rugby Argentinos - Top 30 (Los Pumas y destacados)
export const ARGENTINA_RUGBY_PLAYERS: RugbyPlayer[] = [
  { name: "Julián Montoya", currentTeam: "Leicester Tigers", position: "Hooker", nationality: "Argentina" },
  { name: "Pablo Matera", currentTeam: "Crusaders", position: "Flanker", nationality: "Argentina" },
  { name: "Marcos Kremer", currentTeam: "Stade Français", position: "Lock", nationality: "Argentina" },
  { name: "Juan Martín González", currentTeam: "Saracens", position: "Flanker", nationality: "Argentina" },
  { name: "Tomás Lavanini", currentTeam: "Leicester Tigers", position: "Lock", nationality: "Argentina" },
  { name: "Santiago Carreras", currentTeam: "Gloucester", position: "Fullback", nationality: "Argentina" },
  { name: "Emiliano Boffelli", currentTeam: "Edinburgh", position: "Wing", nationality: "Argentina" },
  { name: "Juan Cruz Mallía", currentTeam: "Saracens", position: "Fullback", nationality: "Argentina" },
  { name: "Gonzalo Bertranou", currentTeam: "Racing 92", position: "Scrum-half", nationality: "Argentina" },
  { name: "Santiago Chocobares", currentTeam: "Saracens", position: "Centre", nationality: "Argentina" },
  { name: "Matías Alemanno", currentTeam: "Gloucester", position: "Lock", nationality: "Argentina" },
  { name: "Francisco Gorrissen", currentTeam: "Bayonne", position: "Prop", nationality: "Argentina" },
  { name: "Joel Sclavi", currentTeam: "La Rochelle", position: "Prop", nationality: "Argentina" },
  { name: "Ignacio Ruiz", currentTeam: "Saracens", position: "Hooker", nationality: "Argentina" },
  { name: "Pedro Rubiolo", currentTeam: "Toulouse", position: "Lock", nationality: "Argentina" },
  { name: "Lautaro Bazán Vélez", currentTeam: "Racing 92", position: "Flanker", nationality: "Argentina" },
  { name: "Rodrigo Bruni", currentTeam: "Benetton", position: "Flanker", nationality: "Argentina" },
  { name: "Tomás Albornoz", currentTeam: "Benetton", position: "Fly-half", nationality: "Argentina" },
  { name: "Lucio Cinti", currentTeam: "Saracens", position: "Wing", nationality: "Argentina" },
  { name: "Mateo Carreras", currentTeam: "Newcastle Falcons", position: "Wing", nationality: "Argentina" },
  { name: "Jerónimo de la Fuente", currentTeam: "Perpignan", position: "Centre", nationality: "Argentina" },
  { name: "Matías Moroni", currentTeam: "Newcastle Falcons", position: "Centre", nationality: "Argentina" },
  { name: "Bautista Delguy", currentTeam: "Clermont", position: "Wing", nationality: "Argentina" },
  { name: "Sebastián Cancelliere", currentTeam: "Toulouse", position: "Wing", nationality: "Argentina" },
  { name: "Facundo Isa", currentTeam: "Toulouse", position: "Number 8", nationality: "Argentina" },
  { name: "Guido Petti", currentTeam: "Bordeaux", position: "Lock", nationality: "Argentina" },
  { name: "Santiago Medrano", currentTeam: "Saracens", position: "Prop", nationality: "Argentina" },
  { name: "Mayco Vivas", currentTeam: "Newcastle Falcons", position: "Prop", nationality: "Argentina" },
  { name: "Agustín Creevy", currentTeam: "Benetton", position: "Hooker", nationality: "Argentina" },
  { name: "Juan Figallo", currentTeam: "Saracens", position: "Prop", nationality: "Argentina" },
]

export const FEATURED_RUGBY_PLAYERS = ARGENTINA_RUGBY_PLAYERS.slice(0, 12)

export function searchRugbyPlayers(query: string): RugbyPlayer[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase()
  return ARGENTINA_RUGBY_PLAYERS.filter(
    (player) =>
      player.name.toLowerCase().includes(normalizedQuery) ||
      player.currentTeam.toLowerCase().includes(normalizedQuery) ||
      player.position.toLowerCase().includes(normalizedQuery),
  ).slice(0, 10)
}

export function searchRugbyTeams(query: string): RugbyTeam[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase()
  return ARGENTINA_RUGBY_TEAMS.filter(
    (team) => team.name.toLowerCase().includes(normalizedQuery) || team.city.toLowerCase().includes(normalizedQuery),
  ).slice(0, 10)
}
