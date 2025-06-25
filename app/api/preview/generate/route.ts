import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const childName = searchParams.get("child") || "Protagonista"
  const teamName = searchParams.get("team") || "Equipo Favorito"

  // Generate a simple HTML preview
  const previewHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vista Previa - ${childName}</title>
      <style>
        body {
          font-family: 'Comic Sans MS', cursive;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 20px;
          min-height: 100vh;
        }
        .book-preview {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          overflow: hidden;
        }
        .cover {
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .title {
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
          font-size: 1.2em;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .page {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 5px solid #4ECDC4;
        }
        .character-name {
          color: #FF6B6B;
          font-weight: bold;
          font-size: 1.1em;
        }
        .team-name {
          color: #667eea;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f8f9fa;
          color: #666;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body>
      <div class="book-preview">
        <div class="cover">
          <div class="title">La Gran Aventura de ${childName}</div>
          <div class="subtitle">Una historia personalizada de fútbol</div>
        </div>
        
        <div class="content">
          <div class="page">
            <h3>🏆 El Sueño Comienza</h3>
            <p>
              <span class="character-name">${childName}</span> siempre soñó con jugar en 
              <span class="team-name">${teamName}</span> y levantar el trofeo más importante.
            </p>
            <p>
              Cada día entrenaba con dedicación, imaginando el momento en que podría 
              vestir la camiseta de su equipo favorito...
            </p>
          </div>

          <div class="page">
            <h3>⚽ El Entrenamiento</h3>
            <p>
              El entrenador vio algo especial en <span class="character-name">${childName}</span>. 
              "Tienes talento natural", le dijo, "pero el talento sin trabajo duro no es suficiente."
            </p>
            <p>
              Así comenzó la aventura más emocionante de su vida...
            </p>
          </div>

          <div class="page">
            <h3>🌟 El Gran Momento</h3>
            <p>
              Después de meses de entrenamiento, <span class="character-name">${childName}</span> 
              finalmente tuvo la oportunidad de demostrar todo lo que había aprendido.
            </p>
            <p>
              El estadio rugía con la emoción de miles de fanáticos de 
              <span class="team-name">${teamName}</span>...
            </p>
          </div>
        </div>

        <div class="footer">
          Esta es solo una vista previa de tu libro personalizado.<br>
          El libro completo tendrá muchas más páginas y aventuras emocionantes.
        </div>
      </div>
    </body>
    </html>
  `

  return new NextResponse(previewHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}
