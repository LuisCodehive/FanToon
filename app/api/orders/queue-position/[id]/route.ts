import { type NextRequest, NextResponse } from "next/server"
import { getQueuePosition } from "@/lib/firebase/orders"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const position = await getQueuePosition(params.id)

    return NextResponse.json({
      success: true,
      position: position > 0 ? position : null,
      message: position > 0 ? `Position ${position} in queue` : "Not in queue",
    })
  } catch (error) {
    console.error("Error getting queue position:", error)
    return NextResponse.json({ success: false, error: "Failed to get queue position" }, { status: 500 })
  }
}
