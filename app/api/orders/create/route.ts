import { NextResponse } from "next/server"
import { createOrder } from "@/lib/firebase/orders"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const userId = formData.get("userId")?.toString()
    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 })
    }

    const orderData = {
      customerName: formData.get("customerName")?.toString(),
      customerEmail: formData.get("customerEmail")?.toString(),
      customerPhone: formData.get("customerPhone")?.toString(),
      storyType: formData.get("storyType")?.toString(),
      childName: formData.get("childName")?.toString(),
      team: JSON.parse(formData.get("team")?.toString() || "{}"),
      coach: formData.get("coach")?.toString(),
      trophy: formData.get("trophy")?.toString(),
      players: JSON.parse(formData.get("players")?.toString() || "[]"),
      productType: formData.get("productType")?.toString(),
      productTitle: formData.get("productTitle")?.toString(),
      productPrice: parseFloat(formData.get("productPrice")?.toString() || "0"),
      quantity: parseInt(formData.get("quantity")?.toString() || "1"),
      paymentTotal: parseFloat(formData.get("paymentTotal")?.toString() || "0"),
      paymentMethod: formData.get("paymentMethod")?.toString(),
      preOrderId: formData.get("preOrderId")?.toString(),
    }

    const orderId = await createOrder({ ...orderData, userId })

    return NextResponse.json({ orderId }, { status: 201 })
  } catch (error) {
    console.log("[ORDER_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

