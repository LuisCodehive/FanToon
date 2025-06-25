import { type NextRequest, NextResponse } from "next/server"
import { getQueueStatus } from "@/lib/firebase/admin-service"

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const queueStatus = await getQueueStatus()

    return NextResponse.json({ success: true, queueStatus })
  } catch (error) {
    console.error("Error getting queue status:", error)
    return NextResponse.json({ success: false, error: "Failed to get queue status" }, { status: 500 })
  }
}
