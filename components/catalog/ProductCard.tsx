'use client'

import Link from 'next/link'
import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addPremade = useCartStore(s => s.addPremade)
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addPremade(product, product.colors[0], product.sizes[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article
      style={{
        backgroundColor: '#FDFAF7',
        borderRadius:    '12px',
        overflow:        'hidden',
        border:          '1px solid #EFE8DC',
        boxShadow:       hovered ? '0 8px 32px rgba(92,74,66,0.13)' : '0 2px 12px rgba(92,74,66,0.07)',
        transform:       hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:      'box-shadow 0.25s ease, transform 0.25s ease',
        display:         'flex',
        flexDirection:   'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <Link href={`/catalog/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          style={{
            aspectRatio:     '4/3',
            position:        'relative',
            overflow:        'hidden',
            background:      `linear-gradient(135deg, ${product.colorHex[0]}55 0%, ${product.colorHex[1] ?? product.colorHex[0]}33 100%)`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          {/* Placeholder motif */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            style={{ width: '56px', opacity: 0.15 }}
          >
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#5C4A42" strokeWidth="2" />
            <polygon points="40,16 62,28 62,52 40,64 18,52 18,28" fill="#5C4A42" opacity="0.4" />
            <circle cx="40" cy="40" r="8" fill="#5C4A42" />
          </svg>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div
              style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: 'rgba(253,250,247,0.7)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
              }}
            >
              <span
                style={{
                  fontFamily:      'Inter, sans-serif',
                  fontSize:        '0.75rem',
                  fontWeight:      600,
                  letterSpacing:   '0.1em',
                  textTransform:   'uppercase',
                  color:           '#8C7B70',
                  backgroundColor: '#EFE8DC',
                  padding:         '0.4rem 0.875rem',
                  borderRadius:    '99px',
                  border:          '1px solid #DDD3C8',
                }}
              >
                Out of Stock
              </span>
            </div>
          )}

          {/* Featured badge */}
          {product.featured && product.inStock && (
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
              <Badge variant="accent">Featured</Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div
        style={{
          padding:       '1.125rem 1.125rem 1.375rem',
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.625rem',
          flex:          1,
        }}
      >
        {/* Category + type row */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="default">
            {product.category === 'mens' ? "Men's" : product.category === 'womens' ? "Women's" : "Kids'"}
          </Badge>
          <Badge variant="sage" >
            {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
          </Badge>
        </div>

        {/* Name */}
        <Link href={`/catalog/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              fontFamily:  'Playfair Display, serif',
              fontWeight:  500,
              fontSize:    '1rem',
              lineHeight:  1.35,
              color:       '#5C4A42',
              margin:      0,
              transition:  'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C9897A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5C4A42')}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize:   '1.05rem',
            color:      '#5C4A42',
            margin:     0,
          }}
        >
          {formatPrice(product.price)}
        </p>

        {/* Color swatches */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {product.colorHex.slice(0, 5).map((hex, i) => (
            <div
              key={i}
              title={product.colors[i]}
              style={{
                width:        '14px',
                height:       '14px',
                borderRadius: '50%',
                backgroundColor: hex,
                border:       '1px solid rgba(92,74,66,0.18)',
                flexShrink:   0,
              }}
            />
          ))}
          {product.colorHex.length > 5 && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#8C7B70' }}>
              +{product.colorHex.length - 5}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
          <Link
            href={`/catalog/${product.slug}`}
            style={{
              flex:            '0 0 auto',
              display:         'inline-flex',
              alignItems:      'center',
              justifyContent:  'center',
              padding:         '0.6rem 0.875rem',
              fontFamily:      'Inter, sans-serif',
              fontSize:        '0.8rem',
              fontWeight:      600,
              color:           '#8C7B70',
              backgroundColor: '#EFE8DC',
              border:          '1.5px solid #DDD3C8',
              borderRadius:    '8px',
              textDecoration:  'none',
              transition:      'background-color 0.2s, color 0.2s',
              letterSpacing:   '0.03em',
              whiteSpace:      'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#DDD3C8'
              e.currentTarget.style.color = '#5C4A42'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#EFE8DC'
              e.currentTarget.style.color = '#8C7B70'
            }}
          >
            View
          </Link>

          <Button
            variant="primary"
            size="sm"
            disabled={!product.inStock || added}
            onClick={handleAdd}
            style={{
              flex:       1,
              opacity:    !product.inStock ? 0.5 : 1,
              cursor:     !product.inStock ? 'not-allowed' : 'pointer',
              fontSize:   '0.8rem',
              padding:    '0.6rem 0.75rem',
              backgroundColor: added ? '#A8B5A0' : undefined,
              borderColor:     added ? '#A8B5A0' : undefined,
            }}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  )
}
