import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '../../types'
import { cartLineTotal } from '../../store/cartStore'
import { formatPrice } from '../../utils/formatPrice'

interface CartItemProps {
  item: CartItemType
  currency: string
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemRow({
  item,
  currency,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-3 rounded-card bg-white p-3 shadow-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-text-primary">{item.name}</h3>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-text-muted hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {item.selectedAddOns.length > 0 && (
          <p className="mt-0.5 text-xs text-text-muted">
            + {item.selectedAddOns.map((a) => a.name).join(', ')}
          </p>
        )}
        {item.notes && (
          <p className="mt-0.5 text-xs italic text-text-muted">"{item.notes}"</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 rounded-pill border border-border-warm bg-cream-50 px-1">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-forest-700 hover:bg-cream-200"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[1.25rem] text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-forest-700 hover:bg-cream-200"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-semibold text-clay-500">
            {formatPrice(cartLineTotal(item), currency)}
          </span>
        </div>
      </div>
    </div>
  )
}
