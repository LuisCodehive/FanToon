export interface HockeyTeam {
  name: string
  city: string
  league: string
}

export interface HockeyPlayer {
  name: string
  team: string
  position: string
  nationality: string
}

// Equipos de Hockey Argentino - Top 15
export const ARGENTINA_HOCKEY_TEAMS: HockeyTeam[] = [
  { name: "Club Atlético San Isidro", city: "San Isidro", league: "Metropolitano A" },
  { name: "Lomas Athletic Club", city: "Lomas de Zamora", league: "Metropolitano A" },
  { name: "Club de Gimnasia y Esgrima La Plata", city: "La Plata", league: "Metropolitano A" },
  { name: "Club Atlético Estudiantes", city: "La Plata", league: "Metropolitano A" },
  { name: "Club Ciudad de Buenos Aires", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Banco Provincia", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Club Atlético River Plate", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Club de Campo", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Hurling Club", city: "Hurlingham", league: "Metropolitano A" },
  { name: "Club Atlético San Martín", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Club Náutico Hacoaj", city: "Tigre", league: "Metropolitano A" },
  { name: "Quilmes Atlético Club", city: "Quilmes", league: "Metropolitano A" },
  { name: "Club Atlético Belgrano", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Club Social y Deportivo Italiano", city: "Buenos Aires", league: "Metropolitano A" },
  { name: "Club Atlético Vélez Sarsfield", city: "Buenos Aires", league: "Metropolitano A" },
]

// Jugadoras de Hockey Argentinas - Top 30 (Las Leonas y destacadas)
export const ARGENTINA_HOCKEY_PLAYERS: HockeyPlayer[] = [
  { name: "Lucina von der Heyde", team: "Las Leonas", position: "Arquera", nationality: "Argentina" },
  { name: "Agustina Gorzelany", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Rocío Sánchez Moccia", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Valentina Raposo", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Sofía Toccalino", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Augustina Habif", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Victoria Granatto", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "Agustina Albertarrio", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "María José Granatto", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "Julieta Jankunas", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Eugenia Trinchinetti", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Pilar Campoy", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Clara Barberi", team: "Las Leonas", position: "Arquera", nationality: "Argentina" },
  { name: "Zoe Díaz de Armas", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Cristina Cosentino", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "Delfina Merino", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Carla Rebecchi", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Noel Barrionuevo", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Florencia Habif", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "Belén Succi", team: "Las Leonas", position: "Arquera", nationality: "Argentina" },
  { name: "Micaela Retegui", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "Martina Cavallero", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Jimena Cedres", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Valentina Costa Biondi", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "María Noel Barrionuevo", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Silvina D'Elía", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Rosario Luchetti", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
  { name: "Magdalena Fernández", team: "Las Leonas", position: "Defensora", nationality: "Argentina" },
  { name: "Constanza Villagra", team: "Las Leonas", position: "Delantera", nationality: "Argentina" },
  { name: "Lucía Sanguinetti", team: "Las Leonas", position: "Mediocampista", nationality: "Argentina" },
]

export const FEATURED_HOCKEY_PLAYERS = ARGENTINA_HOCKEY_PLAYERS.slice(0, 12)

export function searchHockeyPlayers(query: string): HockeyPlayer[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase()
  return ARGENTINA_HOCKEY_PLAYERS.filter(
    (player) =>
      player.name.toLowerCase().includes(normalizedQuery) || player.position.toLowerCase().includes(normalizedQuery),
  ).slice(0, 10)
}

export function searchHockeyTeams(query: string): HockeyTeam[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase()
  return ARGENTINA_HOCKEY_TEAMS.filter(
    (team) => team.name.toLowerCase().includes(normalizedQuery) || team.city.toLowerCase().includes(normalizedQuery),
  ).slice(0, 10)
}
