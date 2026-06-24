'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCustomOrderStore } from '@/lib/store/customOrderStore'
import { getAvailableFabrics } from '@/lib/data/fabrics'
import type { Fabric } from '@/lib/types'
import FabricCard from './FabricCard'
import { formatPrice } from '@/lib/utils/formatPrice'

const BASE_PRICE = 120  // EUR base price for custom orders

export default function FabricSelector() {
  const router   = useRouter()
  const fabrics  = getAvailableFabrics()
  const { fabric: selected, setFabric } = useCustomOrderStore()

  const total = selected ? BASE_PRICE + selected.priceModifier : BASE_PRICE

  const handleSelect = (fabric: Fabric) => {
    // toggle off if clicking already-selected
    setFabric(fabric.id === selected?.id ? null : fabric)
  }

  const handleNext = () => {
    if (!selected) return
    router.push('/custom-order/design')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl text-afghan-charcoal mb-2">
          Choose Your Fabric
        </h1>
        <p className="font-body text-afghan-charcoal/60 text-sm max-w-md mx-auto">
          The fabric is the foundation of your garment. Each option has a different feel, drape, and occasion suitability.
        </p>
      </div>

      {/* Fabric grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {fabrics.map((fabric, i) => (
          <motion.div
            key={fabric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <FabricCard
              fabric={fabric}
              isSelected={selected?.id === fabric.id}
              onSelect={handleSelect}
            />
          </motion.div>
        ))}
      </div>

      {/* Price preview + CTA */}
      <div className="sticky bottom-4 z-20">
        <div className={`
          rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
          backdrop-blur-sm shadow-xl
          transition-colors duration-300
          ${selected
            ? 'bg-white border-afghan-terracotta/30'
            : 'bg-white/90 border-afghan-saffron/20'}
        `}>
          {/* Price breakdown */}
          <div className="font-body text-sm">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="space-y-0.5"
                >
                  <p className="text-afghan-charcoal/60">
                    Base price <span className="text-afghan-charcoal font-medium">{formatPrice(BASE_PRICE)}</span>
                    {selected.priceModifier > 0 && (
                      <> + <span className="text-afghan-terracotta font-medium">{formatPrice(selected.priceModifier)}</span> fabric</>
                    )}
                  </p>
                  <p className="text-lg font-semibold text-afghan-charcoal">
                    Estimated total: <span className="text-afghan-terracotta">{formatPrice(total)}</span>
                  </p>
                  <p className="text-xs text-afghan-charcoal/40">
                    Final price confirmed after measurements
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-afghan-charcoal/50"
                >
                  Select a fabric to see pricing
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Next button */}
          <motion.button
            onClick={handleNext}
            disabled={!selected}
            whileHover={selected ? { scale: 1.02 } : {}}
            whileTap={selected ? { scale: 0.98 } : {}}
            className={`
              shrink-0 px-6 py-3 rounded-lg font-body font-semibold text-sm transition-all duration-200 flex items-center gap-2
              ${selected
                ? 'bg-afghan-terracotta text-white shadow-md hover:bg-afghan-burgundy cursor-pointer'
                : 'bg-afghan-charcoal/10 text-afghan-charcoal/30 cursor-not-allowed'}
            `}
            aria-disabled={!selected}
          >
            Next: Design Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
