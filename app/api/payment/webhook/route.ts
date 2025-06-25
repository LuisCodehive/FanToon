import { type NextRequest, NextResponse } from "next/server"
import { getPaymentInfo, extractOrderIdFromReference } from "@/lib/mercadopago/service"
import { updateOrderStatus, getOrder, addToGenerationQueue } from "@/lib/firebase/orders"
import { sendPaymentConfirmationEmail } from "@/lib/firebase/email"
import type { MercadoPagoWebhook } from "@/lib/mercadopago/types"

export async function POST(request: NextRequest) {
  try {
    // Verify webhook authenticity (optional but recommended)
    const signature = request.headers.get("x-signature")
    const requestId = request.headers.get("x-request-id")

    // Parse webhook data
    const webhookData: MercadoPagoWebhook = await request.json()

    console.log("MercadoPago Webhook received:", {
      type: webhookData.type,
      action: webhookData.action,
      paymentId: webhookData.data?.id,
    })

    // Only process payment webhooks
    if (webhookData.type !== "payment") {
      return NextResponse.json({ success: true, message: "Webhook type not processed" })
    }

    // Get payment details from MercadoPago
    const paymentInfo = await getPaymentInfo(webhookData.data.id)

    if (!paymentInfo) {
      console.error("Payment not found:", webhookData.data.id)
      return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 })
    }

    // Extract order ID from external reference
    const orderId = extractOrderIdFromReference(paymentInfo.external_reference)

    if (!orderId) {
      console.error("Invalid external reference:", paymentInfo.external_reference)
      return NextResponse.json({ success: false, error: "Invalid external reference" }, { status: 400 })
    }

    // Get order from database
    const order = await getOrder(orderId)

    if (!order) {
      console.error("Order not found:", orderId)
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    // Process payment status
    let newOrderStatus: string
    let shouldAddToQueue = false
    let shouldSendEmail = false

    switch (paymentInfo.status) {
      case "approved":
        newOrderStatus = "processing"
        shouldAddToQueue = true
        shouldSendEmail = true
        break

      case "pending":
      case "in_process":
        newOrderStatus = "payment_pending"
        break

      case "rejected":
      case "cancelled":
        newOrderStatus = "payment_failed"
        break

      case "refunded":
      case "charged_back":
        newOrderStatus = "refunded"
        break

      default:
        newOrderStatus = "payment_pending"
    }

    // Update order with payment information
    await updateOrderStatus(orderId, newOrderStatus as any, {
      payment: {
        status: paymentInfo.status === "approved" ? "completed" : "pending",
        method: "MercadoPago",
        transactionId: paymentInfo.id.toString(),
        amount: paymentInfo.transaction_amount,
        currency: paymentInfo.currency_id,
        paidAt: paymentInfo.date_approved ? new Date(paymentInfo.date_approved).toISOString() : undefined,
        paymentMethodId: paymentInfo.payment_method_id,
        paymentTypeId: paymentInfo.payment_type_id,
        installments: paymentInfo.installments,
        rawData: {
          mercadopago_id: paymentInfo.id,
          status_detail: paymentInfo.status_detail,
          operation_type: paymentInfo.operation_type,
        },
      },
    })

    // Add to generation queue if payment approved
    if (shouldAddToQueue) {
      try {
        await addToGenerationQueue(orderId)
        console.log("Order added to generation queue:", orderId)
      } catch (error) {
        console.error("Error adding to generation queue:", error)
      }
    }

    // Send confirmation email if payment approved
    if (shouldSendEmail) {
      try {
        const updatedOrder = await getOrder(orderId)
        if (updatedOrder) {
          await sendPaymentConfirmationEmail(updatedOrder as any)
          console.log("Payment confirmation email sent:", orderId)
        }
      } catch (error) {
        console.error("Error sending confirmation email:", error)
      }
    }

    console.log("Payment processed successfully:", {
      orderId,
      paymentId: paymentInfo.id,
      status: paymentInfo.status,
      newOrderStatus,
      amount: paymentInfo.transaction_amount,
    })

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      orderId,
      paymentStatus: paymentInfo.status,
      orderStatus: newOrderStatus,
    })
  } catch (error) {
    console.error("Error processing payment webhook:", error)
    return NextResponse.json({ success: false, error: "Failed to process payment webhook" }, { status: 500 })
  }
}

// Handle GET requests for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "MercadoPago webhook endpoint is active",
  })
}
