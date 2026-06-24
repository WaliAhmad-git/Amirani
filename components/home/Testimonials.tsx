import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { testimonials } from '@/lib/data/testimonials'

// ── Star rating ─────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} out of 5 stars`}
      style={{ display: 'flex', gap: '3px' }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#C9897A' : 'none'}
          stroke={i < rating ? '#C9897A' : '#DDD3C8'}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

// ── Quote icon ──────────────────────────────────────────────────────
function QuoteIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="#E8C9B8"
      aria-hidden="true"
    >
      <path d="M10 8C6.686 8 4 10.686 4 14v8h8v-8H6c0-2.206 1.794-4 4-4V8zm14 0c-3.314 0-6 2.686-6 6v8h8v-8h-6c0-2.206 1.794-4 4-4V8z" />
    </svg>
  )
}

// ── Main component ──────────────────────────────────────────────────
export default function Testimonials() {
  // Show first 3 testimonials
  const featured = testimonials.slice(0, 3)

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-linen"
      style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}
    >
      <div className="container-site">
        <SectionHeader
          id="testimonials-heading"
          eyebrow="From Our Community"
          title="What Our Customers Say"
          subtitle="Afghan diaspora families across Europe share their Amirani experience."
        />

        <div
          style={{
            marginTop:           '3rem',
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '1.5rem',
            alignItems:          'stretch',
          }}
          className="testimonials-grid"
        >
          {featured.map((t, idx) => (
            <TestimonialCard key={t.id} testimonial={t} delay={idx * 100} />
          ))}
        </div>

        {/* Subtle trust footnote */}
        <p
          style={{
            textAlign:   'center',
            marginTop:   '2.5rem',
            fontFamily:  'Inter, sans-serif',
            fontSize:    '0.8rem',
            color:       '#A3705F',
            letterSpacing: '0.02em',
          }}
        >
          Real customers. Real orders. No paid reviews.
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .testimonials-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── Single testimonial card ─────────────────────────────────────────
function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: typeof testimonials[0]
  delay: number
}) {
  return (
    <figure
      style={{
        backgroundColor: '#FDFAF7',
        borderRadius:    '16px',
        padding:         '2rem 1.75rem',
        border:          '1px solid #EFE8DC',
        boxShadow:       '0 2px 12px rgba(92,74,66,0.06)',
        display:         'flex',
        flexDirection:   'column',
        gap:             '1.25rem',
        margin:          0,
      }}
    >
      {/* Top: quote icon + badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <QuoteIcon />
        <Badge variant={testimonial.type === 'custom' ? 'accent' : 'sage'}>
          {testimonial.type === 'custom' ? 'Custom Order' : 'Premade'}
        </Badge>
      </div>

      {/* Star rating */}
      <StarRating rating={testimonial.rating} />

      {/* Quote */}
      <blockquote
        style={{
          fontFamily:  'Playfair Display, Georgia, serif',
          fontWeight:  400,
          fontStyle:   'italic',
          fontSize:    'clamp(0.95rem, 2vw, 1.05rem)',
          lineHeight:  1.7,
          color:       '#5C4A42',
          margin:      0,
          flex:        1,
        }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <figcaption
        style={{
          borderTop:   '1px solid #EFE8DC',
          paddingTop:  '1rem',
          display:     'flex',
          flexDirection:'column',
          gap:         '2px',
        }}
      >
        <span
          style={{
            fontFamily:  'Inter, sans-serif',
            fontWeight:  600,
            fontSize:    '0.9rem',
            color:       '#5C4A42',
          }}
        >
          {testimonial.name}
        </span>
        <span
          style={{
            fontFamily:  'Inter, sans-serif',
            fontSize:    '0.8rem',
            color:       '#A3705F',
          }}
        >
          {testimonial.city}, {testimonial.country}
        </span>
      </figcaption>
    </figure>
  )
}
