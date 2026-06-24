'use client'

import { useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LinkButton } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/lib/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addPremade = useCartStore(s => s.addPremade)

  const [activeImage,  setActiveImage]  = useState(0)
  const [activeColor,  setActiveColor]  = useState(0)
  const [activeSize,   setActiveSize]   = useState(0)
  const [qty,          setQty]          = useState(1)
  const [added,        setAdded]        = useState(false)

  const handleAdd = () => {
    if (!product.inStock) return
    addPremade(product, product.colors[activeColor], product.sizes[activeSize], qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  // Build thumbnail array — use swatch colors as placeholder if single image
  const images = product.images.length > 1
    ? product.images
    : [product.images[0], ...product.colorHex.slice(1, 3).map(h => `placeholder:${h}`)]

  return (
    <div>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{
          fontFamily:   'Inter, sans-serif',
          fontSize:     '0.8rem',
          color:        '#A3705F',
          marginBottom: '2rem',
          display:      'flex',
          gap:          '0.5rem',
          alignItems:   'center',
          flexWrap:     'wrap',
        }}
      >
        <Link href="/" style={{ color: '#A3705F', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9897A')}
          onMouseLeave={e => (e.currentTarget.style.color = '#A3705F')}
        >Home</Link>
        <ChevronRight />
        <Link href="/catalog" style={{ color: '#A3705F', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9897A')}
          onMouseLeave={e => (e.currentTarget.style.color = '#A3705F')}
        >Catalog</Link>
        <ChevronRight />
        <span style={{ color: '#5C4A42', fontWeight: 500 }}>{product.name}</span>
      </nav>

      {/* Main layout */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 'clamp(2rem, 5vw, 4rem)',
          alignItems:          'flex-start',
        }}
        className="detail-grid"
      >
        {/* ── Left: Image gallery ─────────────────────────────── */}
        <div>
          {/* Main image */}
          <div
            style={{
              aspectRatio:     '4/5',
              borderRadius:    '16px',
              overflow:        'hidden',
              backgroundColor: `${product.colorHex[activeColor]}44`,
              background:      `linear-gradient(135deg, ${product.colorHex[activeColor]}55 0%, ${product.colorHex[activeColor]}22 100%)`,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              border:          '1px solid #EFE8DC',
              marginBottom:    '1rem',
              position:        'relative',
            }}
          >
            <svg
              aria-label={product.name}
              viewBox="0 0 120 120"
              style={{ width: '90px', opacity: 0.18 }}
            >
              <polygon points="60,6 114,33 114,87 60,114 6,87 6,33" fill="none" stroke="#5C4A42" strokeWidth="2.5" />
              <polygon points="60,24 96,42 96,78 60,96 24,78 24,42" fill="#5C4A42" opacity="0.35" />
              <circle cx="60" cy="60" r="14" fill="#5C4A42" opacity="0.6" />
            </svg>

            {!product.inStock && (
              <div
                style={{
                  position:        'absolute',
                  top:             '1rem',
                  right:           '1rem',
                  backgroundColor: '#EFE8DC',
                  border:          '1px solid #DDD3C8',
                  borderRadius:    '99px',
                  padding:         '0.35rem 0.875rem',
                  fontFamily:      'Inter, sans-serif',
                  fontSize:        '0.75rem',
                  fontWeight:      600,
                  color:           '#8C7B70',
                  letterSpacing:   '0.06em',
                  textTransform:   'uppercase',
                }}
              >
                Out of Stock
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '0.625rem' }}>
            {images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  flex:            '1',
                  aspectRatio:     '1',
                  borderRadius:    '8px',
                  border:          `2px solid ${activeImage === i ? '#C9897A' : '#EFE8DC'}`,
                  backgroundColor: `${product.colorHex[i] ?? product.colorHex[0]}33`,
                  background:      `linear-gradient(135deg, ${product.colorHex[i] ?? product.colorHex[0]}44 0%, ${product.colorHex[i] ?? product.colorHex[0]}22 100%)`,
                  cursor:          'pointer',
                  padding:         0,
                  overflow:        'hidden',
                  transition:      'border-color 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Product info ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Badges row */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge variant="default">
              {product.category === 'mens' ? "Men's" : product.category === 'womens' ? "Women's" : "Kids'"}
            </Badge>
            <Badge variant="sage">
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </Badge>
            {product.featured && <Badge variant="accent">Featured</Badge>}
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily:   'Playfair Display, Georgia, serif',
              fontWeight:   500,
              fontSize:     'clamp(1.75rem, 4vw, 2.25rem)',
              lineHeight:   1.2,
              color:        '#5C4A42',
              margin:       0,
              letterSpacing:'-0.01em',
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize:   '1.5rem',
              color:      '#5C4A42',
              margin:     0,
            }}
          >
            {formatPrice(product.price)}
          </p>

          <Divider />

          {/* Color selector */}
          <div>
            <SelectorLabel>
              Colour — <span style={{ fontWeight: 400, color: '#8C7B70' }}>{product.colors[activeColor]}</span>
            </SelectorLabel>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {product.colorHex.map((hex, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveColor(i); setActiveImage(0) }}
                  title={product.colors[i]}
                  aria-label={product.colors[i]}
                  aria-pressed={activeColor === i}
                  style={{
                    width:        '32px',
                    height:       '32px',
                    borderRadius: '50%',
                    backgroundColor: hex,
                    border:       `2.5px solid ${activeColor === i ? '#C9897A' : 'rgba(92,74,66,0.15)'}`,
                    cursor:       'pointer',
                    padding:      0,
                    transition:   'border-color 0.15s, transform 0.15s',
                    transform:    activeColor === i ? 'scale(1.12)' : 'scale(1)',
                    boxShadow:    activeColor === i ? '0 0 0 3px rgba(201,137,122,0.2)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div>
            <SelectorLabel>Size</SelectorLabel>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {product.sizes.map((size, i) => (
                <button
                  key={size}
                  onClick={() => setActiveSize(i)}
                  aria-pressed={activeSize === i}
                  style={{
                    minWidth:        '44px',
                    padding:         '0.5rem 0.75rem',
                    borderRadius:    '8px',
                    border:          `1.5px solid ${activeSize === i ? '#C9897A' : '#DDD3C8'}`,
                    backgroundColor: activeSize === i ? '#FDF5F2' : 'transparent',
                    color:           activeSize === i ? '#C9897A' : '#8C7B70',
                    fontFamily:      'Inter, sans-serif',
                    fontSize:        '0.82rem',
                    fontWeight:      activeSize === i ? 700 : 400,
                    cursor:          'pointer',
                    transition:      'border-color 0.15s, background-color 0.15s, color 0.15s',
                    letterSpacing:   '0.03em',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <SelectorLabel>Quantity</SelectorLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '0.75rem', width: 'fit-content' }}>
              <QtyButton onClick={() => setQty(q => Math.max(1, q - 1))} aria="Decrease quantity">−</QtyButton>
              <span
                style={{
                  fontFamily:  'Inter, sans-serif',
                  fontWeight:  600,
                  fontSize:    '1rem',
                  color:       '#5C4A42',
                  width:       '44px',
                  textAlign:   'center',
                }}
              >
                {qty}
              </span>
              <QtyButton onClick={() => setQty(q => q + 1)} aria="Increase quantity">+</QtyButton>
            </div>
          </div>

          <Divider />

          {/* Add to cart */}
          <Button
            variant="primary"
            size="lg"
            disabled={!product.inStock || added}
            onClick={handleAdd}
            style={{
              width:   '100%',
              opacity: !product.inStock ? 0.55 : 1,
              cursor:  !product.inStock ? 'not-allowed' : 'pointer',
              backgroundColor: added ? '#A8B5A0' : undefined,
              borderColor:     added ? '#A8B5A0' : undefined,
            }}
          >
            {!product.inStock
              ? 'Out of Stock'
              : added
              ? '✓ Added to Cart'
              : `Add to Cart — ${formatPrice(product.price * qty)}`}
          </Button>

          {/* Description */}
          <div
            style={{
              padding:      '1.25rem',
              backgroundColor: '#FAF6F0',
              borderRadius: '10px',
              border:       '1px solid #EFE8DC',
            }}
          >
            <p
              style={{
                fontFamily:    'Inter, sans-serif',
                fontSize:      '0.73rem',
                fontWeight:    700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         '#A3705F',
                marginBottom:  '0.625rem',
              }}
            >
              About this piece
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   '0.9rem',
                lineHeight: 1.75,
                color:      '#8C7B70',
                margin:     0,
              }}
            >
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily:      'Inter, sans-serif',
                      fontSize:        '0.72rem',
                      fontWeight:      500,
                      color:           '#8C7B70',
                      backgroundColor: '#EFE8DC',
                      border:          '1px solid #DDD3C8',
                      borderRadius:    '99px',
                      padding:         '0.2rem 0.625rem',
                      letterSpacing:   '0.04em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Custom order nudge */}
          <div
            style={{
              padding:         '1rem 1.25rem',
              borderRadius:    '10px',
              border:          '1px solid #E8C9B8',
              backgroundColor: '#FDF5F2',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'space-between',
              gap:             '1rem',
              flexWrap:        'wrap',
            }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8C7B70', margin: 0, lineHeight: 1.5 }}>
              Can't find the right fit or colour?
            </p>
            <LinkButton href="/custom-order" variant="outline" size="sm">
              Try a Custom Order →
            </LinkButton>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ── Small helpers ───────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: '1px', backgroundColor: '#EFE8DC' }} />
}

function SelectorLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A3705F', margin: 0 }}>
      {children}
    </p>
  )
}

function QtyButton({ children, onClick, aria }: { children: string; onClick: () => void; aria: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      style={{
        width:           '36px',
        height:          '36px',
        border:          '1.5px solid #DDD3C8',
        borderRadius:    '8px',
        backgroundColor: '#FAF6F0',
        color:           '#5C4A42',
        fontFamily:      'Inter, sans-serif',
        fontSize:        '1.1rem',
        fontWeight:      400,
        cursor:          'pointer',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        transition:      'background-color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#EFE8DC'
        e.currentTarget.style.borderColor = '#C9897A'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#FAF6F0'
        e.currentTarget.style.borderColor = '#DDD3C8'
      }}
    >
      {children}
    </button>
  )
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
