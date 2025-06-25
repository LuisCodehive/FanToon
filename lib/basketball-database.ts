export interface BasketballTeam {
  name: string
  city: string
  conference: "Eastern" | "Western"
  division: string
}

export interface BasketballPlayer {
  name: string
  team: string
  position: string
  nationality: string
}

// Equipos NBA - Top 30
export const NBA_TEAMS: BasketballTeam[] = [
  // Eastern Conference - Atlantic
  { name: "Boston Celtics", city: "Boston", conference: "Eastern", division: "Atlantic" },
  { name: "Brooklyn Nets", city: "Brooklyn", conference: "Eastern", division: "Atlantic" },
  { name: "New York Knicks", city: "New York", conference: "Eastern", division: "Atlantic" },
  { name: "Philadelphia 76ers", city: "Philadelphia", conference: "Eastern", division: "Atlantic" },
  { name: "Toronto Raptors", city: "Toronto", conference: "Eastern", division: "Atlantic" },

  // Eastern Conference - Central
  { name: "Chicago Bulls", city: "Chicago", conference: "Eastern", division: "Central" },
  { name: "Cleveland Cavaliers", city: "Cleveland", conference: "Eastern", division: "Central" },
  { name: "Detroit Pistons", city: "Detroit", conference: "Eastern", division: "Central" },
  { name: "Indiana Pacers", city: "Indiana", conference: "Eastern", division: "Central" },
  { name: "Milwaukee Bucks", city: "Milwaukee", conference: "Eastern", division: "Central" },

  // Eastern Conference - Southeast
  { name: "Atlanta Hawks", city: "Atlanta", conference: "Eastern", division: "Southeast" },
  { name: "Charlotte Hornets", city: "Charlotte", conference: "Eastern", division: "Southeast" },
  { name: "Miami Heat", city: "Miami", conference: "Eastern", division: "Southeast" },
  { name: "Orlando Magic", city: "Orlando", conference: "Eastern", division: "Southeast" },
  { name: "Washington Wizards", city: "Washington", conference: "Eastern", division: "Southeast" },

  // Western Conference - Northwest
  { name: "Denver Nuggets", city: "Denver", conference: "Western", division: "Northwest" },
  { name: "Minnesota Timberwolves", city: "Minnesota", conference: "Western", division: "Northwest" },
  { name: "Oklahoma City Thunder", city: "Oklahoma City", conference: "Western", division: "Northwest" },
  { name: "Portland Trail Blazers", city: "Portland", conference: "Western", division: "Northwest" },
  { name: "Utah Jazz", city: "Utah", conference: "Western", division: "Northwest" },

  // Western Conference - Pacific
  { name: "Golden State Warriors", city: "Golden State", conference: "Western", division: "Pacific" },
  { name: "Los Angeles Clippers", city: "Los Angeles", conference: "Western", division: "Pacific" },
  { name: "Los Angeles Lakers", city: "Los Angeles", conference: "Western", division: "Pacific" },
  { name: "Phoenix Suns", city: "Phoenix", conference: "Western", division: "Pacific" },
  { name: "Sacramento Kings", city: "Sacramento", conference: "Western", division: "Pacific" },

  // Western Conference - Southwest
  { name: "Dallas Mavericks", city: "Dallas", conference: "Western", division: "Southwest" },
  { name: "Houston Rockets", city: "Houston", conference: "Western", division: "Southwest" },
  { name: "Memphis Grizzlies", city: "Memphis", conference: "Western", division: "Southwest" },
  { name: "New Orleans Pelicans", city: "New Orleans", conference: "Western", division: "Southwest" },
  { name: "San Antonio Spurs", city: "San Antonio", conference: "Western", division: "Southwest" },
]

