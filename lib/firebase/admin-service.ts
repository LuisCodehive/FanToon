import { collection, query, where, orderBy, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./config"
import type { FirebaseOrder } from "./types"

export async function getOrdersForAdmin(status?: string, limit = 50): Promise<FirebaseOrder[]> {
  try {
    let q = query(collection(db, "orders"), orderBy("createdAt", "desc"))

    if (status) {
      q = query(collection(db, "orders"), where("status", "==", status), orderBy("createdAt", "desc"))
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as FirebaseOrder)
  } catch (error) {
    console.error("Error getting orders for admin:", error)
    throw new Error("Failed to get orders")
  }
}

export async function getQueueStatus(): Promise<{
  waiting: number
  processing: number
  completed: number
  failed: number
}> {
  try {
    const queueRef = collection(db, "generation_queue")

    const [waitingSnap, processingSnap, completedSnap, failedSnap] = await Promise.all([
      getDocs(query(queueRef, where("status", "==", "waiting"))),
      getDocs(query(queueRef, where("status", "==", "processing"))),
      getDocs(query(queueRef, where("status", "==", "completed"))),
      getDocs(query(queueRef, where("status", "==", "failed"))),
    ])

    return {
      waiting: waitingSnap.size,
      processing: processingSnap.size,
      completed: completedSnap.size,
      failed: failedSnap.size,
    }
  } catch (error) {
    console.error("Error getting queue status:", error)
    throw new Error("Failed to get queue status")
  }
}

export async function updateOrderNotes(orderId: string, notes: string): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, {
      adminNotes: notes,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating order notes:", error)
    throw new Error("Failed to update order notes")
  }
}
