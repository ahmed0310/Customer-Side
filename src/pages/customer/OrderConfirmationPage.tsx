import { Link, Navigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useOrderStore } from '../../store/orderStore'
import { formatPrice } from '../../utils/formatPrice'
import { demoRestaurant } from '../../data/mockData'

export function OrderConfirmationPage() {
  const { orderId } = useParams()
  const order = useOrderStore((s) => (orderId ? s.getOrder(orderId) : undefined))

  if (!orderId || !order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-[70dvh] flex-col items-center px-6 pt-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h1 className="font-display text-2xl font-bold text-text-primary">
        Order Placed!
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Your order has been sent to the kitchen.
      </p>

      <div className="mt-8 w-full rounded-card bg-white p-5 shadow-card text-left">
        <div className="flex justify-between border-b border-border-warm pb-3">
          <span className="text-sm text-text-muted">Order number</span>
          <span className="font-semibold text-forest-700">{order.id}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-text-muted">Table</span>
          <span className="font-medium">Table {order.tableNumber}</span>
        </div>
        <div className="flex justify-between border-t border-border-warm pt-3">
          <span className="text-sm text-text-muted">Total</span>
          <span className="font-semibold text-clay-500">
            {formatPrice(order.total, demoRestaurant.currency)}
          </span>
        </div>
        <div className="mt-4 rounded-xl bg-cream-100 p-3 text-center">
          <p className="text-xs text-text-muted">Estimated wait</p>
          <p className="font-display text-3xl font-bold text-text-primary">
            ~{order.estimatedMinutes} min
          </p>
        </div>
      </div>

      <Link to={`/order/${order.id}/track`} className="mt-6 w-full">
        <Button fullWidth>Track Order</Button>
      </Link>
    </div>
  )
}
