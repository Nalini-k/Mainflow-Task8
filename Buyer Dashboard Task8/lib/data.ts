// Mock data for the dashboard

// Buyers data
export interface Buyer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  registrationDate: string
  totalSpent: number
  totalOrders: number
  preferredPayment: string
  lastPurchase: string
}

const buyers: Buyer[] = [
  {
    id: "b1",
    name: "Sophia Anderson",
    email: "sophia@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94321",
    registrationDate: "2022-01-15",
    totalSpent: 1250.75,
    totalOrders: 8,
    preferredPayment: "Credit Card",
    lastPurchase: "2023-05-20",
  },
  {
    id: "b2",
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, NY 10001",
    registrationDate: "2022-03-22",
    totalSpent: 875.5,
    totalOrders: 5,
    preferredPayment: "PayPal",
    lastPurchase: "2023-06-12",
  },
  {
    id: "b3",
    name: "Emma Johnson",
    email: "emma@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Rd, Elsewhere, TX 75001",
    registrationDate: "2022-05-10",
    totalSpent: 2340.25,
    totalOrders: 12,
    preferredPayment: "Credit Card",
    lastPurchase: "2023-07-05",
  },
  {
    id: "b4",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 789-0123",
    address: "321 Cedar Ln, Nowhere, FL 33101",
    registrationDate: "2022-07-18",
    totalSpent: 560.0,
    totalOrders: 3,
    preferredPayment: "UPI",
    lastPurchase: "2023-04-30",
  },
  {
    id: "b5",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    phone: "+1 (555) 234-5678",
    address: "654 Birch St, Anyplace, WA 98001",
    registrationDate: "2022-09-05",
    totalSpent: 1875.3,
    totalOrders: 9,
    preferredPayment: "Credit Card",
    lastPurchase: "2023-07-15",
  },
]

// Products data
export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  description: string
  supplier: {
    name: string
    contact: string
    email: string
    leadTime: number
  }
}

const products: Product[] = [
  {
    id: "p1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 25,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    supplier: {
      name: "TechSupplies Inc.",
      contact: "+1 (555) 111-2222",
      email: "orders@techsupplies.com",
      leadTime: 7,
    },
  },
  {
    id: "p2",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    stock: 8,
    description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
    supplier: {
      name: "Office Comfort Co.",
      contact: "+1 (555) 333-4444",
      email: "sales@officecomfort.com",
      leadTime: 14,
    },
  },
  {
    id: "p3",
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 149.99,
    stock: 0,
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone notifications.",
    supplier: {
      name: "TechSupplies Inc.",
      contact: "+1 (555) 111-2222",
      email: "orders@techsupplies.com",
      leadTime: 10,
    },
  },
  {
    id: "p4",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 45,
    description: "Soft, eco-friendly t-shirt made from 100% organic cotton.",
    supplier: {
      name: "EcoThreads",
      contact: "+1 (555) 555-6666",
      email: "wholesale@ecothreads.com",
      leadTime: 5,
    },
  },
  {
    id: "p5",
    name: "Professional Blender",
    category: "Kitchen",
    price: 179.99,
    stock: 12,
    description: "High-powered blender with multiple speed settings and durable stainless steel blades.",
    supplier: {
      name: "Kitchen Essentials",
      contact: "+1 (555) 777-8888",
      email: "orders@kitchenessentials.com",
      leadTime: 8,
    },
  },
  {
    id: "p6",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 89.99,
    stock: 18,
    description: "Compact wireless earbuds with touch controls and charging case.",
    supplier: {
      name: "TechSupplies Inc.",
      contact: "+1 (555) 111-2222",
      email: "orders@techsupplies.com",
      leadTime: 7,
    },
  },
  {
    id: "p7",
    name: "Stainless Steel Water Bottle",
    category: "Kitchen",
    price: 24.99,
    stock: 32,
    description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    supplier: {
      name: "Kitchen Essentials",
      contact: "+1 (555) 777-8888",
      email: "orders@kitchenessentials.com",
      leadTime: 6,
    },
  },
]

// Transactions data
export interface TransactionItem {
  productName: string
  quantity: number
  price: number
}

export interface Transaction {
  id: string
  buyerId: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  date: string
  items: TransactionItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: string
  paymentMethod: string
  paymentId?: string
  notes?: string
}

