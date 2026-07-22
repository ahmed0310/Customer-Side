export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled'

export type TableStatus = 'free' | 'occupied'

export interface Restaurant {
  id: string
  slug: string
  name: string
  logoUrl: string
  coverUrl: string
  currency: string
  taxRate: number
}

export interface Table {
  id: string
  restaurantId: string
  tableNumber: number
  label: string
  status: TableStatus
}

export interface Category {
  id: string
  restaurantId: string
  name: string
  sortOrder: number
}

export interface FoodItem {
  id: string
  categoryId: string
  restaurantId: string
  name: string
  description: string
  price: number
  imageUrl: string
  isAvailable: boolean
  isFeatured: boolean
  addOns?: AddOn[]
  allergens?: string[]
}

export interface AddOn {
  id: string
  name: string
  price: number
}

export interface CartItem {
  id: string
  foodItemId: string
  name: string
  imageUrl: string
  unitPrice: number
  quantity: number
  notes?: string
  selectedAddOns: AddOn[]
}

export interface OrderItem {
  foodItemId: string
  name: string
  quantity: number
  unitPrice: number
  notes?: string
  selectedAddOns: AddOn[]
}

export interface Order {
  id: string
  restaurantId: string
  tableId: string
  tableNumber: number
  status: OrderStatus
  specialInstructions?: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  createdAt: string
  updatedAt: string
  estimatedMinutes: number
}
