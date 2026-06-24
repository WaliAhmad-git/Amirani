import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, getProductBySlug } from '@/lib/data/products'
import ProductDetail from '@/components/catalog/ProductDetail'
import PatternDivider from '@/components/ui/PatternDivider'
import SectionHeader from '@/components/ui/SectionHeader'
import { LinkButton } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

// ── Static params — pre-render all product slugs ────────────────────
export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

// ── Metadata ────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title:       product.name,
    description: product.description,
    openGraph: {
      title:       `${product.name} — Amirani Store`,
      description: product.description,
      type:        'website',
    },
  }
}

// ── Page ────────────────────────────────────────────────────────────
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) notFound()

  // Related products — same category, excluding current
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id && p.inStock)
    .slice(0, 3)

  return (
    <div style={{ backgroundColor: '#FAF6F0', minHeight: '100dvh' }}>
      <div
        className="container-site"
        style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem clamp(4rem, 8vw, 6rem)' }}
      >
        <Reveal y={16} duration={0.5}>
          <ProductDetail product={product} />
        </Reveal>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: 'clamp(4rem, 8vw, 6rem)' }}>
            <PatternDivider />
            <div style={{ marginTop: '3rem' }}>
              <Reveal>
                <SectionHeader
                  eyebrow={`More ${product.category === 'mens' ? "Men's" : product.category === 'womens' ? "Women's" : "Kids'"} Pieces`}
                  title="You Might Also Like"
                  align="left"
                />
              </Reveal>

              <RevealGroup
                style={{
                  marginTop:           '2rem',
                  display:             'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap:                 '1.25rem',
                }}
                className="related-grid"
                stagger={0.1}
              >
                {related.map(p => {
                  // Import ProductCard inline to avoid circular deps with the client component
                  return (
                    <RevealItem key={p.id} y={18}>
                      <RelatedCard name={p.name} slug={p.slug} price={p.price} colorHex={p.colorHex} />
                    </RevealItem>
                  )
                })}
              </RevealGroup>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <LinkButton href="/catalog" variant="outline" size="md">
                  View Full Collection
                </LinkButton>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}

// ── Lightweight related card (server component, no cart) ────────────
import { formatPrice } from '@/lib/utils/formatPrice'
import Link from 'next/link'

function RelatedCard({ name, slug, price, colorHex }: { name: string; slug: string; price: number; colorHex: string[] }) {
  return (
    <Link
      href={`/catalog/${slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="related-card"
        style={{
          backgroundColor: '#FDFAF7',
          borderRadius:    '12px',
          overflow:        'hidden',
          border:          '1px solid #EFE8DC',
          boxShadow:       '0 2px 12px rgba(92,74,66,0.07)',
          transition:      'box-shadow 0.25s, transform 0.25s',
        }}
      >
        <div
          style={{
            aspectRatio:  '4/3',
            background:   `linear-gradient(135deg, ${colorHex[0]}44 0%, ${colorHex[1] ?? colorHex[0]}22 100%)`,
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 60 60" style={{ width: '40px', opacity: 0.14 }}>
            <polygon points="30,3 57,16 57,44 30,57 3,44 3,16" fill="#5C4A42" />
          </svg>
        </div>
        <div style={{ padding: '1rem' }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500, fontSize: '0.95rem', color: '#5C4A42', margin: '0 0 0.35rem' }}>
            {name}
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#8C7B70', margin: 0 }}>
            {formatPrice(price)}
          </p>
        </div>
      </div>
      <style>{`
        .related-card:hover {
          box-shadow: 0 8px 32px rgba(92,74,66,0.13);
          transform: translateY(-3px);
        }
      `}</style>
    </Link>
  )
}