const transactions: Transaction[] = [
  {
    id: "t1",
    buyerId: "b1",
    buyerName: "Sophia Anderson",
    buyerEmail: "sophia@example.com",
    buyerPhone: "+1 (555) 123-4567",
    date: "2023-05-20",
    items: [
      { productName: "Premium Wireless Headphones", quantity: 1, price: 199.99 },
      { productName: "Wireless Earbuds", quantity: 1, price: 89.99 },
    ],
    subtotal: 289.98,
    tax: 23.2,
    shipping: 10.0,
    total: 323.18,
    status: "Completed",
    paymentMethod: "Credit Card",
    paymentId: "pay_abc123",
    notes: "Customer requested gift wrapping.",
  },
  {
    id: "t2",
    buyerId: "b2",
    buyerName: "James Wilson",
    buyerEmail: "james@example.com",
    buyerPhone: "+1 (555) 987-6543",
    date: "2023-06-12",
    items: [{ productName: "Ergonomic Office Chair", quantity: 1, price: 249.99 }],
    subtotal: 249.99,
    tax: 20.0,
    shipping: 25.0,
    total: 294.99,
    status: "Completed",
    paymentMethod: "PayPal",
    paymentId: "pay_def456",
  },
  {
    id: "t3",
    buyerId: "b3",
    buyerName: "Emma Johnson",
    buyerEmail: "emma@example.com",
    buyerPhone: "+1 (555) 456-7890",
    date: "2023-07-05",
    items: [
      { productName: "Organic Cotton T-Shirt", quantity: 3, price: 29.99 },
      { productName: "Stainless Steel Water Bottle", quantity: 1, price: 24.99 },
    ],
    subtotal: 114.96,
    tax: 9.2,
    shipping: 5.0,
    total: 129.16,
    status: "Completed",
    paymentMethod: "Credit Card",
    paymentId: "pay_ghi789",
  },
  {
    id: "t4",
    buyerId: "b4",
    buyerName: "Michael Brown",
    buyerEmail: "michael@example.com",
    buyerPhone: "+1 (555) 789-0123",
    date: "2023-07-18",
    items: [{ productName: "Professional Blender", quantity: 1, price: 179.99 }],
    subtotal: 179.99,
    tax: 14.4,
    shipping: 15.0,
    total: 209.39,
    status: "Pending",
    paymentMethod: "UPI",
    paymentId: "pay_jkl012",
  },
  {
    id: "t5",
    buyerId: "b5",
    buyerName: "Olivia Martinez",
    buyerEmail: "olivia@example.com",
    buyerPhone: "+1 (555) 234-5678",
    date: "2023-07-15",
    items: [
      { productName: "Smart Fitness Watch", quantity: 1, price: 149.99 },
      { productName: "Wireless Earbuds", quantity: 1, price: 89.99 },
    ],
    subtotal: 239.98,
    tax: 19.2,
    shipping: 10.0,
    total: 269.18,
    status: "Canceled",
    paymentMethod: "Credit Card",
    notes: "Customer canceled due to delayed shipping.",
  },
  {
    id: "t6",
    buyerId: "b1",
    buyerName: "Sophia Anderson",
    buyerEmail: "sophia@example.com",
    buyerPhone: "+1 (555) 123-4567",
    date: "2023-07-22",
    items: [{ productName: "Stainless Steel Water Bottle", quantity: 2, price: 24.99 }],
    subtotal: 49.98,
    tax: 4.0,
    shipping: 5.0,
    total: 58.98,
    status: "Completed",
    paymentMethod: "Credit Card",
    paymentId: "pay_mno345",
  },
]

// Data access functions
export function getBuyers(): Buyer[] {
  return buyers
}

export function getBuyerById(id: string): Buyer | undefined {
  return buyers.find((buyer) => buyer.id === id)
}

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductCategories(): string[] {
  const categories = new Set(products.map((product) => product.category))
  return Array.from(categories)
}

export function getRelatedProducts(category: string, excludeId: string): Product[] {
  return products.filter((product) => product.category === category && product.id !== excludeId).slice(0, 4)
}

export function getTransactions(): Transaction[] {
  return transactions
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((transaction) => transaction.id === id)
}

export function getTransactionsByBuyerId(buyerId: string): Transaction[] {
  return transactions.filter((transaction) => transaction.buyerId === buyerId)
}

