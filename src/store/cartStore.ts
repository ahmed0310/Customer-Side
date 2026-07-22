import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AddOn, CartItem } from '../types'

interface CartState {
  items: CartItem[]
  restaurantId: string | null
  tableId: string | null
  setSession: (restaurantId: string, tableId: string) => void
  addItem: (item: Omit<CartItem, 'id'>) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  itemCount: () => number
  subtotal: () => number
}

function lineTotal(item: CartItem): number {
  const addOnTotal = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  return (item.unitPrice + addOnTotal) * item.quantity
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      tableId: null,

      setSession: (restaurantId, tableId) => {
        const current = get()
        if (
          current.restaurantId !== restaurantId ||
          current.tableId !== tableId
        ) {
          set({ restaurantId, tableId, items: [] })
        } else {
          set({ restaurantId, tableId })
        }
      },

      addItem: (item) => {
        const id = `${item.foodItemId}-${Date.now()}`
        set((state) => ({
          items: [...state.items, { ...item, id }],
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          }))
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i,
          ),
        }))
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      clearCart: () => set({ items: [] }),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () => get().items.reduce((sum, item) => sum + lineTotal(item), 0),
    }),
    { name: 'qr-cart' },
  ),
)

export function cartLineTotal(item: CartItem): number {
  return lineTotal(item)
}

export function addOnsKey(addOns: AddOn[]): string {
  return addOns
    .map((a) => a.id)
    .sort()
    .join(',')
}
