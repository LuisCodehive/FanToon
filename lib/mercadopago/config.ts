import { MercadoPagoConfig, Preference, Payment } from "mercadopago"

if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error("MERCADOPAGO_ACCESS_TOKEN is required")
}

export const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: "abc",
  },
})

export const preference = new Preference(client)
export const payment = new Payment(client)
