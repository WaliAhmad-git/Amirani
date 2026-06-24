'use client'

import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/Button'
import { getFeaturedProducts } from '@/lib/data/products'
import { formatPrice } from '@/lib/utils/formatPrice'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 3)

  return (
    <section
      aria-labelledby="featured-heading"
      className="section-ivory"
      style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}
    >
      <div className="container-site">
        <SectionHeader
          eyebrow="Handpicked for You"
          title="Featured Pieces"
          subtitle="Crafted with care — from everyday kameez to occasion wear. Each piece is ready to ship across Europe."
        />

        {/* Product cards row */}
        <div
          style={{
            marginTop:       '3rem',
            display:         'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:             '1.5rem',
          }}
          className="featured-grid"
        >
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all CTA */}
        <div
          style={{
            marginTop:  '3rem',
            textAlign:  'center',
          }}
        >
          <LinkButton href="/catalog" variant="outline" size="md">
            View Full Collection
          </LinkButton>
        </div>
      </div>

      {/* Mobile scroll styles */}
      <style>{`
        @media (max-width: 767px) {
          .featured-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── Single product card ─────────────────────────────────────────────
function ProductCard({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      className="product-card-link"
    >
      <article
        style={{
          backgroundColor: '#FDFAF7',
          borderRadius:    '12px',
          overflow:        'hidden',
          boxShadow:       '0 4px 24px rgba(92,74,66,0.08)',
          border:          '1px solid #EFE8DC',
          transition:      'box-shadow 0.25s ease, transform 0.25s ease',
          cursor:          'pointer',
        }}
        className="product-card"
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.boxShadow = '0 8px 32px rgba(92,74,66,0.14)'
          el.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.boxShadow = '0 4px 24px rgba(92,74,66,0.08)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            aspectRatio:     '4/3',
            backgroundColor: product.colorHex[0] + '55',
            position:        'relative',
            overflow:        'hidden',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          {/* Swatch color background as placeholder */}
          <div
            style={{
              width:           '100%',
              height:          '100%',
              background:      `linear-gradient(135deg, ${product.colorHex[0]}44 0%, ${product.colorHex[1] ?? product.colorHex[0]}33 100%)`,
            }}
          />
          {/* Placeholder motif */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            style={{
              position: 'absolute',
              width:    '64px',
              opacity:  0.18,
            }}
          >
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#5C4A42" strokeWidth="2" />
            <circle cx="40" cy="40" r="12" fill="#5C4A42" />
          </svg>
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3
              style={{
                fontFamily:  'Playfair Display, serif',
                fontWeight:  500,
                fontSize:    '1.05rem',
                color:       '#5C4A42',
                lineHeight:  1.3,
                flex:        1,
                marginRight: '0.75rem',
              }}
            >
              {product.name}
            </h3>
            <Badge variant="accent">
              {product.category === 'mens' ? "Men's" : product.category === 'womens' ? "Women's" : "Kids'"}
            </Badge>
          </div>

          <p
            style={{
              fontFamily:  'Inter, sans-serif',
              fontSize:    '0.85rem',
              color:       '#8C7B70',
              lineHeight:  1.6,
              marginBottom:'1rem',
              display:     '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient:'vertical',
              overflow:    'hidden',
            }}
          >
            {product.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily:  'Inter, sans-serif',
                fontWeight:  600,
                fontSize:    '1.1rem',
                color:       '#5C4A42',
              }}
            >
              {formatPrice(product.price)}
            </span>
            <span
              style={{
                fontFamily:    'Inter, sans-serif',
                fontSize:      '0.8rem',
                fontWeight:    600,
                color:         '#C9897A',
                letterSpacing: '0.04em',
              }}
            >
              View →
            </span>
          </div>

          {/* Color swatches */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '0.875rem' }}>
            {product.colorHex.slice(0, 4).map((hex, i) => (
              <div
                key={i}
                title={product.colors[i]}
                style={{
                  width:        '16px',
                  height:       '16px',
                  borderRadius: '50%',
                  backgroundColor: hex,
                  border:       '1px solid rgba(92,74,66,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
