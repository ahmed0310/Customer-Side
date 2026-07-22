import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { OrderStatus } from '../../types'

const steps: { key: OrderStatus; label: string }[] = [
  { key: 'pending', label: 'Received' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'served', label: 'Served' },
]

const statusOrder: OrderStatus[] = ['pending', 'preparing', 'ready', 'served']

interface OrderStatusStepperProps {
  status: OrderStatus
}

export function OrderStatusStepper({ status }: OrderStatusStepperProps) {
  const currentIndex = statusOrder.indexOf(status)

  return (
    <div className="flex items-center justify-between px-2">
      {steps.map((step, index) => {
        const isComplete = index < currentIndex
        const isActive = index === currentIndex
        const isPending = index > currentIndex

        return (
          <div key={step.key} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center">
              {index > 0 && (
                <div
                  className={[
                    'absolute right-1/2 h-0.5 w-full -translate-y-1/2',
                    isComplete || isActive ? 'bg-forest-700' : 'bg-border-warm',
                  ].join(' ')}
                  style={{ top: '50%', width: '100%', left: '-50%' }}
                />
              )}
              <motion.div
                animate={
                  isActive
                    ? { scale: [1, 1.08, 1], boxShadow: ['0 0 0 0 rgba(196,123,90,0)', '0 0 0 8px rgba(196,123,90,0.2)', '0 0 0 0 rgba(196,123,90,0)'] }
                    : {}
                }
                transition={{ duration: 0.4, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                className={[
                  'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                  isComplete
                    ? 'border-forest-700 bg-forest-700 text-white'
                    : isActive
                      ? 'border-clay-500 bg-clay-500 text-white'
                      : isPending
                        ? 'border-border-warm bg-white text-text-muted'
                        : '',
                ].join(' ')}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </motion.div>
            </div>
            <span
              className={[
                'mt-2 text-center text-[10px] font-medium leading-tight',
                isActive ? 'text-clay-500' : isComplete ? 'text-forest-700' : 'text-text-muted',
              ].join(' ')}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
