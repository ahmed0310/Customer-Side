import type { OrderStatus } from '../../types'

const statusStyles: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'Received',
    className: 'bg-warning/15 text-clay-400',
  },
  preparing: {
    label: 'Preparing',
    className: 'bg-warning/20 text-clay-600',
  },
  ready: {
    label: 'Ready',
    className: 'bg-success/15 text-success',
  },
  served: {
    label: 'Served',
    className: 'bg-forest-700/10 text-forest-700',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-600',
  },
}

interface BadgeProps {
  status: OrderStatus
}

export function Badge({ status }: BadgeProps) {
  const { label, className } = statusStyles[status]
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}
