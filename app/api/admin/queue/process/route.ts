import { type NextRequest, NextResponse } from "next/server"
import { processQueue } from "@/lib/firebase/queue-processor"

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication here
    const authHeader = request.headers.get("authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await processQueue()

    return NextResponse.json({
      success: true,
      message: "Queue processed successfully",
    })
  } catch (error) {
    console.error("Error processing queue:", error)
    return NextResponse.json({ success: false, error: "Failed to process queue" }, { status: 500 })
  }
}
