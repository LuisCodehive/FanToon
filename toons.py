from openai import OpenAI

client = OpenAI(api_key="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")
import requests
from fpdf import FPDF
from PIL import Image
from io import BytesIO
import os
import time
import firebase_admin
from firebase_admin import credentials, firestore
from ftplib import FTP_TLS
cred = credentials.Certificate("./caricatura-86cc1-firebase-adminsdk-fbsvc-ffb22b5fde.json")
firebase_admin.initialize_app(cred)
import boto3
db = firestore.client()
import base64
# Configura tu clave de API
  # Reemplaza con tu clave real de OpenAI



def upload_via_ftps(host, user, passwd, local_path, remote_filename=None):
    remote_filename = remote_filename or local_path.split("/")[-1]
    with FTP_TLS(host, user, passwd) as ftp:
        ftp.prot_p()  # activa protección TLS en datos
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_filename}', f)
    print("✅ Archivo subido via FTPS (TLS).")


def upload_pdf_to_s3(file_path, bucket_name, object_name):

    try:
        
        # Crear un cliente S3 con las credenciales proporcionadas
        s3_client = boto3.client(
            's3',
            aws_access_key_id="AKIA4SZHNUEBMCPWM4PB",
            aws_secret_access_key="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",
            region_name="us-west-2"
        )
        

        # Crear un cliente S3

        

        # Subir el archivo al bucket
        s3_client.upload_file(
            Filename=file_path,
            Bucket=bucket_name,
            Key=object_name,
            ExtraArgs={'ContentType': 'application/pdf'}  # Especificar el tipo MIME
        )
        
        # Obtener la URL del archivo subido
        location = s3_client.get_bucket_location(Bucket=bucket_name)['LocationConstraint']
        url = f"https://{bucket_name}.s3.{location}.amazonaws.com/{object_name}"
        
        return url
    except NoCredentialsError:
        return "Error: No se encontraron credenciales de AWS."
    except Exception as e:
        return f"Error al cargar el archivo: {str(e)}"
        
def generar_textos(nombre, tipo, club=None, jugadores=None, trofeo=None, dt=None, profesion=None):
    if tipo.lower() == "deporte":
        prompt = f"""
        
        Escribí un cuento infantil dividido en 3 escenas, cada una con una narración breve (3 a 5 líneas).
        El protagonista se llama {nombre}, es fanático de {club} y sueña con ganar la {trofeo}.
        Sus ídolos son {jugadores} y su director técnico favorito es {dt}.
        La historia debe comenzar con {nombre} soñando con el club y terminar levantando la {trofeo}.
        Estilo: cuento infantil, en español, con tono positivo.

        
        """
    else:
        prompt = f"""
        Escribí un cuento infantil dividido en 11 escenas, cada una con una narración breve (3 a 5 líneas).
        El protagonista se llama {nombre} y sueña con ser {profesion}.
        La historia debe comenzar con {nombre} de niño/a soñando con esa profesión, y terminar logrando un gran objetivo.
        Estilo: cuento infantil, en español, con tono positivo.
        """

    respuesta = client.chat.completions.create(model="gpt-4",
    messages=[
        {"role": "system", "content": "Sos un autor de cuentos infantiles."},
        {"role": "user", "content": prompt}
    ])

    texto = respuesta.choices[0].message.content
    escenas = [line.strip() for line in texto.split("\n") if line.strip()]
    return escenas


def generar_personaje(img,id):
    try:
        # Quitar el prefijo "data:image/jpeg;base64,"
        if img.startswith("data:image"):
            header, base64_data = img.split(",", 1)
        else:
            base64_data = img  # Por si ya viene limpio

        # Guardar imagen temporal desde base64
        with open(f"{id}.jpg", "wb") as f:
            f.write(base64.b64decode(base64_data))

        result = client.images.edit(
            model="gpt-image-1",
            image=[
                open(f"{id}.jpg", "rb")
            ],
            prompt="Creame un personaje de caricatura para libros de colorear con esta foto"
        )

        image_base64 = result.data[0].b64_json
        image_bytes = base64.b64decode(image_base64)



        # Save the image to a file
        with open(f"{id}.jpg", "wb") as f:
            f.write(image_bytes)
    
    except Exception as e:
        print(f"Error generando Personaje: {e}")
        return None


def generar_imagenv2(prompt,id):
    try:

        result = client.images.edit(
            model="gpt-image-1",
            image=[
                open(f"{id}.jpg", "rb")
            ],
            prompt=prompt
        )

        image_base64 = result.data[0].b64_json
        #image_bytes = base64.b64decode(image_base64)


        return image_base64
        # Save the image to a file
        # with open("gift-basket.png", "wb") as f:
        #     f.write(image_bytes)
    
    except Exception as e:
        print(f"Error generando imagen: {e}")
        return None
    
