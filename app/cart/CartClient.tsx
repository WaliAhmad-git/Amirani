'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cartStore'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'

export default function CartPage() {
  const { items, clearCart } = useCartStore()

  return (
    <main className="min-h-screen bg-afghan-off-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-h1 text-afghan-warm">Your Cart</h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm font-body text-afghan-stone/60 hover:text-red-400 transition-colors duration-150"
            >
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Items list */}
            <div className="flex-1 bg-white rounded-xl border border-afghan-border px-6">
              <AnimatePresence>
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Summary sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      {/* Empty bag illustration */}
      <div className="w-24 h-24 rounded-full bg-afghan-linen flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-afghan-stone/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>

      <h2 className="font-heading text-h2 text-afghan-warm mb-2">Your cart is empty</h2>
      <p className="font-body text-afghan-stone max-w-sm mb-8">
        Discover our collection of handcrafted Afghan garments, or design something uniquely yours.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-afghan-dusty-rose text-white font-body font-semibold rounded-xl hover:bg-afghan-muted transition-colors duration-200"
        >
          Browse Collection
        </Link>
        <Link
          href="/custom-order"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-afghan-border text-afghan-warm font-body font-semibold rounded-xl hover:bg-afghan-linen transition-colors duration-200"
        >
          Start Custom Order
        </Link>
      </div>
    </motion.div>
  )
}
