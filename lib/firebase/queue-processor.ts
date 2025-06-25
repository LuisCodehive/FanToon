import { collection, query, where, orderBy, limit, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "./config"
import type { QueueItem, FirebaseOrder } from "./types"
import { getOrder, updateOrderStatus } from "./orders"
import { sendGenerationStartedEmail, sendBookReadyEmail } from "./email"
import { uploadGeneratedBook } from "./storage"

const QUEUE_COLLECTION = "generation_queue"

export async function processQueue(): Promise<void> {
  try {
    // Get next item in queue
    const q = query(
      collection(db, QUEUE_COLLECTION),
      where("status", "==", "waiting"),
      orderBy("priority", "desc"),
      orderBy("createdAt", "asc"),
      limit(1),
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("No items in queue")
      return
    }

    const queueDoc = querySnapshot.docs[0]
    const queueItem = { id: queueDoc.id, ...queueDoc.data() } as QueueItem

    // Mark as processing
    await updateDoc(doc(db, QUEUE_COLLECTION, queueItem.id), {
      status: "processing",
      lastAttempt: serverTimestamp(),
    })

    // Get order details
    const order = await getOrder(queueItem.orderId)
    if (!order) {
      throw new Error(`Order ${queueItem.orderId} not found`)
    }

    // Update order status and send email
    await updateOrderStatus(queueItem.orderId, "generating", {
      generation: {
        startedAt: new Date(),
        attempts: queueItem.attempts + 1,
      },
    })

    await sendGenerationStartedEmail(order)

    // Generate book (this would call your AI service)
    const generatedBook = await generateBook(order)

    // Upload generated book
    const { url, path } = await uploadGeneratedBook(
      generatedBook.buffer,
      order.id,
      order.product.type === "pdf" ? "pdf" : "jpg",
    )

    // Update order with generated book info
    await updateOrderStatus(queueItem.orderId, "completed", {
      generation: {
        startedAt: order.generation?.startedAt,
        completedAt: new Date(),
        downloadUrl: url,
        attempts: queueItem.attempts + 1,
      },
    })

    // Mark queue item as completed
    await updateDoc(doc(db, QUEUE_COLLECTION, queueItem.id), {
      status: "completed",
    })

    // Send completion email
    const updatedOrder = await getOrder(queueItem.orderId)
    if (updatedOrder) {
      await sendBookReadyEmail(updatedOrder)
    }

    console.log(`Successfully processed order ${queueItem.orderId}`)
  } catch (error) {
    console.error("Error processing queue:", error)

    // Handle failed processing
    // Update queue item and order status
    // Send error notifications if needed
  }
}

async function generateBook(order: FirebaseOrder): Promise<{ buffer: Buffer }> {
  // This is where you would integrate with your AI book generation service
  // For now, we'll simulate the process

  console.log(`Generating book for order ${order.id}`)
  console.log(`Story type: ${order.bookDetails.storyType}`)
  console.log(`Child name: ${order.bookDetails.childName}`)

  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // In a real implementation, you would:
  // 1. Call your AI service with the order details
  // 2. Generate the personalized book
  // 3. Return the generated content as a buffer

  // For now, return a dummy buffer
  const dummyContent = `Generated book for ${order.bookDetails.childName}`
  return { buffer: Buffer.from(dummyContent) }
}

// Function to run the queue processor periodically
export function startQueueProcessor(intervalMs = 30000): NodeJS.Timeout {
  console.log("Starting queue processor...")

  return setInterval(async () => {
    try {
      await processQueue()
    } catch (error) {
      console.error("Queue processor error:", error)
    }
  }, intervalMs)
}
