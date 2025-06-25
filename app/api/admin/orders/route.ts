import { type NextRequest, NextResponse } from "next/server"
import { getAllOrders } from "@/lib/firebase/orders"

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const orders = await getAllOrders()

    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error) {
    console.error("Error getting orders:", error)
    return NextResponse.json({ success: false, error: "Failed to get orders" }, { status: 500 })
  }
}
