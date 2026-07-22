import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { demoRestaurant } from '../../data/mockData'
import { useOrderStore } from '../../store/orderStore'
import { formatElapsedTime, formatPrice } from '../../utils/formatPrice'
import type { OrderStatus } from '../../types'

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'served',
}

export function StaffOrdersPage() {
  const orders = useOrderStore((s) => s.getActiveOrders())
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus)

  return (
    <div className="min-h-dvh bg-dark-base text-[#F0EBE3]">
      <header className="border-b border-dark-elevated bg-forest-800 px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold">Kitchen Queue</h1>
            <p className="text-sm text-white/60">{demoRestaurant.name}</p>
          </div>
          <Link to={`/menu/${demoRestaurant.slug}/table-1`}>
            <Button variant="secondary" className="h-10 border-white/30 text-white">
              Customer View
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-4 p-4">
        {orders.length === 0 ? (
          <div className="rounded-card bg-dark-surface p-12 text-center">
            <p className="text-white/60">No active orders — waiting for customers.</p>
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className="rounded-card border border-dark-elevated bg-dark-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">Table {order.tableNumber}</span>
                    <Badge status={order.status} />
                  </div>
                  <p className="mt-1 text-sm text-white/50">
                    {order.id} · {formatElapsedTime(order.createdAt)}
                  </p>
                </div>
                <span className="font-semibold text-clay-400">
                  {formatPrice(order.total, demoRestaurant.currency)}
                </span>
              </div>

              <ul className="mt-4 space-y-1 border-t border-dark-elevated pt-4">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}× {item.name}
                      {item.notes && (
                        <span className="ml-1 text-white/40">({item.notes})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {order.specialInstructions && (
                <p className="mt-3 rounded-xl bg-dark-elevated px-3 py-2 text-sm text-clay-400">
                  Note: {order.specialInstructions}
                </p>
              )}

              {nextStatus[order.status] && (
                <div className="mt-4">
                  <Button
                    fullWidth
                    onClick={() =>
                      updateOrderStatus(order.id, nextStatus[order.status]!)
                    }
                  >
                    Mark as{' '}
                    {nextStatus[order.status] === 'preparing'
                      ? 'Preparing'
                      : nextStatus[order.status] === 'ready'
                        ? 'Ready'
                        : 'Served'}
                  </Button>
                </div>
              )}
            </article>
          ))
        )}
      </main>
    </div>
  )
}
