import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { OrderStatusStepper } from '../../components/customer/OrderStatusStepper'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { demoRestaurant } from '../../data/mockData'
import { useOrderStore } from '../../store/orderStore'
import { formatPrice } from '../../utils/formatPrice'
import type { OrderStatus } from '../../types'

export function OrderTrackingPage() {
  const { orderId } = useParams()
  const order = useOrderStore((s) => (orderId ? s.getOrder(orderId) : undefined))
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus)

  // Demo: simulate kitchen progressing the order
  useEffect(() => {
    if (!order || order.status === 'served' || order.status === 'cancelled') return

    const transitions: Partial<
      Record<'pending' | 'preparing' | 'ready', { next: OrderStatus; delay: number }>
    > = {
      pending: { next: 'preparing', delay: 8000 },
      preparing: { next: 'ready', delay: 15000 },
      ready: { next: 'served', delay: 20000 },
    }

    if (
      order.status !== 'pending' &&
      order.status !== 'preparing' &&
      order.status !== 'ready'
    ) {
      return
    }

    const step = transitions[order.status]
    if (!step) return

    const timer = setTimeout(() => {
      updateOrderStatus(order.id, step.next)
    }, step.delay)

    return () => clearTimeout(timer)
  }, [order, updateOrderStatus])

  if (!orderId || !order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="space-y-6 px-4 pt-8">
      <div className="text-center">
        <Badge status={order.status} />
        <h1 className="mt-3 font-display text-2xl font-bold text-text-primary">
          Order {order.id}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Table {order.tableNumber} · {demoRestaurant.name}
        </p>
      </div>

      <div className="rounded-card bg-white p-6 shadow-card">
        <OrderStatusStepper status={order.status} />
      </div>

      {order.status !== 'served' && (
        <div className="text-center">
          <p className="text-xs text-text-muted">Estimated wait</p>
          <p className="font-display text-4xl font-bold text-text-primary">
            ~{order.estimatedMinutes} min
          </p>
        </div>
      )}

      {order.status === 'served' && (
        <div className="rounded-card bg-success/10 p-4 text-center">
          <p className="font-semibold text-success">Enjoy your meal!</p>
          <p className="mt-1 text-sm text-text-muted">
            Your order has been served to your table.
          </p>
        </div>
      )}

      <div className="rounded-card bg-white p-4 shadow-card">
        <h2 className="mb-3 text-sm font-semibold text-text-primary">Order items</h2>
        <ul className="space-y-2">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>
                {item.quantity}× {item.name}
              </span>
              <span className="text-text-muted">
                {formatPrice(item.unitPrice * item.quantity, demoRestaurant.currency)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border-warm pt-3 font-semibold">
          <span>Total</span>
          <span className="text-clay-500">
            {formatPrice(order.total, demoRestaurant.currency)}
          </span>
        </div>
      </div>

      <Link to={`/menu/${demoRestaurant.slug}/${order.tableId}`}>
        <Button variant="secondary" fullWidth>
          Order More
        </Button>
      </Link>
    </div>
  )
}
