import { NavLink, useParams } from 'react-router-dom'
import { ClipboardList, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore'

export function BottomNav() {
  const { restaurantSlug, tableId } = useParams()
  const base = `/menu/${restaurantSlug}/${tableId}`
  const itemCount = useCartStore((s) => s.itemCount())

  const tabs = [
    { to: base, icon: UtensilsCrossed, label: 'Menu', end: true },
    { to: '/cart', icon: ShoppingBag, label: 'Cart', badge: itemCount },
    { to: '/orders', icon: ClipboardList, label: 'Orders' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-warm bg-white">
      <div className="mx-auto flex max-w-[480px] items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {tabs.map(({ to, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'relative flex flex-1 flex-col items-center gap-1 py-2 transition-colors',
                isActive ? 'text-clay-500' : 'text-text-muted',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  {badge !== undefined && badge > 0 && (
                    <motion.span
                      key={badge}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-white"
                    >
                      {badge}
                    </motion.span>
                  )}
                </div>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1 h-1 w-1 rounded-full bg-clay-500"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
