import { Link, Navigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { CartItemRow } from '../../components/customer/CartItem'
import { CartSummary } from '../../components/customer/CartSummary'
import { Button } from '../../components/ui/Button'
import { demoRestaurant } from '../../data/mockData'
import { useCartStore } from '../../store/cartStore'

export function CartPage() {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotal())
  const tableId = useCartStore((s) => s.tableId)
  const restaurantId = useCartStore((s) => s.restaurantId)

  const tax = subtotal * demoRestaurant.taxRate
  const total = subtotal + tax

  if (!restaurantId || !tableId) {
    return <Navigate to="/" replace />
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-200 text-text-muted">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-display text-xl font-bold text-text-primary">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Browse the menu and add something delicious.
        </p>
        <Link to={`/menu/${demoRestaurant.slug}/${tableId}`} className="mt-6">
          <Button>View Menu</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 pt-6">
      <h1 className="font-display text-2xl font-bold text-text-primary">Your Cart</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            currency={demoRestaurant.currency}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
      <CartSummary
        subtotal={subtotal}
        tax={tax}
        total={total}
        currency={demoRestaurant.currency}
        taxRate={demoRestaurant.taxRate}
      />
      <Link to="/checkout">
        <Button fullWidth>Proceed to Checkout</Button>
      </Link>
    </div>
  )
}
