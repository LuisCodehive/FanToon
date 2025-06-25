import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Crea el libro para colorear perfecto.
                <span className="text-orange-500">Se el protagonista de tu sueño favorito.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Generá un libro personalizado de 11 páginas donde tu hijo/a será el protagonista. ¡Una experiencia única
                e inolvidable!
              </p>
            </div>

            {/* Story Options Preview */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🌟 Elegí la aventura perfecta</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                <div className="text-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <div className="text-2xl mb-1">⚽</div>
                  <span className="text-xs font-medium text-gray-700">Fútbol</span>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="text-2xl mb-1">🏀</div>
                  <span className="text-xs font-medium text-gray-700">Básquet</span>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <div className="text-2xl mb-1">🏉</div>
                  <span className="text-xs font-medium text-gray-700">Rugby</span>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <div className="text-2xl mb-1">🚀</div>
                  <span className="text-xs font-medium text-gray-700">Astronauta</span>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <div className="text-2xl mb-1">🚒</div>
                  <span className="text-xs font-medium text-gray-700">Bombero</span>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <div className="text-2xl mb-1">🎭</div>
                  <span className="text-xs font-medium text-gray-700">Actriz</span>
                </div>
              </div>
              <p className="text-center text-sm text-orange-500 font-medium mt-3">
                ✨ Y muchas aventuras más para elegir
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">Más de 1,000 familias re contentas</span>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-orange-500">$4,999</span>
                    </div>
                    <span className="text-orange-500 font-semibold">Libro digital PDF</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Descarga inmediata</p>
                    <p className="text-sm text-orange-500 font-semibold">¡Calidad premium!</p>
                  </div>
                </div>
              </div>

              <Link href="/crear">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white py-6 text-xl font-semibold"
                >
                  🎨 Crear mi libro ahora
                </Button>
              </Link>

              <p className="text-center text-sm text-gray-500">
                ✅ Sin suscripciones • ✅ Pago único • ✅ Descarga inmediata
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Ejemplo de libro de colorear personalizado"
                width={400}
                height={600}
                className="rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                ¡Nuevo!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Qué incluye tu libro de aventuras?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Personaliza una historia única con la aventura que más le guste a tu hijo/a
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-orange-500">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-semibold mb-2">11 Páginas únicas</h3>
              <p className="text-sm text-gray-600">Cada página cuenta una historia diferente</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-blue-500">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="font-semibold mb-2">Protagonista personalizado</h3>
              <p className="text-sm text-gray-600">Tu hijo/a será el héroe de la historia</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-green-500">
              <div className="text-3xl mb-3">🌈</div>
              <h3 className="font-semibold mb-2">Múltiples aventuras</h3>
              <p className="text-sm text-gray-600">Fútbol, astronauta, bombero y más</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-yellow-500">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Experiencias mágicas</h3>
              <p className="text-sm text-gray-600">Historias que inspiran e ilusionan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen las familias</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-l-4 border-orange-500">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "¡Increíble! Mi hijo no para de colorear su libro. Se emociona cada vez que ve a Messi junto a él."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full"></div>
                  <div>
                    <p className="font-semibold">María González</p>
                    <p className="text-sm text-gray-500">Mamá de Tomás (7 años)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-blue-500">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "El regalo perfecto para mi sobrina. La calidad de las ilustraciones es excelente."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Carlos Rodríguez</p>
                    <p className="text-sm text-gray-500">Tío de Sofía (5 años)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-green-500">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "Súper fácil de crear y el resultado superó nuestras expectativas. ¡Recomendado!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Ana Martínez</p>
                    <p className="text-sm text-gray-500">Mamá de Lucas (6 años)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              ¿Estás listo para crear una experiencia inolvidable?
            </h2>
            <p className="text-xl text-orange-100">
              Miles de chicos ya disfrutan de sus libros personalizados. ¡Tu chico/a puede ser el próximo!
            </p>
            <Link href="/crear">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 py-6 px-12 text-xl font-semibold">
                🎨 Crear mi libro ahora
              </Button>
            </Link>
            <p className="text-orange-100 text-sm">⏱️ Solo te lleva 5 minutos • 💳 Pago seguro con MercadoPago</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/toonfan-logo.png"
                  alt="ToonFan Logo"
                  width={120}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400">Creando momentos mágicos a través del arte y la imaginación.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-orange-400">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#como-funciona" className="hover:text-orange-400">
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link href="#ejemplos" className="hover:text-orange-400">
                    Ejemplos
                  </Link>
                </li>
                <li>
                  <Link href="/precios" className="hover:text-orange-400">
                    Precios
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/ayuda" className="hover:text-blue-400">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-blue-400">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-blue-400">
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-green-400">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 hola@toonfan.com</li>
                <li>📱 WhatsApp: +54 9 11 1234-5678</li>
                <li>🕒 Lun-Vie 9:00-18:00</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ToonFan. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
