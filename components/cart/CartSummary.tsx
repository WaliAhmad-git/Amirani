'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'

export default function CartSummary() {
  const { cartTotal, itemCount } = useCartStore()
  const [checkoutClicked, setCheckoutClicked] = useState(false)

  const total = cartTotal()
  const count = itemCount()

  return (
    <div className="rounded-xl border border-afghan-border bg-afghan-ivory p-6 sticky top-24">
      <h2 className="font-heading text-h3 text-afghan-warm mb-5">Order Summary</h2>

      <div className="space-y-3 font-body text-sm">
        <div className="flex justify-between text-afghan-stone">
          <span>Items ({count})</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-afghan-stone">
          <span>Shipping</span>
          <span className="text-afghan-stone/60 italic">Calculated at checkout</span>
        </div>
        <div className="border-t border-afghan-border pt-3 flex justify-between font-semibold text-base text-afghan-warm">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Checkout button */}
      <div className="mt-5 space-y-3">
        <AnimatePresence mode="wait">
          {checkoutClicked ? (
            <motion.div
              key="coming-soon"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full py-3.5 rounded-xl bg-afghan-linen border border-afghan-border text-center"
            >
              <p className="font-body font-semibold text-afghan-warm text-sm">Coming Soon</p>
              <p className="font-body text-xs text-afghan-stone/60 mt-0.5">
                Online checkout launching shortly.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-2 text-xs font-body text-afghan-dusty-rose hover:underline"
              >
                Contact us to order →
              </Link>
            </motion.div>
          ) : (
            <motion.button
              key="checkout-btn"
              onClick={() => setCheckoutClicked(true)}
              className="w-full py-3.5 bg-afghan-dusty-rose text-white font-body font-semibold rounded-xl hover:bg-afghan-muted transition-colors duration-200 flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Checkout
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <Link
          href="/catalog"
          className="flex items-center justify-center gap-1.5 w-full py-3 border border-afghan-border rounded-xl font-body text-sm font-medium text-afghan-stone hover:bg-afghan-linen hover:text-afghan-warm transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </Link>
      </div>

      <p className="text-xs font-body text-afghan-stone/50 mt-4 text-center leading-relaxed">
        Secure order. Payment arranged after confirmation.
      </p>
    </div>
  )
}
