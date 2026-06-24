import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartItemPremade, CartItemCustom, Product, CustomOrder } from '@/lib/types'

let _id = 0
const genId = () => `cart-${++_id}-${Date.now()}`

interface CartStore {
  items:     CartItem[]

  // Premade product actions
  addPremade: (product: Product, color: string, size: string, qty?: number) => void

  // Custom order actions
  addCustom: (order: CustomOrder, basePrice?: number) => void

  // Shared actions
  removeItem:       (id: string) => void
  updateQuantity:   (id: string, qty: number) => void
  clearCart:        () => void

  // Derived values
  cartTotal:   () => number
  itemCount:   () => number
}

const BASE_CUSTOM_PRICE = 120  // EUR base for any custom order

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addPremade: (product, color, size, qty = 1) => {
        const existing = get().items.find(
          i =>
            i.type === 'premade' &&
            (i as CartItemPremade).product.id === product.id &&
            (i as CartItemPremade).selectedColor === color &&
            (i as CartItemPremade).selectedSize  === size
        )

        if (existing) {
          get().updateQuantity(existing.id, (existing as CartItemPremade).quantity + qty)
          return
        }

        const item: CartItemPremade = {
          type:          'premade',
          id:            genId(),
          product,
          selectedColor: color,
          selectedSize:  size,
          quantity:      qty,
          unitPrice:     product.price,
          totalPrice:    product.price * qty,
        }
        set(s => ({ items: [...s.items, item] }))
      },

      addCustom: (order, basePrice = BASE_CUSTOM_PRICE) => {
        const fabricMod = order.fabric?.priceModifier ?? 0
        const unit      = basePrice + fabricMod

        const item: CartItemCustom = {
          type:        'custom',
          id:          genId(),
          customOrder: order,
          quantity:    1,
          unitPrice:   unit,
          totalPrice:  unit,
        }
        set(s => ({ items: [...s.items, item] }))
      },

      removeItem: (id) =>
        set(s => ({ items: s.items.filter(i => i.id !== id) })),

      updateQuantity: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return }
        set(s => ({
          items: s.items.map(i =>
            i.id === id
              ? { ...i, quantity: qty, totalPrice: i.unitPrice * qty }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      cartTotal: () =>
        get().items.reduce((sum, i) => sum + i.totalPrice, 0),

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name:    'amirani-cart',
      version: 1,
    }
  )
)
