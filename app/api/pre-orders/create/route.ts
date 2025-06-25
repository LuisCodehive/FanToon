import { type NextRequest, NextResponse } from "next/server"
import { createPreOrder, updatePreOrder } from "@/lib/firebase/pre-orders"
import { uploadPhoto } from "@/lib/firebase/storage"
import type { PreOrder } from "@/lib/firebase/types"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const userId = formData.get("userId") as string
    const storyType = formData.get("storyType") as string
    const childName = formData.get("childName") as string
    const team = formData.get("team") ? JSON.parse(formData.get("team") as string) : null
    const coach = formData.get("coach") as string
    const trophy = formData.get("trophy") as string
    const players = formData.get("players") ? JSON.parse(formData.get("players") as string) : []
    const photo = formData.get("photo") as string 

    // Validate required fields
    if (!userId || !childName || !storyType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create pre-order data
    const preOrderData: Omit<PreOrder, "id" | "createdAt" | "updatedAt"> = {
      userId,
      photo,
      bookDetails: {
        storyType,
        childName,
        team,
        coach,
        trophy,
        players,
      },
      status: "draft",
    }

    // Create pre-order first
    const preOrderId = await createPreOrder(preOrderData)

    // Upload photo if provided
    // if (photo) {
    //   try {
    //     const { url, path } = await uploadPhoto(photo, preOrderId)
    //     // Update pre-order with photo info
    //     preOrderData.bookDetails.photoUrl = url
    //     preOrderData.bookDetails.photoPath = path
    //   } catch (error) {
    //     console.error("Error uploading photo:", error)
    //     // Continue without photo
    //   }
    // }
    preOrderData.photo = photo
    // Generate preview (simulate for now)
    const previewUrl = await generateBookPreview(preOrderData.bookDetails)

    // Update pre-order with preview
    // await updatePreOrder(preOrderId, {
    //   previewUrl,
    //   status: "preview_ready",
    // })

    return NextResponse.json({
      success: true,
      preOrderId,
      previewUrl,
      message: "Pre-order created successfully",
    })
  } catch (error) {
    console.error("Error creating pre-order:", error)
    return NextResponse.json({ success: false, error: "Failed to create pre-order" }, { status: 500 })
  }
}

// Simulate book preview generation
async function generateBookPreview(bookDetails: any): Promise<string> {
  // In a real implementation, this would:
  // 1. Generate actual book pages with the personalized content
  // 2. Create a PDF preview
  // 3. Upload to storage and return URL

  // For now, return a placeholder
  return `/api/preview/generate?child=${encodeURIComponent(bookDetails.childName)}&team=${encodeURIComponent(bookDetails.team?.name || "")}`
}
