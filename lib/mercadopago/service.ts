import { preference, payment } from "./config"
import type { MercadoPagoPreference, MercadoPagoPayment } from "./types"

export async function createPaymentPreference(preferenceData: MercadoPagoPreference) {
  try {
    const response = await preference.create({
      body: preferenceData,
    })

    return {
      success: true,
      data: response,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
      id: response.id,
    }
  } catch (error) {
    console.error("Error creating MercadoPago preference:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getPaymentInfo(paymentId: string): Promise<MercadoPagoPayment | null> {
  try {
    const response = await payment.get({ id: paymentId })
    return response as MercadoPagoPayment
  } catch (error) {
    console.error("Error getting payment info:", error)
    return null
  }
}

export function parsePhoneNumber(phone: string): { area_code: string; number: string } {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, "")

  // Handle Argentine phone numbers
  if (cleanPhone.startsWith("54")) {
    // International format: +54 9 11 1234-5678
    const withoutCountry = cleanPhone.substring(2)
    if (withoutCountry.startsWith("9")) {
      const withoutMobile = withoutCountry.substring(1)
      const areaCode = withoutMobile.substring(0, 2)
      const number = withoutMobile.substring(2)
      return { area_code: areaCode, number }
    }
  }

  // Default parsing for local numbers
  if (cleanPhone.length >= 10) {
    const areaCode = cleanPhone.substring(0, 2)
    const number = cleanPhone.substring(2)
    return { area_code: areaCode, number }
  }

  return { area_code: "11", number: cleanPhone }
}

export function formatOrderReference(orderId: string): string {
  return `ORDER_${orderId}`
}

export function extractOrderIdFromReference(reference: string): string {
  return reference.replace("ORDER_", "")
}