def generar_imagen(prompt):
    try:


        respuesta = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                n=1,
                size="1024x1024"
            )
        # result = client.images.edit(
        #     model="dall-e-2",
        #     n=1,
        #     size="1024x1024",
        #     image=[
        #         open("personaje.jpg", "rb")
        #     ],
        #     prompt=prompt
        # )
        return respuesta.data[0].url
    except Exception as e:
        print(f"Error generando imagen: {e}")
        return None

def crear_pdf(nombre_libro, escenas, urls_imagenes):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_font("Arial", size=12)

    for i, (texto, url) in enumerate(zip(escenas, urls_imagenes)):
        pdf.add_page()

        if url:
            try:
                img_data = requests.get(url).content
                img = Image.open(BytesIO(img_data))
                img_path = f"temp_{i}.jpg"
                img.save(img_path)

                pdf.image(img_path, x=10, y=20, w=120)
                os.remove(img_path)
            except Exception as e:
                print(f"No se pudo cargar la imagen {i}: {e}")

        pdf.set_xy(135, 20)
        pdf.multi_cell(60, 10, texto)

    output_path = f"{nombre_libro}.pdf"
    pdf.output(output_path)
    return output_path

def crear_pdfv2(nombre_libro, escenas, imagenes_base64):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_font("Arial", size=12)

    for i, (texto, b64_img) in enumerate(zip(escenas, imagenes_base64)):
        pdf.add_page()

        if b64_img:
            try:
                # Eliminar el encabezado si viene con "data:image/..."
                if b64_img.startswith("data:image"):
                    b64_img = b64_img.split(",", 1)[1]

                img_data = base64.b64decode(b64_img)
                img = Image.open(BytesIO(img_data))

                # Convertir a formato compatible con FPDF si es necesario
                if img.mode in ("RGBA", "P"):  
                    img = img.convert("RGB")

                img_path = f"temp_{i}.jpg"
                img.save(img_path)

                pdf.image(img_path, x=10, y=20, w=120)
                os.remove(img_path)

            except Exception as e:
                print(f"No se pudo cargar la imagen {i}: {e}")

        pdf.set_xy(135, 20)
        pdf.multi_cell(60, 10, texto)

    output_path = f"{nombre_libro}.pdf"
    pdf.output(output_path)
    return output_path

# Ejemplo de uso
def ejecutar_proceso():

    query = db.collection('pre_orders').where('status', '==', 'draft').stream()

    for doc in query:
        
        data = doc.to_dict()
 
        child_name = data.get("bookDetails", {}).get("childName")
        storyType = data.get("bookDetails", {}).get("storyType")
        club = data.get("bookDetails", {}).get("team").get("name")
        players = data.get("bookDetails", {}).get("players")
        dt = data.get("bookDetails", {}).get("coach")
        escenas = generar_textos(
            nombre=child_name,
            tipo="deporte",
            club=club,
            jugadores=players[0],
            trofeo="Copa Libertadores",
            dt=dt
        )

        generar_personaje(data.get("photo"),doc.id)
        imagenes = []
        escenas = [escena for escena in escenas if escena and escena.strip() != ""]
        for escena in escenas:
            prompt = f"Utiliza el personaje de la imagen, Ilustración en blanco y negro estilo libro para colorear de un {storyType} con {child_name} como protagonista. La historia es la siguiente: {escena}"
            url = generar_imagenv2(prompt,doc.id)
            imagenes.append(url)
            time.sleep(1)  # Pequeño delay para no saturar la API

        #ruta_pdf = crear_pdf(doc.id, escenas, imagenes)
        ruta_pdf = crear_pdfv2(doc.id, escenas, imagenes)
        print(f"✅ Libro generado: {ruta_pdf}")

        # Referencia al documento que querés actualizar
        doc_ref = db.collection('pre_orders').document(doc.id)
        doc_ref.update({
            'status': 'generate_ok'
        })

        upload_pdf_to_s3(ruta_pdf,"toonfan",ruta_pdf)

        #upload_via_ftps("88.223.85.112", "u863888407.darkgoldenrod-mosquito-856388.hostingersite.com", "Lu25gomez@", ruta_pdf)



# Loop que ejecuta cada X minutos
if __name__ == "__main__":
    while True:
        print("⏳ Ejecutando generación de libros...")
        
        ejecutar_proceso()
        print("🕒 Esperando 5 minutos...")
        time.sleep(5 * 60)  # Espera de 5 minutos