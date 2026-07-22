import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CartSummary } from '../../components/customer/CartSummary'
import { Button } from '../../components/ui/Button'
import { demoRestaurant, getTableById } from '../../data/mockData'
import { useCartStore } from '../../store/cartStore'
import { useOrderStore } from '../../store/orderStore'

export function CheckoutPage() {
  const navigate = useNavigate()
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState(false)

  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal())
  const tableId = useCartStore((s) => s.tableId)
  const restaurantId = useCartStore((s) => s.restaurantId)
  const clearCart = useCartStore((s) => s.clearCart)
  const placeOrder = useOrderStore((s) => s.placeOrder)

  const tax = subtotal * demoRestaurant.taxRate
  const total = subtotal + tax
  const table = tableId ? getTableById(tableId) : undefined

  if (!restaurantId || !tableId || items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))

    const order = placeOrder({
      restaurantId,
      tableId,
      tableNumber: table?.tableNumber ?? 0,
      specialInstructions: instructions || undefined,
      subtotal,
      tax,
      total,
      items: items.map((item) => ({
        foodItemId: item.foodItemId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        notes: item.notes,
        selectedAddOns: item.selectedAddOns,
      })),
    })

    clearCart()
    setLoading(false)
    navigate(`/order/${order.id}`)
  }

  return (
    <div className="space-y-5 px-4 pt-6">
      <h1 className="font-display text-2xl font-bold text-text-primary">Checkout</h1>

      <div className="rounded-card bg-white p-4 shadow-card">
        <p className="text-sm text-text-muted">Ordering for</p>
        <p className="font-semibold text-text-primary">
          {table?.label ?? 'Your table'} · {demoRestaurant.name}
        </p>
      </div>

      <div>
        <label
          htmlFor="order-notes"
          className="mb-1.5 block text-[13px] font-medium text-text-primary"
        >
          Special instructions for the kitchen
        </label>
        <textarea
          id="order-notes"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Any allergies or requests for the whole order..."
          rows={3}
          className="w-full resize-none rounded-2xl border border-border-warm bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-clay-500"
        />
      </div>

      <CartSummary
        subtotal={subtotal}
        tax={tax}
        total={total}
        currency={demoRestaurant.currency}
        taxRate={demoRestaurant.taxRate}
      />

      <Button fullWidth onClick={handlePlaceOrder} disabled={loading}>
        {loading ? 'Placing order…' : 'Place Order'}
      </Button>
    </div>
  )
}
