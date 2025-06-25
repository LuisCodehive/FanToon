export interface Coach {
  name: string
  country: string
  currentTeam?: string
  league?: string
  achievements?: string[]
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

// Entrenadores populares para mostrar en la página principal
export const FEATURED_COACHES: Coach[] = [
  {
    name: "Lionel Scaloni",
    country: "Argentina",
    currentTeam: "Selección Argentina",
    achievements: ["Copa del Mundo 2022", "Copa América 2021"],
  },
  {
    name: "Pep Guardiola",
    country: "España",
    currentTeam: "Manchester City",
    league: "Premier League",
    achievements: ["Champions League", "Premier League"],
  },
  {
    name: "Carlo Ancelotti",
    country: "Italia",
    currentTeam: "Real Madrid",
    league: "La Liga",
    achievements: ["Champions League", "La Liga"],
  },
  {
    name: "Marcelo Gallardo",
    country: "Argentina",
    currentTeam: "Al-Ittihad",
    league: "Saudi Pro League",
    achievements: ["Copa Libertadores", "Liga Profesional"],
  },
  {
    name: "Diego Simeone",
    country: "Argentina",
    currentTeam: "Atlético Madrid",
    league: "La Liga",
    achievements: ["La Liga", "Europa League"],
  },
  {
    name: "Jürgen Klopp",
    country: "Alemania",
    currentTeam: "Liverpool",
    league: "Premier League",
    achievements: ["Champions League", "Premier League"],
  },
  {
    name: "Xavi Hernández",
    country: "España",
    currentTeam: "Al Sadd",
    league: "Qatar Stars League",
    achievements: ["La Liga"],
  },
  {
    name: "Mikel Arteta",
    country: "España",
    currentTeam: "Arsenal",
    league: "Premier League",
    achievements: ["FA Cup"],
  },
]

// Base de datos completa de entrenadores
export const ALL_COACHES: Coach[] = [
  // Top 30 Entrenadores de Argentina
  {
    name: "Lionel Scaloni",
    country: "Argentina",
    currentTeam: "Selección Argentina",
    achievements: ["Copa del Mundo 2022", "Copa América 2021"],
  },
  {
    name: "Marcelo Gallardo",
    country: "Argentina",
    currentTeam: "Al-Ittihad",
    league: "Saudi Pro League",
    achievements: ["Copa Libertadores", "Liga Profesional"],
  },
  {
    name: "Diego Simeone",
    country: "Argentina",
    currentTeam: "Atlético Madrid",
    league: "La Liga",
    achievements: ["La Liga", "Europa League"],
  },
  {
    name: "Mauricio Pochettino",
    country: "Argentina",
    currentTeam: "Chelsea",
    league: "Premier League",
    achievements: ["Ligue 1"],
  },
  {
    name: "Jorge Sampaoli",
    country: "Argentina",
    currentTeam: "Flamengo",
    league: "Brasileirão",
    achievements: ["Copa América 2015"],
  },
  {
    name: "Ricardo Gareca",
    country: "Argentina",
    currentTeam: "Vélez Sarsfield",
    league: "Liga Profesional",
    achievements: ["Copa América"],
  },
  {
    name: "Sebastián Beccacece",
    country: "Argentina",
    currentTeam: "Elche",
    league: "Segunda División",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Gabriel Heinze",
    country: "Argentina",
    currentTeam: "Newell's Old Boys",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Hernán Crespo",
    country: "Argentina",
    currentTeam: "Al-Ain",
    league: "UAE Pro League",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Frank Darío Kudelka",
    country: "Argentina",
    currentTeam: "Lanús",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  { name: "Gustavo Alfaro", country: "Argentina", currentTeam: "Costa Rica", achievements: ["Liga Profesional"] },
  {
    name: "Eduardo Domínguez",
    country: "Argentina",
    currentTeam: "Estudiantes",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Ariel Holan",
    country: "Argentina",
    currentTeam: "Defensa y Justicia",
    league: "Liga Profesional",
    achievements: ["Copa Sudamericana"],
  },
  {
    name: "Diego Martínez",
    country: "Argentina",
    currentTeam: "Boca Juniors",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Martín Demichelis",
    country: "Argentina",
    currentTeam: "River Plate",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Facundo Sava",
    country: "Argentina",
    currentTeam: "Gimnasia La Plata",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Cristian González",
    country: "Argentina",
    currentTeam: "Huracán",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Rubén Darío Insúa",
    country: "Argentina",
    currentTeam: "San Lorenzo",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Gustavo Costas",
    country: "Argentina",
    currentTeam: "Racing Club",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Julio César Falcioni",
    country: "Argentina",
    currentTeam: "Independiente",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Walter Erviti",
    country: "Argentina",
    currentTeam: "Banfield",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Rodolfo De Paoli",
    country: "Argentina",
    currentTeam: "Platense",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Leonardo Madelón",
    country: "Argentina",
    currentTeam: "Unión",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Iván Delfino",
    country: "Argentina",
    currentTeam: "Colón",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Walter Ribonetto",
    country: "Argentina",
    currentTeam: "Talleres",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Lucas Bovaglio",
    country: "Argentina",
    currentTeam: "Tigre",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Claudio Spontón",
    country: "Argentina",
    currentTeam: "Arsenal",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Daniel Garnero",
    country: "Argentina",
    currentTeam: "Godoy Cruz",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },
  {
    name: "Miguel Ángel Russo",
    country: "Argentina",
    currentTeam: "Rosario Central",
    league: "Liga Profesional",
    achievements: ["Copa Libertadores"],
  },
  {
    name: "Adrián Taffarel",
    country: "Argentina",
    currentTeam: "Atlético Tucumán",
    league: "Liga Profesional",
    achievements: ["Liga Profesional"],
  },

  // Top 30 Entrenadores del Mundo
  {
    name: "Pep Guardiola",
    country: "España",
    currentTeam: "Manchester City",
    league: "Premier League",
    achievements: ["Champions League", "Premier League"],
  },
  {
    name: "Carlo Ancelotti",
    country: "Italia",
    currentTeam: "Real Madrid",
    league: "La Liga",
    achievements: ["Champions League", "La Liga"],
  },
  {
    name: "Jürgen Klopp",
    country: "Alemania",
    currentTeam: "Liverpool",
    league: "Premier League",
    achievements: ["Champions League", "Premier League"],
  },
  {
    name: "Antonio Conte",
    country: "Italia",
    currentTeam: "Napoli",
    league: "Serie A",
    achievements: ["Serie A", "Premier League"],
  },
  {
    name: "José Mourinho",
    country: "Portugal",
    currentTeam: "Fenerbahçe",
    league: "Süper Lig",
    achievements: ["Champions League", "Premier League"],
  },
  { name: "Zinedine Zidane", country: "Francia", currentTeam: "Libre", achievements: ["Champions League", "La Liga"] },
  {
    name: "Luis Enrique",
    country: "España",
    currentTeam: "PSG",
    league: "Ligue 1",
    achievements: ["Champions League", "La Liga"],
  },
  {
    name: "Xavi Hernández",
    country: "España",
    currentTeam: "Al Sadd",
    league: "Qatar Stars League",
    achievements: ["La Liga"],
  },
  {
    name: "Mikel Arteta",
    country: "España",
    currentTeam: "Arsenal",
    league: "Premier League",
    achievements: ["FA Cup"],
  },
  {
    name: "Erik ten Hag",
    country: "Países Bajos",
    currentTeam: "Manchester United",
    league: "Premier League",
    achievements: ["Eredivisie"],
  },
  {
    name: "Thomas Tuchel",
    country: "Alemania",
    currentTeam: "Bayern Munich",
    league: "Bundesliga",
    achievements: ["Champions League", "Bundesliga"],
  },
  {
    name: "Simone Inzaghi",
    country: "Italia",
    currentTeam: "Inter Milan",
    league: "Serie A",
    achievements: ["Serie A"],
  },
  {
    name: "Stefano Pioli",
    country: "Italia",
    currentTeam: "Al-Nassr",
    league: "Saudi Pro League",
    achievements: ["Serie A"],
  },
  {
    name: "Massimiliano Allegri",
    country: "Italia",
    currentTeam: "Libre",
    achievements: ["Serie A", "Champions League"],
  },
  { name: "Julian Nagelsmann", country: "Alemania", currentTeam: "Selección Alemana", achievements: ["Bundesliga"] },
  {
    name: "Hansi Flick",
    country: "Alemania",
    currentTeam: "FC Barcelona",
    league: "La Liga",
    achievements: ["Champions League", "Bundesliga"],
  },
  {
    name: "Roberto De Zerbi",
    country: "Italia",
    currentTeam: "Brighton",
    league: "Premier League",
    achievements: ["Serie A"],
  },
  {
    name: "Xabi Alonso",
    country: "España",
    currentTeam: "Bayer Leverkusen",
    league: "Bundesliga",
    achievements: ["Bundesliga"],
  },
  {
    name: "Ange Postecoglou",
    country: "Australia",
    currentTeam: "Tottenham",
    league: "Premier League",
    achievements: ["J-League"],
  },
  {
    name: "Unai Emery",
    country: "España",
    currentTeam: "Aston Villa",
    league: "Premier League",
    achievements: ["Europa League"],
  },
  { name: "Graham Potter", country: "Inglaterra", currentTeam: "Libre", achievements: ["Premier League"] },
  {
    name: "Eddie Howe",
    country: "Inglaterra",
    currentTeam: "Newcastle United",
    league: "Premier League",
    achievements: ["Championship"],
  },
  {
    name: "David Moyes",
    country: "Escocia",
    currentTeam: "West Ham",
    league: "Premier League",
    achievements: ["Europa Conference League"],
  },
  {
    name: "Brendan Rodgers",
    country: "Irlanda del Norte",
    currentTeam: "Leicester City",
    league: "Championship",
    achievements: ["Scottish Premiership"],
  },
  {
    name: "Marco Silva",
    country: "Portugal",
    currentTeam: "Fulham",
    league: "Premier League",
    achievements: ["Championship"],
  },
  { name: "Paulo Fonseca", country: "Portugal", currentTeam: "AC Milan", league: "Serie A", achievements: ["Serie A"] },
  {
    name: "Gian Piero Gasperini",
    country: "Italia",
    currentTeam: "Atalanta",
    league: "Serie A",
    achievements: ["Europa League"],
  },
  { name: "Luciano Spalletti", country: "Italia", currentTeam: "Selección Italiana", achievements: ["Serie A"] },
  {
    name: "Christophe Galtier",
    country: "Francia",
    currentTeam: "Al-Duhail",
    league: "Qatar Stars League",
    achievements: ["Ligue 1"],
  },
  {
    name: "Roberto Mancini",
    country: "Italia",
    currentTeam: "Al-Hilal",
    league: "Saudi Pro League",
    achievements: ["Eurocopa 2021"],
  },

  // Entrenadores históricos y leyendas
  {
    name: "Sir Alex Ferguson",
    country: "Escocia",
    currentTeam: "Retirado",
    achievements: ["Champions League", "Premier League"],
  },
  { name: "Arsène Wenger", country: "Francia", currentTeam: "Retirado", achievements: ["Premier League", "FA Cup"] },
  {
    name: "Vicente del Bosque",
    country: "España",
    currentTeam: "Retirado",
    achievements: ["Copa del Mundo 2010", "Eurocopa 2012"],
  },
  { name: "Fabio Capello", country: "Italia", currentTeam: "Retirado", achievements: ["Champions League", "Serie A"] },
  { name: "Luiz Felipe Scolari", country: "Brasil", currentTeam: "Retirado", achievements: ["Copa del Mundo 2002"] },
  {
    name: "Carlos Bianchi",
    country: "Argentina",
    currentTeam: "Retirado",
    achievements: ["Copa Libertadores", "Copa Intercontinental"],
  },
  {
    name: "Ramón Díaz",
    country: "Argentina",
    currentTeam: "Vasco da Gama",
    league: "Brasileirão",
    achievements: ["Liga Profesional"],
  },
  { name: "César Luis Menotti", country: "Argentina", currentTeam: "Retirado", achievements: ["Copa del Mundo 1978"] },
  {
    name: "Carlos Salvador Bilardo",
    country: "Argentina",
    currentTeam: "Retirado",
    achievements: ["Copa del Mundo 1986"],
  },
  {
    name: "Alejandro Sabella",
    country: "Argentina",
    currentTeam: "Fallecido",
    achievements: ["Subcampeón Mundial 2014"],
  },
]

export function searchCoaches(query: string): Coach[] {
  if (!query.trim()) return []

  const normalizedQuery = normalizeText(query)

  return ALL_COACHES.filter((coach) => {
    const normalizedCoachName = normalizeText(coach.name)
    const normalizedCountry = normalizeText(coach.country)
    const normalizedTeam = coach.currentTeam ? normalizeText(coach.currentTeam) : ""
    const normalizedLeague = coach.league ? normalizeText(coach.league) : ""

    return (
      normalizedCoachName.includes(normalizedQuery) ||
      normalizedCountry.includes(normalizedQuery) ||
      normalizedTeam.includes(normalizedQuery) ||
      normalizedLeague.includes(normalizedQuery)
    )
  }).slice(0, 10) // Limitar a 10 resultados para mejor UX
}

// Entrenadores por categoría para facilitar la navegación
export const COACHES_BY_CATEGORY = {
  argentina: ALL_COACHES.filter((coach) => coach.country === "Argentina").slice(0, 30),
  world: ALL_COACHES.filter((coach) => coach.country !== "Argentina").slice(0, 30),
  active: ALL_COACHES.filter(
    (coach) =>
      coach.currentTeam &&
      coach.currentTeam !== "Retirado" &&
      coach.currentTeam !== "Libre" &&
      coach.currentTeam !== "Fallecido",
  ),
  legends: ALL_COACHES.filter((coach) => coach.currentTeam === "Retirado" || coach.currentTeam === "Fallecido"),
}
