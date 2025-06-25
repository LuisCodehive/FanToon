import { type NextRequest, NextResponse } from "next/server"
import { getPreOrder } from "@/lib/firebase/pre-orders"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const preOrderId = params.id
    const preOrder = await getPreOrder(preOrderId)

    if (!preOrder) {
      return NextResponse.json({ success: false, error: "Pre-order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      preOrder,
    })
  } catch (error) {
    console.error("Error getting pre-order:", error)
    return NextResponse.json({ success: false, error: "Failed to get pre-order" }, { status: 500 })
  }
}
