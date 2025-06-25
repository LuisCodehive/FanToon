import { db } from "../firebase/config"
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, getDocs } from "firebase/firestore"

export interface Order {
  id: string
  items: { productId: string; quantity: number }[]
  totalAmount: number
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: any // Timestamp
  updatedAt: any // Timestamp
  userId: string
}

export const createOrder = async (
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt"> & { userId: string },
): Promise<string> => {
  try {

    console.log("orderData",orderData)
    const ordersCollection = collection(db, "orders")
    const order: Omit<Order, "id"> = {
      ...orderData,
      userId: orderData.userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    const docRef = await addDoc(ordersCollection, order)
    return docRef.id
  } catch (error: any) {
    console.error("Error creating order:", error)
    throw new Error(error.message || "Failed to create order")
  }
}

export const getOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const orderDoc = doc(db, "orders", orderId)
    const docSnap = await getDoc(orderDoc)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Order
    } else {
      return null
    }
  } catch (error: any) {
    console.error("Error fetching order:", error)
    throw new Error(error.message || "Failed to fetch order")
  }
}

export const updateOrder = async (orderId: string, updates: Partial<Order>): Promise<void> => {
  try {
    const orderDoc = doc(db, "orders", orderId)
    await updateDoc(orderDoc, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error: any) {
    console.error("Error updating order:", error)
    throw new Error(error.message || "Failed to update order")
  }
}

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersCol = collection(db, "orders")
    const snapshot = await getDocs(ordersCol)

    const orders: Order[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[]

    return orders
  } catch (error: any) {
    console.error("Error fetching orders:", error)
    throw new Error(error.message || "Failed to fetch orders")
  }
}
