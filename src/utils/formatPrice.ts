export function formatPrice(amount: number, currency = 'AED'): string {
  return `${currency} ${amount.toFixed(2)}`
}

export function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `ORD-${num}`
}

export function formatElapsedTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes === 1) return '1 min ago'
  return `${minutes} mins ago`
}
