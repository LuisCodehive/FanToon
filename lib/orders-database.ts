export interface Order {
  id: string
  createdAt: string
  status: "pending" | "processing" | "production" | "shipped" | "delivered" | "cancelled"

  // Customer Info
  customer: {
    name: string
    email: string
    phone: string
  }

  // Book Details
  bookDetails: {
    childName: string
    team: {
      name: string
      country: string
      league?: string
    }
    players: string[]
    coach: string
    trophy: string
    photoUploaded: boolean
  }

  // Product Info
  product: {
    type: "pdf" | "tapa-blanda" | "tapa-dura"
    title: string
    price: number
  }

  // Shipping Info (if applicable)
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

  // Payment Info
  payment: {
    total: number
    method: string
    transactionId?: string
    paidAt?: string
  }

  // Internal Notes
  notes?: string
  lastUpdated: string
}

// Datos de ejemplo para el backoffice
export const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    createdAt: "2024-01-15T10:30:00Z",
    status: "delivered",
    customer: {
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+54 9 11 1234-5678",
    },
    bookDetails: {
      childName: "Tomás",
      team: {
        name: "River Plate",
        country: "Argentina",
        league: "Liga Profesional",
      },
      players: ["Lionel Messi", "Ángel Di María", "Lautaro Martínez"],
      coach: "Lionel Scaloni",
      trophy: "Copa del Mundo",
      photoUploaded: true,
    },
    product: {
      type: "tapa-dura",
      title: "Libro Impreso Tapa Dura",
      price: 24999,
    },
    shipping: {
      address: "Av. Corrientes",
      addressNumber: "1234",
      barrio: "Palermo",
      city: "Buenos Aires",
      province: "Buenos Aires",
      postalCode: "1414",
      cost: 2500,
      estimatedDays: "2-3 días",
    },
    payment: {
      total: 27499,
      method: "MercadoPago",
      transactionId: "MP-123456789",
      paidAt: "2024-01-15T10:35:00Z",
    },
    notes: "Cliente muy contento con el resultado",
    lastUpdated: "2024-01-20T14:20:00Z",
  },
  {
    id: "ORD-2024-002",
    createdAt: "2024-01-16T14:15:00Z",
    status: "production",
    customer: {
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "+54 9 11 9876-5432",
    },
    bookDetails: {
      childName: "Sofía",
      team: {
        name: "Boca Juniors",
        country: "Argentina",
        league: "Liga Profesional",
      },
      players: ["Edinson Cavani", "Sergio Romero"],
      coach: "Diego Martínez",
      trophy: "Copa Libertadores",
      photoUploaded: true,
    },
    product: {
      type: "pdf",
      title: "Libro Digital PDF",
      price: 2999,
    },
    payment: {
      total: 2999,
      method: "MercadoPago",
      transactionId: "MP-987654321",
      paidAt: "2024-01-16T14:20:00Z",
    },
    lastUpdated: "2024-01-18T09:30:00Z",
  },
  {
    id: "ORD-2024-003",
    createdAt: "2024-01-17T09:45:00Z",
    status: "shipped",
    customer: {
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      phone: "+54 9 11 5555-1234",
    },
    bookDetails: {
      childName: "Lucas",
      team: {
        name: "FC Barcelona",
        country: "España",
        league: "La Liga",
      },
      players: ["Robert Lewandowski", "Pedri", "Gavi"],
      coach: "Hansi Flick",
      trophy: "Champions League",
      photoUploaded: true,
    },
    product: {
      type: "tapa-blanda",
      title: "Libro Impreso Tapa Blanda",
      price: 13999,
    },
    shipping: {
      address: "San Martín",
      addressNumber: "567",
      city: "Córdoba",
      province: "Córdoba",
      postalCode: "5000",
      cost: 3500,
      estimatedDays: "3-5 días",
    },
    payment: {
      total: 17499,
      method: "MercadoPago",
      transactionId: "MP-456789123",
    },
    lastUpdated: "2024-01-19T16:45:00Z",
  },
  {
    id: "ORD-2024-004",
    createdAt: "2024-01-18T16:20:00Z",
    status: "pending",
    customer: {
      name: "Diego Fernández",
      email: "diego.fernandez@email.com",
      phone: "+54 9 11 7777-8888",
    },
    bookDetails: {
      childName: "Valentina",
      team: {
        name: "Manchester City",
        country: "Inglaterra",
        league: "Premier League",
      },
      players: ["Erling Haaland", "Kevin De Bruyne", "Phil Foden"],
      coach: "Pep Guardiola",
      trophy: "Premier League",
      photoUploaded: false,
    },
    product: {
      type: "pdf",
      title: "Libro Digital PDF",
      price: 2999,
    },
    payment: {
      total: 2999,
      method: "Pendiente",
    },
    notes: "Cliente no subió foto aún",
    lastUpdated: "2024-01-18T16:20:00Z",
  },
  {
    id: "ORD-2024-005",
    createdAt: "2024-01-19T11:10:00Z",
    status: "processing",
    customer: {
      name: "Laura Sánchez",
      email: "laura.sanchez@email.com",
      phone: "+54 9 11 3333-4444",
    },
    bookDetails: {
      childName: "Mateo",
      team: {
        name: "Real Madrid",
        country: "España",
        league: "La Liga",
      },
      players: ["Kylian Mbappé", "Vinícius Jr", "Jude Bellingham"],
      coach: "Carlo Ancelotti",
      trophy: "La Liga",
      photoUploaded: true,
    },
    product: {
      type: "tapa-dura",
      title: "Libro Impreso Tapa Dura",
      price: 24999,
    },
    shipping: {
      address: "Belgrano",
      addressNumber: "890",
      barrio: "Centro",
      city: "Rosario",
      province: "Santa Fe",
      postalCode: "2000",
      cost: 3500,
      estimatedDays: "3-5 días",
    },
    payment: {
      total: 28499,
      method: "MercadoPago",
      transactionId: "MP-789123456",
      paidAt: "2024-01-19T11:15:00Z",
    },
    lastUpdated: "2024-01-19T15:30:00Z",
  },
]

export function getOrders(): Order[] {
  return SAMPLE_ORDERS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getOrderById(id: string): Order | undefined {
  return SAMPLE_ORDERS.find((order) => order.id === id)
}

export function getOrdersByStatus(status: Order["status"]): Order[] {
  return SAMPLE_ORDERS.filter((order) => order.status === status)
}

export function updateOrderStatus(orderId: string, newStatus: Order["status"], notes?: string): boolean {
  const orderIndex = SAMPLE_ORDERS.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    SAMPLE_ORDERS[orderIndex].status = newStatus
    SAMPLE_ORDERS[orderIndex].lastUpdated = new Date().toISOString()
    if (notes) {
      SAMPLE_ORDERS[orderIndex].notes = notes
    }
    return true
  }
  return false
}

export const ORDER_STATUS_LABELS = {
  pending: "Pendiente",
  processing: "Procesando",
  production: "En Producción",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

export const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  production: "bg-purple-100 text-purple-800",
  shipped: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}
