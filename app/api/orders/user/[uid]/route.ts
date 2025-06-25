import { type NextRequest, NextResponse } from "next/server"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Order } from "@/lib/firebase/types"

export async function GET(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const { uid } = params

    if (!uid) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Query orders for the specific user
    const ordersQuery = query(collection(db, "orders"), where("userId", "==", uid), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(ordersQuery)
    const orders: Order[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        payment: {
          ...data.payment,
          paidAt: data.payment?.paidAt?.toDate?.()?.toISOString() || data.payment?.paidAt,
        },
        estimatedDelivery: data.estimatedDelivery?.toDate?.()?.toISOString() || data.estimatedDelivery,
      } as Order)
    })

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    })
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}
