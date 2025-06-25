import { type NextRequest, NextResponse } from "next/server"
import { getOrder, updateOrderStatus } from "@/lib/firebase/orders"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await getOrder(params.id)

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Error getting order:", error)
    return NextResponse.json({ success: false, error: "Failed to get order" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, ...additionalData } = body

    await updateOrderStatus(params.id, status, additionalData)

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}
