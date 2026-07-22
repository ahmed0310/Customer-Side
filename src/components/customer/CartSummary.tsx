import { formatPrice } from '../../utils/formatPrice'

interface CartSummaryProps {
  subtotal: number
  tax: number
  total: number
  currency: string
  taxRate: number
}

export function CartSummary({
  subtotal,
  tax,
  total,
  currency,
  taxRate,
}: CartSummaryProps) {
  return (
    <div className="rounded-card bg-white p-4 shadow-card">
      <h3 className="mb-3 text-sm font-semibold text-text-primary">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-text-muted">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-text-muted">
          <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
          <span>{formatPrice(tax, currency)}</span>
        </div>
        <div className="border-t border-border-warm pt-2">
          <div className="flex justify-between font-semibold text-text-primary">
            <span>Total</span>
            <span className="text-clay-500">{formatPrice(total, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
