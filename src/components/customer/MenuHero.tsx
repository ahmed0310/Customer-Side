import type { Restaurant, Table } from '../../types'

interface MenuHeroProps {
  restaurant: Restaurant
  table: Table
}

export function MenuHero({ restaurant, table }: MenuHeroProps) {
  return (
    <div className="relative mx-4 overflow-hidden rounded-[28px] bg-forest-700 shadow-warm">
      <img
        src={restaurant.coverUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative flex flex-col items-center px-6 pb-8 pt-10 text-center">
        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-white/30 shadow-lg">
          <img
            src={restaurant.logoUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="font-display text-[28px] font-bold leading-tight text-white">
          {restaurant.name}
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Scan · Browse · Order in seconds
        </p>
        <span className="mt-4 rounded-pill bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          {table.label}
        </span>
      </div>
    </div>
  )
}
