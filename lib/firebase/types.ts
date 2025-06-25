export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: string
  updatedAt: string
  orderCount: number
}

export interface PreOrder {
  id: string
  userId: string
  photo: string
  bookDetails: {
    storyType: string
    childName: string
    team: any
    coach: string
    trophy: string
    players: string[]
    photoUrl?: string
    photoPath?: string
  }
  status: "draft" | "preview_ready" | "converted" | "expired" | "generate_ok"
  previewUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  preOrderId?: string
  customer: {
    name: string
    email: string
    phone: string
  }
  bookDetails: {
    storyType: string
    childName: string
    team: any
    coach: string
    trophy: string
    players: string[]
    photoUrl?: string
    photoPath?: string
  }
  product: {
    type: string
    title: string
    price: number
  }
  payment: {
    method: string
    total: number
    status?: "pending" | "completed" | "failed" | "refunded"
    mercadopagoId?: string
    mercadopagoStatus?: string
  }
  shipping?: {
    address: string
    addressNumber: string
    barrio?: string
    city: string
    province: string
    postalCode: string
    observations?: string
    cost: number
    estimatedDays: string
  }
  status:
    | "pending"
    | "payment_pending"
    | "processing"
    | "generating"
    | "ready"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "payment_failed"
    | "refunded"
  createdAt: string
  updatedAt: string
}

export interface QueueItem {
  id: string
  orderId: string
  priority: number
  status: "waiting" | "processing" | "completed" | "failed"
  attempts: number
  createdAt: string
  updatedAt: string
  error?: string
}

export interface EmailNotification {
  id: string
  orderId: string
  type: "order_confirmation" | "payment_confirmation" | "generation_start" | "book_ready"
  recipient: string
  subject: string
  content: string
  status: "pending" | "sent" | "failed"
  createdAt: string
  updatedAt: string
}
