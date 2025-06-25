"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type CountryCode = "AR" | "MX" | "CO" | "BR"

export interface Country {
  code: CountryCode
  name: string
  flag: string
  currency: string
  currencySymbol: string
  exchangeRate: number // Rate from ARS
}

export const COUNTRIES: Record<CountryCode, Country> = {
  AR: {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    currency: "ARS",
    currencySymbol: "$",
    exchangeRate: 1,
  },
  MX: {
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    currency: "MXN",
    currencySymbol: "$",
    exchangeRate: 0.05, // 1 ARS = 0.05 MXN (aproximado)
  },
  CO: {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    currency: "COP",
    currencySymbol: "$",
    exchangeRate: 0.25, // 1 ARS = 0.25 COP (aproximado)
  },
  BR: {
    code: "BR",
    name: "Brasil",
    flag: "🇧🇷",
    currency: "BRL",
    currencySymbol: "R$",
    exchangeRate: 0.006, // 1 ARS = 0.006 BRL (aproximado)
  },
}

interface CountryContextType {
  selectedCountry: CountryCode
  setSelectedCountry: (country: CountryCode) => void
  country: Country
  formatPrice: (price: number) => string
  getText: (key: string) => string
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

// Textos localizados por país
const LOCALIZED_TEXTS: Record<CountryCode, Record<string, string>> = {
  AR: {
    childProtagonist: "¿Cómo se llama el chico/la chica protagonista?",
    childName: "Nombre del chico/a",
    tipName: "💡 Tip: Asegurate de escribir bien el nombre, va a aparecer en todo el libro",
    successName: "¡Perfecto! {name} va a ser el protagonista de esta aventura futbolera increíble 🌟",
    teamQuestion: "¿Cuál es tu equipo favorito?",
    teamTip: "💡 Tip: Podés elegir cualquier equipo del mundo, incluso los de tu barrio",
    coachQuestion: "¿Quién va a ser el técnico?",
    coachDescription: "Elegí al DT que va a dirigir al equipo hacia la victoria",
    coachTip: "💡 Tip: Podés elegir cualquier técnico, incluso el DT de tu equipo del barrio",
    playersQuestion: "Elegí los jugadores favoritos",
    playersDescription: "Seleccioná hasta 3 jugadores que van a aparecer en el libro",
    playersTip: "💡 Tip: Podés elegir cualquier jugador, incluso de equipos locales o juveniles",
    trophyQuestion: "¿Qué torneo va a ganar?",
    trophyDescription: "Elegí el campeonato que va a conquistar el chico/la chica",
    photoQuestion: "Subí una foto del chico/la chica",
    photoDescription: "Esta foto nos ayudará a crear ilustraciones más personalizadas",
    createButton: "🎨 Crear mi libro ahora",
    happyFamilies: "Más de 1,000 familias re contentas",
    bookReady: "¡Tu libro ya está listo, che!",
    currency: "ARS",
  },
  MX: {
    childProtagonist: "¿Cómo se llama el chamaco/la chamaca protagonista?",
    childName: "Nombre del chamaco/a",
    tipName: "💡 Tip: Asegúrate de escribir bien el nombre, va a aparecer en todo el libro",
    successName: "¡Perfecto! {name} va a ser el protagonista de esta aventura futbolera increíble 🌟",
    teamQuestion: "¿Cuál es tu equipo favorito?",
    teamTip: "💡 Tip: Puedes elegir cualquier equipo del mundo, incluso los de tu barrio",
    coachQuestion: "¿Quién va a ser el entrenador?",
    coachDescription: "Elige al DT que va a dirigir al equipo hacia la victoria",
    coachTip: "💡 Tip: Puedes elegir cualquier entrenador, incluso el DT de tu equipo del barrio",
    playersQuestion: "Elige los jugadores favoritos",
    playersDescription: "Selecciona hasta 3 jugadores que van a aparecer en el libro",
    playersTip: "💡 Tip: Puedes elegir cualquier jugador, incluso de equipos locales o juveniles",
    trophyQuestion: "¿Qué torneo va a ganar?",
    trophyDescription: "Elige el campeonato que va a conquistar el chamaco/la chamaca",
    photoQuestion: "Sube una foto del chamaco/la chamaca",
    photoDescription: "Esta foto nos ayudará a crear ilustraciones más personalizadas",
    createButton: "🎨 Crear mi libro ahora",
    happyFamilies: "Más de 1,000 familias súper contentas",
    bookReady: "¡Tu libro ya está listo, güey!",
    currency: "MXN",
  },
  CO: {
    childProtagonist: "¿Cómo se llama el pelado/la pelada protagonista?",
    childName: "Nombre del pelado/a",
    tipName: "💡 Tip: Asegurate de escribir bien el nombre, va a aparecer en todo el libro",
    successName: "¡Perfecto! {name} va a ser el protagonista de esta aventura futbolera increíble 🌟",
    teamQuestion: "¿Cuál es tu equipo favorito?",
    teamTip: "💡 Tip: Podés elegir cualquier equipo del mundo, incluso los de tu barrio",
    coachQuestion: "¿Quién va a ser el técnico?",
    coachDescription: "Elegí al DT que va a dirigir al equipo hacia la victoria",
    coachTip: "💡 Tip: Podés elegir cualquier técnico, incluso el DT de tu equipo del barrio",
    playersQuestion: "Elegí los jugadores favoritos",
    playersDescription: "Seleccioná hasta 3 jugadores que van a aparecer en el libro",
    playersTip: "💡 Tip: Podés elegir cualquier jugador, incluso de equipos locales o juveniles",
    trophyQuestion: "¿Qué torneo va a ganar?",
    trophyDescription: "Elegí el campeonato que va a conquistar el pelado/la pelada",
    photoQuestion: "Subí una foto del pelado/la pelada",
    photoDescription: "Esta foto nos ayudará a crear ilustraciones más personalizadas",
    createButton: "🎨 Crear mi libro ahora",
    happyFamilies: "Más de 1,000 familias súper contentas",
    bookReady: "¡Tu libro ya está listo, parce!",
    currency: "COP",
  },
  BR: {
    childProtagonist: "Qual é o nome do moleque/da moleca protagonista?",
    childName: "Nome do moleque/a",
    tipName: "💡 Dica: Certifique-se de escrever o nome corretamente, vai aparecer em todo o livro",
    successName: "Perfeito! {name} vai ser o protagonista desta aventura futebolística incrível 🌟",
    teamQuestion: "Qual é o seu time favorito?",
    teamTip: "💡 Dica: Você pode escolher qualquer time do mundo, até mesmo os do seu bairro",
    coachQuestion: "Quem vai ser o técnico?",
    coachDescription: "Escolha o treinador que vai dirigir o time rumo à vitória",
    coachTip: "💡 Dica: Você pode escolher qualquer técnico, até mesmo o do seu time do bairro",
    playersQuestion: "Escolha os jogadores favoritos",
    playersDescription: "Selecione até 3 jogadores que vão aparecer no livro",
    playersTip: "💡 Dica: Você pode escolher qualquer jogador, até mesmo de times locais ou juvenis",
    trophyQuestion: "Que torneio vai ganhar?",
    trophyDescription: "Escolha o campeonato que o moleque/a moleca vai conquistar",
    photoQuestion: "Envie uma foto do moleque/da moleca",
    photoDescription: "Esta foto nos ajudará a criar ilustrações mais personalizadas",
    createButton: "🎨 Criar meu libro agora",
    happyFamilies: "Mais de 1.000 famílias super felizes",
    bookReady: "Seu livro já está pronto, cara!",
    currency: "BRL",
  },
}

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("AR")

  useEffect(() => {
    // Load saved country from localStorage
    const savedCountry = localStorage.getItem("selectedCountry") as CountryCode
    if (savedCountry && COUNTRIES[savedCountry]) {
      setSelectedCountry(savedCountry)
    }
  }, [])

  const handleSetCountry = (country: CountryCode) => {
    setSelectedCountry(country)
    localStorage.setItem("selectedCountry", country)
  }

  const formatPrice = (price: number): string => {
    const country = COUNTRIES[selectedCountry]
    const convertedPrice = Math.round(price * country.exchangeRate)

    if (selectedCountry === "BR") {
      return `${country.currencySymbol} ${convertedPrice.toLocaleString("pt-BR")}`
    }

    return `${country.currencySymbol}${convertedPrice.toLocaleString()} ${country.currency}`
  }

  const getText = (key: string): string => {
    return LOCALIZED_TEXTS[selectedCountry][key] || key
  }

  return (
    <CountryContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry: handleSetCountry,
        country: COUNTRIES[selectedCountry],
        formatPrice,
        getText,
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}
