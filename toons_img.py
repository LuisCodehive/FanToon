from diffusers import StableDiffusionImg2ImgPipeline
from PIL import Image
import torch

# Cargar el modelo
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

# Cargar la imagen base
init_image = Image.open("personaje.jpg").convert("RGB").resize((512, 512))

# Prompt con la escena
prompt = "A cartoon-style young hero with red cape in a magical forest, fantasy background"

# Generar imagen
result = pipe(prompt=prompt, image=init_image, strength=0.75, guidance_scale=7.5).images[0]

# Guardar resultado
result.save("output.png")
