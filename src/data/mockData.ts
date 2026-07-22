import type { Category, FoodItem, Restaurant, Table } from '../types'

export const demoRestaurant: Restaurant = {
  id: 'rest-1',
  slug: 'demo-restaurant',
  name: 'Al Noor Kitchen',
  logoUrl:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop',
  coverUrl:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
  currency: 'AED',
  taxRate: 0.05,
}

export const demoTables: Table[] = [
  { id: 'table-1', restaurantId: 'rest-1', tableNumber: 1, label: 'Table 1', status: 'free' },
  { id: 'table-2', restaurantId: 'rest-1', tableNumber: 2, label: 'Table 2', status: 'free' },
  { id: 'table-3', restaurantId: 'rest-1', tableNumber: 3, label: 'Table 3', status: 'occupied' },
  { id: 'table-4', restaurantId: 'rest-1', tableNumber: 4, label: 'Table 4', status: 'free' },
  { id: 'table-5', restaurantId: 'rest-1', tableNumber: 5, label: 'Table 5', status: 'free' },
]

export const demoCategories: Category[] = [
  { id: 'cat-starters', restaurantId: 'rest-1', name: 'Starters', sortOrder: 1 },
  { id: 'cat-mains', restaurantId: 'rest-1', name: 'Mains', sortOrder: 2 },
  { id: 'cat-desserts', restaurantId: 'rest-1', name: 'Desserts', sortOrder: 3 },
  { id: 'cat-drinks', restaurantId: 'rest-1', name: 'Drinks', sortOrder: 4 },
]