// Jugadores NBA destacados - Top 30
export const NBA_PLAYERS: BasketballPlayer[] = [
  { name: "LeBron James", team: "Los Angeles Lakers", position: "Forward", nationality: "Estados Unidos" },
  { name: "Stephen Curry", team: "Golden State Warriors", position: "Guard", nationality: "Estados Unidos" },
  { name: "Kevin Durant", team: "Phoenix Suns", position: "Forward", nationality: "Estados Unidos" },
  { name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", position: "Forward", nationality: "Grecia" },
  { name: "Luka Dončić", team: "Dallas Mavericks", position: "Guard", nationality: "Eslovenia" },
  { name: "Jayson Tatum", team: "Boston Celtics", position: "Forward", nationality: "Estados Unidos" },
  { name: "Joel Embiid", team: "Philadelphia 76ers", position: "Center", nationality: "Camerún" },
  { name: "Nikola Jokić", team: "Denver Nuggets", position: "Center", nationality: "Serbia" },
  { name: "Jimmy Butler", team: "Miami Heat", position: "Forward", nationality: "Estados Unidos" },
  { name: "Kawhi Leonard", team: "Los Angeles Clippers", position: "Forward", nationality: "Estados Unidos" },
  { name: "Paul George", team: "Los Angeles Clippers", position: "Forward", nationality: "Estados Unidos" },
  { name: "Damian Lillard", team: "Milwaukee Bucks", position: "Guard", nationality: "Estados Unidos" },
  { name: "Anthony Davis", team: "Los Angeles Lakers", position: "Forward", nationality: "Estados Unidos" },
  { name: "Devin Booker", team: "Phoenix Suns", position: "Guard", nationality: "Estados Unidos" },
  { name: "Ja Morant", team: "Memphis Grizzlies", position: "Guard", nationality: "Estados Unidos" },
  { name: "Zion Williamson", team: "New Orleans Pelicans", position: "Forward", nationality: "Estados Unidos" },
  { name: "Trae Young", team: "Atlanta Hawks", position: "Guard", nationality: "Estados Unidos" },
  { name: "Donovan Mitchell", team: "Cleveland Cavaliers", position: "Guard", nationality: "Estados Unidos" },
  { name: "Bradley Beal", team: "Phoenix Suns", position: "Guard", nationality: "Estados Unidos" },
  { name: "Russell Westbrook", team: "Los Angeles Clippers", position: "Guard", nationality: "Estados Unidos" },
  { name: "Kyrie Irving", team: "Dallas Mavericks", position: "Guard", nationality: "Estados Unidos" },
  { name: "Klay Thompson", team: "Golden State Warriors", position: "Guard", nationality: "Estados Unidos" },
  { name: "Draymond Green", team: "Golden State Warriors", position: "Forward", nationality: "Estados Unidos" },
  { name: "Chris Paul", team: "Golden State Warriors", position: "Guard", nationality: "Estados Unidos" },
  { name: "Victor Wembanyama", team: "San Antonio Spurs", position: "Center", nationality: "Francia" },
  { name: "Paolo Banchero", team: "Orlando Magic", position: "Forward", nationality: "Estados Unidos" },
  { name: "Scottie Barnes", team: "Toronto Raptors", position: "Forward", nationality: "Estados Unidos" },
  { name: "Franz Wagner", team: "Orlando Magic", position: "Forward", nationality: "Alemania" },
  { name: "Alperen Şengün", team: "Houston Rockets", position: "Center", nationality: "Turquía" },
  { name: "Cade Cunningham", team: "Detroit Pistons", position: "Guard", nationality: "Estados Unidos" },
]

export const FEATURED_NBA_PLAYERS = NBA_PLAYERS.slice(0, 12)

export function searchNBAPlayers(query: string): BasketballPlayer[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase()
  return NBA_PLAYERS.filter(
    (player) =>
      player.name.toLowerCase().includes(normalizedQuery) ||
      player.team.toLowerCase().includes(normalizedQuery) ||
      player.position.toLowerCase().includes(normalizedQuery),
  ).slice(0, 10)
}

export function searchNBATeams(query: string): BasketballTeam[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase()
  return NBA_TEAMS.filter(
    (team) => team.name.toLowerCase().includes(normalizedQuery) || team.city.toLowerCase().includes(normalizedQuery),
  ).slice(0, 10)
}
