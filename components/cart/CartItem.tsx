'use client'

import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { CartItem as CartItemType, CartItemPremade, CartItemCustom } from '@/lib/types'

const GARMENT_LABELS: Record<string, string> = {
  kameez: 'Kameez', perahan: 'Perahan', dress: 'Dress', vest: 'Vest', set: 'Full Set',
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore()

  if (item.type === 'premade') {
    return <PremadeRow item={item as CartItemPremade} onQty={updateQuantity} onRemove={removeItem} />
  }
  return <CustomRow item={item as CartItemCustom} onRemove={removeItem} />
}

// ── Premade row ────────────────────────────────────────────────────
function PremadeRow({
  item,
  onQty,
  onRemove,
}: {
  item: CartItemPremade
  onQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
}) {
  const { product, selectedColor, selectedSize, quantity, totalPrice } = item

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 py-5 border-b border-afghan-border last:border-0"
    >
      {/* Product image placeholder */}
      <div className="w-20 h-24 flex-shrink-0 rounded-lg bg-afghan-linen flex items-center justify-center overflow-hidden">
        <svg className="w-8 h-8 text-afghan-stone/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-h4 text-afghan-warm leading-snug truncate">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-sm font-body text-afghan-stone">
          <span className="capitalize">{product.category}</span>
          <span>·</span>
          <span>{selectedColor}</span>
          <span>·</span>
          <span>Size {selectedSize}</span>
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          {/* Qty controls */}
          <div className="flex items-center gap-2 bg-afghan-linen rounded-lg p-1">
            <button
              onClick={() => onQty(item.id, quantity - 1)}
              aria-label="Decrease quantity"
              className="w-7 h-7 rounded-md flex items-center justify-center text-afghan-stone hover:bg-afghan-blush hover:text-afghan-warm transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-6 text-center font-body font-semibold text-sm text-afghan-warm">
              {quantity}
            </span>
            <button
              onClick={() => onQty(item.id, quantity + 1)}
              aria-label="Increase quantity"
              className="w-7 h-7 rounded-md flex items-center justify-center text-afghan-stone hover:bg-afghan-blush hover:text-afghan-warm transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-body font-semibold text-afghan-warm">
              {formatPrice(totalPrice)}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${product.name} from cart`}
              className="text-afghan-stone/50 hover:text-red-400 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Custom order row ───────────────────────────────────────────────
function CustomRow({
  item,
  onRemove,
}: {
  item: CartItemCustom
  onRemove: (id: string) => void
}) {
  const { customOrder, totalPrice } = item
  const { fabric, design } = customOrder

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 py-5 border-b border-afghan-border last:border-0"
    >
      {/* Fabric swatch */}
      <div
        className="w-20 h-24 flex-shrink-0 rounded-lg border border-afghan-border"
        style={{ backgroundColor: fabric?.swatchColor ?? '#EFE8DC' }}
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <span className="inline-block px-2 py-0.5 text-xs font-body font-semibold bg-afghan-blush text-afghan-warm rounded-full">
            Custom Order
          </span>
        </div>

        <div className="mt-1.5 space-y-0.5 text-sm font-body text-afghan-stone">
          {design.garmentType && (
            <p className="font-medium text-afghan-warm">
              {GARMENT_LABELS[design.garmentType] ?? design.garmentType}
            </p>
          )}
          {fabric && (
            <p>{fabric.name} <span className="text-afghan-stone/50">·</span> {fabric.type}</p>
          )}
          {design.colorPreference && (
            <p className="truncate">{design.colorPreference}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <span className="text-xs font-body text-afghan-stone/60 italic">Qty: 1</span>
          <div className="flex items-center gap-3">
            <span className="font-body font-semibold text-afghan-warm">
              {formatPrice(totalPrice)}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              aria-label="Remove custom order from cart"
              className="text-afghan-stone/50 hover:text-red-400 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
