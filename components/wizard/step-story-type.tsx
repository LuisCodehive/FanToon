"use client"

import { Card, CardContent } from "@/components/ui/card"
import { STORY_TYPES, type StoryType } from "@/lib/story-types"

interface StepStoryTypeProps {
  value: StoryType | null
  onChange: (storyType: StoryType) => void
}

export default function StepStoryType({ value, onChange }: StepStoryTypeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">¿Qué tipo de historia querés crear?</h3>
        <p className="text-gray-600">Elegí la aventura que más le guste al protagonista</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STORY_TYPES.map((story) => (
          <Card
            key={story.id}
            className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              value === story.id ? "border-cyan-500 bg-cyan-50 shadow-lg scale-105" : "hover:border-cyan-300"
            }`}
            onClick={() => onChange(story.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{story.emoji}</div>
              <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{story.description}</p>

              {value === story.id && (
                <div className="mt-4">
                  <div className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ✓ Seleccionado
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {value && (
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg text-center border border-cyan-200">
          <div className="text-4xl mb-2">{STORY_TYPES.find((s) => s.id === value)?.emoji}</div>
          <p className="text-cyan-800 font-semibold">
            ¡Excelente elección! Vamos a crear una historia increíble de{" "}
            <strong>{STORY_TYPES.find((s) => s.id === value)?.title}</strong>
          </p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        💡 Tip: Cada historia tiene páginas únicas diseñadas especialmente para esa aventura
      </div>
    </div>
  )
}
