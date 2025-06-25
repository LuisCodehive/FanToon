"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCountry } from "@/lib/country-context"

interface StepNameProps {
  value: string
  onChange: (name: string) => void
}

export default function StepName({ value, onChange }: StepNameProps) {
  const { getText } = useCountry()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">👦👧</div>
        <h3 className="text-xl font-semibold mb-2">{getText("childProtagonist")}</h3>
        <p className="text-gray-600">Este nombre aparecerá en todas las páginas del libro</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="childName">{getText("childName")}</Label>
        <Input
          id="childName"
          placeholder="Ej: Mateo, Sofía, Valentina..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-center text-lg py-6"
          maxLength={20}
        />
        <p className="text-sm text-gray-500 text-center">Máximo 20 caracteres</p>
      </div>

      {value && (
        <div className="bg-sky-50 p-4 rounded-lg text-center">
          <p className="text-sky-800">{getText("successName").replace("{name}", value)}</p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">{getText("tipName")}</div>
    </div>
  )
}
