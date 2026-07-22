import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { FoodItem } from '../../types'
import { formatPrice } from '../../utils/formatPrice'

interface ItemCardProps {
  item: FoodItem
  currency: string
  onSelect: (item: FoodItem) => void
  onQuickAdd?: (item: FoodItem) => void
}

export function ItemCard({ item, currency, onSelect, onQuickAdd }: ItemCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={() => onSelect(item)}
      disabled={!item.isAvailable}
      className={[
        'flex w-full flex-col overflow-hidden rounded-card bg-white text-left shadow-card',
        !item.isAvailable ? 'opacity-60' : '',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {item.isFeatured && item.isAvailable && (
          <span className="absolute left-2 top-2 rounded-pill bg-forest-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Popular
          </span>
        )}
        {!item.isAvailable && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
            Unavailable
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-text-primary">
          {item.name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-text-muted">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-semibold text-clay-500">
            {formatPrice(item.price, currency)}
          </span>
          {item.isAvailable && onQuickAdd && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                onQuickAdd(item)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  onQuickAdd(item)
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-clay-500 text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
