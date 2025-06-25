export interface MercadoPagoPreference {
  items: Array<{
    id: string
    title: string
    description: string
    quantity: number
    unit_price: number
    currency_id: string
  }>
  payer: {
    name: string
    surname: string
    email: string
    phone?: {
      area_code: string
      number: string
    }
  }
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: "approved" | "all"
  external_reference: string
  notification_url: string
  statement_descriptor?: string
  expires?: boolean
  expiration_date_from?: string
  expiration_date_to?: string
  shipments?: {
    cost: number
    mode: "not_specified" | "custom"
    receiver_address: {
      zip_code: string
      street_name: string
      street_number: number
      floor?: string
      apartment?: string
      city_name: string
      state_name: string
      country_name: string
    }
  }
}

export interface MercadoPagoWebhook {
  id: number
  live_mode: boolean
  type: "payment" | "plan" | "subscription" | "invoice" | "point_integration_wh"
  date_created: string
  application_id: number
  user_id: number
  version: number
  api_version: string
  action: "payment.created" | "payment.updated"
  data: {
    id: string
  }
}

export interface MercadoPagoPayment {
  id: number
  date_created: string
  date_approved?: string
  date_last_updated: string
  money_release_date?: string
  operation_type: string
  issuer_id: string
  payment_method_id: string
  payment_type_id: string
  status:
    | "pending"
    | "approved"
    | "authorized"
    | "in_process"
    | "in_mediation"
    | "rejected"
    | "cancelled"
    | "refunded"
    | "charged_back"
  status_detail: string
  currency_id: string
  description: string
  live_mode: boolean
  sponsor_id?: number
  authorization_code?: string
  money_release_schema?: string
  taxes_amount: number
  counter_currency?: string
  brand_id?: string
  shipping_amount: number
  pos_id?: string
  store_id?: string
  integrator_id?: string
  platform_id?: string
  corporation_id?: string
  payer: {
    type: string
    id: string
    email: string
    identification: {
      type: string
      number: string
    }
    first_name: string
    last_name: string
  }
  collector_id: number
  marketplace_owner?: number
  metadata: Record<string, any>
  additional_info: {
    available_balance?: number
    nsu_processadora?: string
    authentication_code?: string
  }
  order: Record<string, any>
  external_reference: string
  transaction_amount: number
  transaction_amount_refunded: number
  coupon_amount: number
  differential_pricing_id?: number
  deduction_schema?: string
  transaction_details: {
    payment_method_reference_id?: string
    net_received_amount: number
    total_paid_amount: number
    overpaid_amount: number
    external_resource_url?: string
    installment_amount: number
    financial_institution?: string
    payable_deferral_period?: string
    acquirer_reference?: string
  }
  fee_details: Array<{
    type: string
    amount: number
    fee_payer: string
  }>
  charges_details: Array<{
    id: string
    name: string
    type: string
    accounts: Record<string, any>
    client_id: number
    date_created: string
    last_updated: string
  }>
  captured: boolean
  binary_mode: boolean
  call_for_authorize_id?: string
  statement_descriptor: string
  installments: number
  card: {
    id?: string
    first_six_digits?: string
    last_four_digits?: string
    expiration_month?: number
    expiration_year?: number
    date_created?: string
    date_last_updated?: string
    cardholder: {
      name: string
      identification: {
        number: string
        type: string
      }
    }
  }
  notification_url: string
  refunds: Array<any>
  processing_mode: string
  merchant_account_id?: string
  merchant_number?: string
  acquirer_reconciliation: Array<any>
}
