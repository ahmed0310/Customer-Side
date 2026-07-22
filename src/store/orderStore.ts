import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, OrderItem, OrderStatus } from '../types'
import { generateOrderId } from '../utils/formatPrice'

interface OrderState {
  orders: Order[]
  placeOrder: (payload: {
    restaurantId: string
    tableId: string
    tableNumber: number
    items: OrderItem[]
    subtotal: number
    tax: number
    total: number
    specialInstructions?: string
  }) => Order
  getOrder: (id: string) => Order | undefined
  updateOrderStatus: (id: string, status: OrderStatus) => void
  getActiveOrders: () => Order[]
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: (payload) => {
        const now = new Date().toISOString()
        const order: Order = {
          id: generateOrderId(),
          restaurantId: payload.restaurantId,
          tableId: payload.tableId,
          tableNumber: payload.tableNumber,
          status: 'pending',
          specialInstructions: payload.specialInstructions,
          items: payload.items,
          subtotal: payload.subtotal,
          tax: payload.tax,
          total: payload.total,
          createdAt: now,
          updatedAt: now,
          estimatedMinutes: 15 + payload.items.length * 3,
        }
        set((state) => ({ orders: [order, ...state.orders] }))
        return order
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o,
          ),
        }))
      },

      getActiveOrders: () =>
        get().orders.filter(
          (o) => o.status !== 'served' && o.status !== 'cancelled',
        ),
    }),
    { name: 'qr-orders' },
  ),
)
