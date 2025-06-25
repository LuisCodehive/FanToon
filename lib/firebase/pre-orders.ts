import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "./config"
import type { PreOrder } from "./types"

export async function createPreOrder(preOrderData: Omit<PreOrder, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "pre_orders"), {
      ...preOrderData,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString(),
    })

    return docRef.id
  } catch (error) {
    console.error("Error creating pre-order:", error)
    throw new Error("Failed to create pre-order")
  }
}

export async function getPreOrder(preOrderId: string): Promise<PreOrder | null> {
  try {
    const docRef = doc(db, "pre_orders", preOrderId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PreOrder
    }

    return null
  } catch (error) {
    console.error("Error getting pre-order:", error)
    throw new Error("Failed to get pre-order")
  }
}

export async function updatePreOrder(preOrderId: string, updates: Partial<PreOrder>): Promise<void> {
  try {
    const docRef = doc(db, "pre_orders", preOrderId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now().toDate().toISOString(),
    })
  } catch (error) {
    console.error("Error updating pre-order:", error)
    throw new Error("Failed to update pre-order")
  }
}

export async function getUserPreOrders(userId: string): Promise<PreOrder[]> {
  try {
    const q = query(collection(db, "pre_orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PreOrder[]
  } catch (error) {
    console.error("Error getting user pre-orders:", error)
    throw new Error("Failed to get user pre-orders")
  }
}

export async function convertPreOrderToOrder(preOrderId: string): Promise<void> {
  try {
    const docRef = doc(db, "pre_orders", preOrderId)
    await updateDoc(docRef, {
      status: "converted",
      updatedAt: Timestamp.now().toDate().toISOString(),
    })
  } catch (error) {
    console.error("Error converting pre-order:", error)
    throw new Error("Failed to convert pre-order")
  }
}
