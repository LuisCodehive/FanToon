import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./config"
import type { EmailNotification, FirebaseOrder } from "./types"

const EMAIL_COLLECTION = "email_notifications"

export async function sendOrderConfirmationEmail(order: FirebaseOrder): Promise<void> {
  const emailData: Omit<EmailNotification, "id" | "createdAt"> = {
    orderId: order.id,
    type: "order_created",
    email: order.customer.email,
    subject: `¡Pedido confirmado! - Libro personalizado para ${order.bookDetails.childName}`,
    content: generateOrderConfirmationContent(order),
    status: "pending",
  }

  await addDoc(collection(db, EMAIL_COLLECTION), {
    ...emailData,
    createdAt: serverTimestamp(),
  })
}

export async function sendPaymentConfirmationEmail(order: FirebaseOrder): Promise<void> {
  const emailData: Omit<EmailNotification, "id" | "createdAt"> = {
    orderId: order.id,
    type: "payment_confirmed",
    email: order.customer.email,
    subject: `¡Pago confirmado! - Tu libro está en cola de generación`,
    content: generatePaymentConfirmationContent(order),
    status: "pending",
  }

  await addDoc(collection(db, EMAIL_COLLECTION), {
    ...emailData,
    createdAt: serverTimestamp(),
  })
}

export async function sendGenerationStartedEmail(order: FirebaseOrder): Promise<void> {
  const emailData: Omit<EmailNotification, "id" | "createdAt"> = {
    orderId: order.id,
    type: "generation_started",
    email: order.customer.email,
    subject: `¡Estamos creando tu libro! - ${order.bookDetails.childName}`,
    content: generateGenerationStartedContent(order),
    status: "pending",
  }

  await addDoc(collection(db, EMAIL_COLLECTION), {
    ...emailData,
    createdAt: serverTimestamp(),
  })
}

export async function sendBookReadyEmail(order: FirebaseOrder): Promise<void> {
  const emailData: Omit<EmailNotification, "id" | "createdAt"> = {
    orderId: order.id,
    type: "book_ready",
    email: order.customer.email,
    subject: `¡Tu libro está listo! - ${order.bookDetails.childName}`,
    content: generateBookReadyContent(order),
    status: "pending",
  }

  await addDoc(collection(db, EMAIL_COLLECTION), {
    ...emailData,
    createdAt: serverTimestamp(),
  })
}

function generateOrderConfirmationContent(order: FirebaseOrder): string {
  return `
    <h2>¡Hola ${order.customer.name}!</h2>
    
    <p>¡Gracias por tu pedido! Hemos recibido tu solicitud para crear un libro personalizado para <strong>${order.bookDetails.childName}</strong>.</p>
    
    <h3>Detalles del pedido:</h3>
    <ul>
      <li><strong>Número de pedido:</strong> ${order.id}</li>
      <li><strong>Tipo de historia:</strong> ${order.bookDetails.storyType}</li>
      <li><strong>Producto:</strong> ${order.product.title}</li>
      <li><strong>Cantidad:</strong> ${order.product.quantity}</li>
      <li><strong>Total:</strong> $${order.payment.total.toLocaleString()} ARS</li>
    </ul>
    
    <p>Te avisaremos por email cuando confirmemos el pago y cuando tu libro esté listo.</p>
    
    <p>¡Gracias por elegirnos!</p>
    <p>El equipo de Libros Personalizados</p>
  `
}

function generatePaymentConfirmationContent(order: FirebaseOrder): string {
  return `
    <h2>¡Pago confirmado, ${order.customer.name}!</h2>
    
    <p>¡Excelente! Hemos confirmado tu pago y tu libro para <strong>${order.bookDetails.childName}</strong> ya está en cola de generación.</p>
    
    <h3>¿Qué sigue ahora?</h3>
    <ol>
      <li>Tu libro está en cola de generación</li>
      <li>Nuestro sistema de IA creará el libro personalizado</li>
      <li>Te avisaremos cuando esté listo (generalmente en 24-48 horas)</li>
      ${order.product.type !== "pdf" ? "<li>Si elegiste libro físico, lo enviaremos a tu dirección</li>" : ""}
    </ol>
    
    <p><strong>Número de pedido:</strong> ${order.id}</p>
    
    <p>¡Gracias por tu paciencia!</p>
    <p>El equipo de Libros Personalizados</p>
  `
}

function generateGenerationStartedContent(order: FirebaseOrder): string {
  return `
    <h2>¡Ya estamos creando tu libro, ${order.customer.name}!</h2>
    
    <p>¡Buenas noticias! Nuestro sistema de IA ya comenzó a crear el libro personalizado para <strong>${order.bookDetails.childName}</strong>.</p>
    
    <p>El proceso de generación puede tomar entre 2 a 6 horas. Te avisaremos en cuanto esté listo.</p>
    
    <p><strong>Número de pedido:</strong> ${order.id}</p>
    
    <p>¡Pronto tendrás tu libro único!</p>
    <p>El equipo de Libros Personalizados</p>
  `
}

function generateBookReadyContent(order: FirebaseOrder): string {
  const isDigital = order.product.type === "pdf"

  return `
    <h2>¡Tu libro está listo, ${order.customer.name}!</h2>
    
    <p>¡Increíble! El libro personalizado para <strong>${order.bookDetails.childName}</strong> ya está terminado.</p>
    
    ${
      isDigital
        ? `
      <p><strong>Tu libro digital está disponible para descarga:</strong></p>
      <p><a href="${order.generation?.downloadUrl}" style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Descargar mi libro</a></p>
      
      <p><em>El enlace de descarga estará disponible por 30 días.</em></p>
    `
        : `
      <p>Tu libro físico ya está en producción y será enviado a:</p>
      <p><strong>${order.shipping?.address} ${order.shipping?.addressNumber}<br>
      ${order.shipping?.city}, ${order.shipping?.province}</strong></p>
      
      <p>Tiempo estimado de entrega: ${order.shipping?.estimatedDays}</p>
    `
    }
    
    <p><strong>Número de pedido:</strong> ${order.id}</p>
    
    <p>¡Esperamos que disfrutes tu libro personalizado!</p>
    <p>El equipo de Libros Personalizados</p>
  `
}
