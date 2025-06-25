"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Camera, ZoomIn, ZoomOut, Crop, Check } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"

interface StepPhotoProps {
  value: File | null
  onChange: (photo:  string | null) => void
}

export default function StepPhoto({ value, onChange }: StepPhotoProps) {
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [zoom, setZoom] = useState(1)
  const imageRef = useRef<HTMLImageElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        //onChange(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
          onChange(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        alert("El archivo es muy grande. Máximo 5MB.")
      }
    } else {
      alert("Por favor selecciona una imagen válida (JPG, PNG)")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removePhoto = () => {
    onChange(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetEditing = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-xl font-semibold mb-2">Subí una foto del chico/la chica</h3>
        <p className="text-gray-600">Esta foto nos ayudará a crear ilustraciones más personalizadas</p>
      </div>

      {!value ? (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragOver ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-12 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Arrastrá tu foto acá</h3>
            <p className="text-gray-600 mb-4">o hacé clic para seleccionar</p>
            <Button variant="outline" className="mb-4">
              <Camera className="w-4 h-4 mr-2" />
              Seleccionar foto
            </Button>
            <p className="text-sm text-gray-500">JPG, PNG • Máximo 5MB</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {isEditing ? (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 mb-3 text-center">Editar foto</h3>

                <div
                  className="relative w-full h-64 overflow-hidden bg-gray-100 rounded-lg mx-auto mb-4"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {preview && (
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        cursor: isDragging ? "grabbing" : "grab",
                      }}
                    >
                      <img
                        ref={imageRef}
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <ZoomOut className="w-4 h-4 text-gray-500" />
                    <Slider
                      value={[zoom]}
                      min={0.5}
                      max={3}
                      step={0.1}
                      onValueChange={handleZoomChange}
                      className="flex-1"
                    />
                    <ZoomIn className="w-4 h-4 text-gray-500" />
                  </div>

                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="sm" onClick={resetEditing} className="text-gray-600">
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={() => setIsEditing(false)} className="bg-blue-600">
                      <Check className="w-4 h-4 mr-1" />
                      Aplicar cambios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  {preview && (
                    <div className="relative mb-4">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover mx-auto"
                      />
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-semibold text-green-800 mb-1">Foto subida correctamente</h3>
                    <p className="text-sm text-green-600 mb-3">{value.name}</p>
                    <p className="text-sm text-gray-600 mb-4">Tamaño: {(value.size / 1024 / 1024).toFixed(2)} MB</p>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 border-blue-600"
                      >
                        <Crop className="w-4 h-4 mr-1" />
                        Editar foto
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-green-600 border-green-600"
                      >
                        <Camera className="w-4 h-4 mr-1" />
                        Cambiar foto
                      </Button>
                      <Button variant="outline" size="sm" onClick={removePhoto} className="text-red-600 border-red-600">
                        <X className="w-4 h-4 mr-1" />
                        Quitar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos para la mejor foto:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Usá una foto clara y bien iluminada</li>
          <li>• Que se vea bien la carita del chico/a</li>
          <li>• Evitá fotos muy oscuras o borrosas</li>
          <li>• Una sonrisa siempre es perfecta 😊</li>
        </ul>
      </div>
    </div>
  )
}
