export type StoryType =
  | "futbol"
  | "basquet"
  | "hockey"
  | "rugby"
  | "astronauta"
  | "bombero"
  | "actor"
  | "policia"
  | "cocinero"

export interface StoryTypeOption {
  id: StoryType
  title: string
  emoji: string
  description: string
  color: string
  steps: string[]
}

export const STORY_TYPES: StoryTypeOption[] = [
  {
    id: "futbol",
    title: "Fútbol",
    emoji: "⚽",
    description: "Convertite en el crack del fútbol mundial",
    color: "bg-green-500",
    steps: ["team", "name", "photo", "trophy", "players", "coach"],
  },
  {
    id: "basquet",
    title: "Básquet",
    emoji: "🏀",
    description: "Jugá en la NBA con las estrellas del básquet",
    color: "bg-orange-500",
    steps: ["team", "name", "photo", "trophy", "players", "coach"],
  },
  {
    id: "hockey",
    title: "Hockey",
    emoji: "🏑",
    description: "Brillá en la cancha con Las Leonas",
    color: "bg-blue-500",
    steps: ["team", "name", "photo", "trophy", "players", "coach"],
  },
  {
    id: "rugby",
    title: "Rugby",
    emoji: "🏉",
    description: "Formá parte de Los Pumas y conquistá el mundo",
    color: "bg-yellow-600",
    steps: ["team", "name", "photo", "trophy", "players", "coach"],
  },
  {
    id: "astronauta",
    title: "Astronauta",
    emoji: "🚀",
    description: "Explorá el espacio y descubrí nuevos planetas",
    color: "bg-purple-500",
    steps: ["name", "photo"],
  },
  {
    id: "bombero",
    title: "Bombero/a",
    emoji: "🚒",
    description: "Salvá vidas y convertite en un héroe",
    color: "bg-red-500",
    steps: ["name", "photo"],
  },
  {
    id: "actor",
    title: "Actor/Actriz",
    emoji: "🎭",
    description: "Brillá en Hollywood y ganate un Oscar",
    color: "bg-pink-500",
    steps: ["name", "photo"],
  },
  {
    id: "policia",
    title: "Policía",
    emoji: "👮",
    description: "Protegé la ciudad y resolvé misterios",
    color: "bg-indigo-500",
    steps: ["name", "photo"],
  },
  {
    id: "cocinero",
    title: "Cocinero/a",
    emoji: "👨‍🍳",
    description: "Creá platos increíbles y convertite en chef",
    color: "bg-amber-500",
    steps: ["name", "photo"],
  },
]

export function getStoryType(id: StoryType): StoryTypeOption | undefined {
  return STORY_TYPES.find((story) => story.id === id)
}

export function getStorySteps(storyType: StoryType): string[] {
  const story = getStoryType(storyType)
  return story?.steps || []
}
