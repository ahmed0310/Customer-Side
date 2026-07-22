import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CategoryTabs } from '../../components/customer/CategoryTabs'
import { ItemCard } from '../../components/customer/ItemCard'
import { ItemDetailSheet } from '../../components/customer/ItemDetailSheet'
import { MenuHero } from '../../components/customer/MenuHero'
import {
  getCategoriesForRestaurant,
  getFeaturedItems,
  getMenuItemsForRestaurant,
  getRestaurantBySlug,
  getTableById,
} from '../../data/mockData'
import { useCartStore } from '../../store/cartStore'
import type { AddOn, FoodItem } from '../../types'

export function MenuPage() {
  const { restaurantSlug, tableId } = useParams()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null)
  const setSession = useCartStore((s) => s.setSession)
  const addItem = useCartStore((s) => s.addItem)

  const restaurant = restaurantSlug ? getRestaurantBySlug(restaurantSlug) : undefined
  const table = tableId ? getTableById(tableId) : undefined

  useEffect(() => {
    if (restaurant && table) {
      setSession(restaurant.id, table.id)
    }
  }, [restaurant, table, setSession])

  const categories = useMemo(
    () => (restaurant ? getCategoriesForRestaurant(restaurant.id) : []),
    [restaurant],
  )

  const allItems = useMemo(
    () => (restaurant ? getMenuItemsForRestaurant(restaurant.id) : []),
    [restaurant],
  )

  const featured = useMemo(
    () => (restaurant ? getFeaturedItems(restaurant.id) : []),
    [restaurant],
  )

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return allItems
    return allItems.filter((item) => item.categoryId === activeCategory)
  }, [allItems, activeCategory])

  if (!restaurant || !table) {
    return <Navigate to="/" replace />
  }

  const handleQuickAdd = (item: FoodItem) => {
    addItem({
      foodItemId: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: item.price,
      quantity: 1,
      selectedAddOns: [],
    })
    toast.success(`${item.name} added to cart`)
  }

  const handleAddFromSheet = (payload: {
    quantity: number
    notes: string
    selectedAddOns: AddOn[]
  }) => {
    if (!selectedItem) return
    addItem({
      foodItemId: selectedItem.id,
      name: selectedItem.name,
      imageUrl: selectedItem.imageUrl,
      unitPrice: selectedItem.price,
      quantity: payload.quantity,
      notes: payload.notes || undefined,
      selectedAddOns: payload.selectedAddOns,
    })
    toast.success(`${selectedItem.name} added to cart`)
  }

  const categoryTabs = [
    { id: 'all', name: 'All', sortOrder: 0, restaurantId: restaurant.id },
    ...categories,
  ]

  return (
    <div className="space-y-5 pb-4 pt-2">
      <MenuHero restaurant={restaurant} table={table} />

      {featured.length > 0 && activeCategory === 'all' && (
        <section className="px-4">
          <h2 className="mb-3 font-display text-lg font-bold text-text-primary">
            Popular Today
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {featured.map((item) => (
              <div key={item.id} className="w-[140px] shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="w-full overflow-hidden rounded-card bg-white text-left shadow-card"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-2">
                    <p className="line-clamp-1 text-xs font-semibold">{item.name}</p>
                    <p className="text-xs text-clay-500">
                      {restaurant.currency} {item.price}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <CategoryTabs
          categories={categoryTabs}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />
        <div className="mt-4 grid grid-cols-2 gap-3 px-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              currency={restaurant.currency}
              onSelect={setSelectedItem}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-text-muted">
            No items in this category.
          </p>
        )}
      </section>

      <ItemDetailSheet
        item={selectedItem}
        currency={restaurant.currency}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddFromSheet}
      />
    </div>
  )
}
