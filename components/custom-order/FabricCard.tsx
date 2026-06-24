'use client'

import { motion } from 'framer-motion'
import type { Fabric } from '@/lib/types'
import { formatPrice } from '@/lib/utils/formatPrice'

interface FabricCardProps {
  fabric:     Fabric
  isSelected: boolean
  onSelect:   (fabric: Fabric) => void
}

export default function FabricCard({ fabric, isSelected, onSelect }: FabricCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(fabric)}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none
        ${isSelected
          ? 'border-afghan-terracotta shadow-lg shadow-afghan-terracotta/20'
          : 'border-transparent shadow-md hover:border-afghan-saffron/40'}
        ${!fabric.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      disabled={!fabric.available}
      aria-pressed={isSelected}
      aria-label={`Select ${fabric.name} fabric`}
    >
      {/* Swatch */}
      <div
        className="h-28 w-full relative"
        style={{ backgroundColor: fabric.swatchColor }}
      >
        {/* Texture overlay for richness */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />

        {/* Type badge */}
        <span className="absolute top-2 left-2 bg-black/30 text-white text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-sm">
          {fabric.type}
        </span>

        {/* Selected checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-6 h-6 bg-afghan-terracotta rounded-full flex items-center justify-center shadow"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}

        {/* Unavailable overlay */}
        {!fabric.available && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-afghan-charcoal/60 bg-white/80 px-2 py-1 rounded">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-white p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-sm font-semibold text-afghan-charcoal leading-snug truncate">
              {fabric.name}
            </h3>
            {fabric.origin && (
              <p className="text-[10px] text-afghan-charcoal/50 mt-0.5 font-body truncate">
                {fabric.origin}
              </p>
            )}
          </div>

          {/* Price modifier */}
          <span className={`
            text-xs font-semibold whitespace-nowrap shrink-0 mt-0.5
            ${fabric.priceModifier === 0 ? 'text-afghan-charcoal/40' : 'text-afghan-terracotta'}
          `}>
            {fabric.priceModifier === 0 ? 'Base' : `+${formatPrice(fabric.priceModifier)}`}
          </span>
        </div>

        <p className="text-[11px] text-afghan-charcoal/60 mt-1.5 font-body leading-relaxed line-clamp-2">
          {fabric.description}
        </p>
      </div>

      {/* Selected border accent */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-afghan-terracotta" />
      )}
    </motion.button>
  )
}
