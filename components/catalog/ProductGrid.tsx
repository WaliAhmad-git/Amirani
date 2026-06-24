import ProductCard from './ProductCard'
import { LinkButton } from '@/components/ui/Button'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { Product } from '@/lib/types'

interface ProductGridProps {
  products: Product[]
  total:    number
}

export default function ProductGrid({ products, total }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState total={total} />
  }

  return (
    <div>
      {/* Result count */}
      <p
        style={{
          fontFamily:   'Inter, sans-serif',
          fontSize:     '0.85rem',
          color:        '#8C7B70',
          marginBottom: '1.5rem',
        }}
      >
        Showing <strong style={{ color: '#5C4A42' }}>{products.length}</strong> of{' '}
        <strong style={{ color: '#5C4A42' }}>{total}</strong> products
      </p>

      <RevealGroup
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '1.25rem',
        }}
        className="product-grid"
        stagger={0.06}
      >
        {products.map(product => (
          <RevealItem key={product.id} y={18}>
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </RevealGroup>

      <style>{`
        @media (max-width: 639px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}

function EmptyState({ total }: { total: number }) {
  return (
    <div
      style={{
        textAlign:       'center',
        padding:         'clamp(3rem, 8vw, 5rem) 2rem',
        backgroundColor: '#FDFAF7',
        borderRadius:    '16px',
        border:          '1px solid #EFE8DC',
      }}
    >
      {/* Afghan diamond motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 80 80"
        style={{ width: '64px', margin: '0 auto 1.5rem', display: 'block', opacity: 0.2 }}
      >
        <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#C9897A" strokeWidth="2" />
        <polygon points="40,20 60,30 60,50 40,60 20,50 20,30" fill="#C9897A" opacity="0.3" />
        <circle cx="40" cy="40" r="8" fill="#C9897A" />
      </svg>

      <h3
        style={{
          fontFamily:   'Playfair Display, serif',
          fontWeight:   500,
          fontSize:     '1.3rem',
          color:        '#5C4A42',
          marginBottom: '0.625rem',
        }}
      >
        No products match your filters
      </h3>
      <p
        style={{
          fontFamily:   'Inter, sans-serif',
          fontSize:     '0.9rem',
          color:        '#8C7B70',
          marginBottom: '2rem',
          lineHeight:   1.65,
          maxWidth:     '340px',
          margin:       '0 auto 2rem',
        }}
      >
        Try adjusting your filters, or browse all {total} pieces in our collection.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <LinkButton href="/catalog" variant="primary" size="md">
          View All Products
        </LinkButton>
        <LinkButton href="/custom-order" variant="outline" size="md">
          Try a Custom Order
        </LinkButton>
      </div>
    </div>
  )
}
