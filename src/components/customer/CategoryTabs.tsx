import type { Category } from '../../types'

interface CategoryTabsProps {
  categories: Category[]
  activeId: string
  onChange: (id: string) => void
}

export function CategoryTabs({
  categories,
  activeId,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-1">
      {categories.map((cat) => {
        const isActive = cat.id === activeId
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={[
              'h-9 shrink-0 rounded-pill px-4 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-forest-700 text-white'
                : 'bg-white text-text-muted hover:text-text-primary',
            ].join(' ')}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
