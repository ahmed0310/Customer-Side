import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'
import type { AddOn, FoodItem } from '../../types'
import { Button } from '../ui/Button'
import { formatPrice } from '../../utils/formatPrice'

interface ItemDetailSheetProps {
  item: FoodItem | null
  currency: string
  onClose: () => void
  onAddToCart: (payload: {
    quantity: number
    notes: string
    selectedAddOns: AddOn[]
  }) => void
}

export function ItemDetailSheet({
  item,
  currency,
  onClose,
  onAddToCart,
}: ItemDetailSheetProps) {
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn],
    )
  }

  const handleClose = () => {
    setQuantity(1)
    setNotes('')
    setSelectedAddOns([])
    onClose()
  }

  const addOnTotal = selectedAddOns.reduce((s, a) => s + a.price, 0)
  const lineTotal = item ? (item.price + addOnTotal) * quantity : 0

  const handleAdd = () => {
    if (!item) return
    onAddToCart({ quantity, notes, selectedAddOns })
    handleClose()
  }

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={handleClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[90dvh] max-w-[480px] overflow-y-auto rounded-t-[28px] bg-cream-50"
          >
            <div className="relative">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-t-[28px]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest-700 shadow-card backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-5 pb-8 pt-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  {item.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
                {item.allergens && item.allergens.length > 0 && (
                  <p className="mt-2 text-xs text-text-muted">
                    Allergens: {item.allergens.join(', ')}
                  </p>
                )}
              </div>

              {item.addOns && item.addOns.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-text-primary">
                    Add-ons
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.addOns.map((addOn) => {
                      const selected = selectedAddOns.some((a) => a.id === addOn.id)
                      return (
                        <button
                          key={addOn.id}
                          type="button"
                          onClick={() => toggleAddOn(addOn)}
                          className={[
                            'rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors',
                            selected
                              ? 'border-clay-500 bg-clay-500 text-white'
                              : 'border-border-warm bg-white text-text-muted',
                          ].join(' ')}
                        >
                          {addOn.name} (+{formatPrice(addOn.price, currency)})
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="item-notes"
                  className="mb-1.5 block text-[13px] font-medium text-text-primary"
                >
                  Special instructions
                </label>
                <input
                  id="item-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. no onions"
                  className="h-[52px] w-full rounded-pill border border-border-warm bg-white px-4 text-sm outline-none transition-colors focus:border-clay-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 rounded-pill border border-border-warm bg-white px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[1.5rem] text-center text-base font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-lg font-bold text-clay-500">
                  {formatPrice(lineTotal, currency)}
                </span>
              </div>

              <Button fullWidth onClick={handleAdd}>
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
