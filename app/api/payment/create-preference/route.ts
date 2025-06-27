import { type NextRequest, NextResponse } from "next/server"
import { createPaymentPreference, parsePhoneNumber, formatOrderReference } from "@/lib/mercadopago/service"
import type { MercadoPagoPreference } from "@/lib/mercadopago/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { orderId,preOrderId, customerName, customerEmail, customerPhone, items, shippingCost = 0, shippingAddress } = body

    // Validate required fields
    if (!orderId || !customerName || !customerEmail || !items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Parse customer name
    const nameParts = customerName.trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    // Parse phone number
    const phoneData = customerPhone ? parsePhoneNumber(customerPhone) : undefined

    // Build preference data
    const preferenceData: MercadoPagoPreference = {
      items: items.map((item: any) => ({
        id: item.id || "book",
        title: item.title,
        description: item.description || "",
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: "ARS",
      })),
      payer: {
        name: firstName,
        surname: lastName,
        email: customerEmail,
        ...(phoneData && { phone: phoneData }),
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pago/exito?order=${preOrderId}`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pago/error?order=${preOrderId}`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pago/pendiente?order=${preOrderId}`,
      },
      auto_return: "approved",
      external_reference: formatOrderReference(orderId),
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/webhook`,
      statement_descriptor: "LIBRO PERSONALIZADO",
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }

    // Add shipping if provided
    if (shippingCost > 0 && shippingAddress) {
      preferenceData.items.push({
        id: "shipping",
        title: "Envío",
        description: `Envío a ${shippingAddress.city}, ${shippingAddress.province}`,
        quantity: 1,
        unit_price: shippingCost,
        currency_id: "ARS",
      })

      preferenceData.shipments = {
        cost: shippingCost,
        mode: "custom",
        receiver_address: {
          zip_code: shippingAddress.postalCode || "1000",
          street_name: shippingAddress.address,
          street_number: Number.parseInt(shippingAddress.addressNumber) || 1,
          floor: shippingAddress.floor || undefined,
          apartment: shippingAddress.apartment || undefined,
          city_name: shippingAddress.city,
          state_name: shippingAddress.province,
          country_name: "Argentina",
        },
      }
    }

    const result = await createPaymentPreference(preferenceData)

    if (result.success) {

console.log("Payment preference created successfully:", result)
      return NextResponse.json({
        success: true,
        preference_id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating payment preference:", error)
    return NextResponse.json({ success: false, error: "Failed to create payment preference" }, { status: 500 })
  }
}