export const demoMenuItems: FoodItem[] = [
  {
    id: 'item-1',
    categoryId: 'cat-starters',
    restaurantId: 'rest-1',
    name: 'Hummus & Warm Bread',
    description: 'Creamy chickpea dip with olive oil, paprika, and fresh pita.',
    price: 22,
    imageUrl:
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: true,
    allergens: ['Sesame', 'Gluten'],
    addOns: [
      { id: 'addon-1', name: 'Extra pita', price: 5 },
      { id: 'addon-2', name: 'Pickled vegetables', price: 4 },
    ],
  },
  {
    id: 'item-2',
    categoryId: 'cat-starters',
    restaurantId: 'rest-1',
    name: 'Fattoush Salad',
    description: 'Crisp lettuce, tomatoes, cucumber, and sumac dressing.',
    price: 26,
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Gluten'],
  },
  {
    id: 'item-3',
    categoryId: 'cat-starters',
    restaurantId: 'rest-1',
    name: 'Grilled Halloumi',
    description: 'Golden halloumi with honey drizzle and fresh mint.',
    price: 32,
    imageUrl:
      'https://images.unsplash.com/photo-1482049016535-9660b785a081?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: true,
    allergens: ['Dairy'],
  },
  {
    id: 'item-4',
    categoryId: 'cat-starters',
    restaurantId: 'rest-1',
    name: 'Soup of the Day',
    description: 'Chef\'s seasonal soup served with artisan bread.',
    price: 18,
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Gluten', 'Dairy'],
  },
  {
    id: 'item-5',
    categoryId: 'cat-mains',
    restaurantId: 'rest-1',
    name: 'Lamb Mandi',
    description: 'Slow-cooked lamb on fragrant basmati rice with roasted nuts.',
    price: 68,
    imageUrl:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: true,
    allergens: ['Nuts'],
    addOns: [
      { id: 'addon-3', name: 'Extra rice', price: 8 },
      { id: 'addon-4', name: 'Spicy sauce', price: 3 },
    ],
  },
  {
    id: 'item-6',
    categoryId: 'cat-mains',
    restaurantId: 'rest-1',
    name: 'Grilled Sea Bass',
    description: 'Charred sea bass with lemon butter and seasonal greens.',
    price: 72,
    imageUrl:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Fish', 'Dairy'],
  },
  {
    id: 'item-7',
    categoryId: 'cat-mains',
    restaurantId: 'rest-1',
    name: 'Chicken Shawarma Plate',
    description: 'Marinated chicken, garlic sauce, pickles, and fries.',
    price: 48,
    imageUrl:
      'https://images.unsplash.com/photo-1529006557810-274b1b3c7c33?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: true,
    addOns: [{ id: 'addon-5', name: 'Extra garlic sauce', price: 3 }],
  },
  {
    id: 'item-8',
    categoryId: 'cat-mains',
    restaurantId: 'rest-1',
    name: 'Vegetable Tagine',
    description: 'Moroccan-style stew with chickpeas, apricots, and couscous.',
    price: 42,
    imageUrl:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Gluten'],
  },
  {
    id: 'item-9',
    categoryId: 'cat-mains',
    restaurantId: 'rest-1',
    name: 'Beef Burger',
    description: 'Angus patty, cheddar, caramelized onions, brioche bun.',
    price: 52,
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    isAvailable: false,
    isFeatured: false,
    allergens: ['Gluten', 'Dairy', 'Eggs'],
  },
  {
    id: 'item-10',
    categoryId: 'cat-desserts',
    restaurantId: 'rest-1',
    name: 'Kunafa',
    description: 'Crispy shredded pastry with sweet cheese and pistachios.',
    price: 28,
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: true,
    allergens: ['Gluten', 'Dairy', 'Nuts'],
  },
  {
    id: 'item-11',
    categoryId: 'cat-desserts',
    restaurantId: 'rest-1',
    name: 'Chocolate Lava Cake',
    description: 'Warm molten center with vanilla bean ice cream.',
    price: 32,
    imageUrl:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Gluten', 'Dairy', 'Eggs'],
  },
  {
    id: 'item-12',
    categoryId: 'cat-desserts',
    restaurantId: 'rest-1',
    name: 'Umm Ali',
    description: 'Traditional Egyptian bread pudding with cream and raisins.',
    price: 24,
    imageUrl:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Gluten', 'Dairy', 'Nuts'],
  },
  {
    id: 'item-13',
    categoryId: 'cat-drinks',
    restaurantId: 'rest-1',
    name: 'Fresh Mint Lemonade',
    description: 'House-made with fresh mint and a touch of rose water.',
    price: 16,
    imageUrl:
      'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 'item-14',
    categoryId: 'cat-drinks',
    restaurantId: 'rest-1',
    name: 'Arabic Coffee',
    description: 'Traditional lightly spiced coffee served in a dallah.',
    price: 14,
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: 'item-15',
    categoryId: 'cat-drinks',
    restaurantId: 'rest-1',
    name: 'Mango Smoothie',
    description: 'Blended Alphonso mango with yogurt and honey.',
    price: 18,
    imageUrl:
      'https://images.unsplash.com/photo-1505252581403-4f4f146ea2c8?w=600&h=400&fit=crop',
    isAvailable: true,
    isFeatured: false,
    allergens: ['Dairy'],
  },
]

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  if (slug === demoRestaurant.slug) return demoRestaurant
  return undefined
}

export function getTableById(tableId: string): Table | undefined {
  return demoTables.find((t) => t.id === tableId)
}

export function getCategoriesForRestaurant(restaurantId: string): Category[] {
  return demoCategories
    .filter((c) => c.restaurantId === restaurantId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getMenuItemsForRestaurant(restaurantId: string): FoodItem[] {
  return demoMenuItems.filter((item) => item.restaurantId === restaurantId)
}

export function getMenuItemById(itemId: string): FoodItem | undefined {
  return demoMenuItems.find((item) => item.id === itemId)
}

export function getFeaturedItems(restaurantId: string): FoodItem[] {
  return demoMenuItems.filter(
    (item) => item.restaurantId === restaurantId && item.isFeatured && item.isAvailable,
  )
}
