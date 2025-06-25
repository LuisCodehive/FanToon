"use client"

import { useState } from "react"
import { useCountry, type CountryCode } from "@/lib/country-context"

export default function CountrySelector() {
  const { selectedCountry, setSelectedCountry, country } = useCountry()
  const [isOpen, setIsOpen] = useState(false)

  const handleCountrySelect = (countryCode: CountryCode) => {
    setSelectedCountry(countryCode)
    setIsOpen(false)
  }

  return null
}
