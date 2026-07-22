import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { demoRestaurant } from '../../data/mockData'
import { useCartStore } from '../../store/cartStore'
import { useOrderStore } from '../../store/orderStore'
import { formatPrice } from '../../utils/formatPrice'

export function OrdersListPage() {
  const orders = useOrderStore((s) => s.orders)
  const tableId = useCartStore((s) => s.tableId)

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-xl font-bold text-text-primary">No orders yet</h1>
        <p className="mt-2 text-sm text-text-muted">
          Place an order from the menu to track it here.
        </p>
        {tableId && (
          <Link to={`/menu/${demoRestaurant.slug}/${tableId}`} className="mt-6">
            <Button>Browse Menu</Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 pt-6">
      <h1 className="font-display text-2xl font-bold text-text-primary">Your Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/order/${order.id}/track`}
            className="flex items-center justify-between rounded-card bg-white p-4 shadow-card transition-shadow hover:shadow-warm"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">{order.id}</span>
                <Badge status={order.status} />
              </div>
              <p className="mt-1 text-xs text-text-muted">
                Table {order.tableNumber} ·{' '}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-clay-500">
                {formatPrice(order.total, demoRestaurant.currency)}
              </span>
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
