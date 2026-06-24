'use client'

import { useEffect, useState } from 'react'
import { LinkButton } from '@/components/ui/Button'

export default function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      aria-label="Welcome to Amirani Store"
      style={{
        position:   'relative',
        minHeight:  '100dvh',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
        backgroundColor: '#EFE8DC',
      }}
    >
      {/* ── Background pattern overlay ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: `
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,137,122,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 20% 80%, rgba(168,181,160,0.10) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Afghan tile watermark (top-right) ───────────────── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position:   'absolute',
          top:        '-40px',
          right:      '-40px',
          width:      '360px',
          opacity:    0.07,
          pointerEvents: 'none',
        }}
      >
        <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" fill="none" stroke="#C9897A" strokeWidth="2" />
        <polygon points="100,30 170,65 170,135 100,170 30,135 30,65" fill="none" stroke="#C9897A" strokeWidth="1.5" />
        <polygon points="100,50 150,75 150,125 100,150 50,125 50,75" fill="#C9897A" opacity="0.4" />
        <polygon points="100,70 130,85 130,115 100,130 70,115 70,85" fill="none" stroke="#C9897A" strokeWidth="1" />
        <circle cx="100" cy="100" r="10" fill="#C9897A" />
      </svg>

      {/* ── Bottom-left decorative motif ────────────────────── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position:   'absolute',
          bottom:     '-30px',
          left:       '-30px',
          width:      '280px',
          opacity:    0.06,
          pointerEvents: 'none',
        }}
      >
        <polygon points="80,5 155,42 155,118 80,155 5,118 5,42" fill="none" stroke="#A8B5A0" strokeWidth="2" />
        <polygon points="80,25 130,52 130,108 80,135 30,108 30,52" fill="#A8B5A0" opacity="0.5" />
        <circle cx="80" cy="80" r="18" fill="none" stroke="#A8B5A0" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="6" fill="#A8B5A0" />
      </svg>

      {/* ── Content ─────────────────────────────────────────── */}
      <div
        className="container-site"
        style={{
          position:  'relative',
          zIndex:    1,
          padding:   'clamp(5rem, 12vw, 8rem) 1.25rem clamp(4rem, 8vw, 6rem)',
          maxWidth:  '700px',

          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 0.75s ease, transform 0.75s ease',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily:    'Inter, sans-serif',
            fontSize:      '0.75rem',
            fontWeight:    600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color:         '#A3705F',
            marginBottom:  '1.25rem',

            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition:'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          Afghan Fashion · Made for You
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily:   'Playfair Display, Georgia, serif',
            fontWeight:   500,
            fontSize:     'clamp(2.6rem, 7vw, 4.5rem)',
            lineHeight:   1.08,
            letterSpacing:'-0.02em',
            color:        '#5C4A42',
            marginBottom: '1.5rem',

            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition:'opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s',
          }}
        >
          Wear Your Roots.
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily:  'Inter, sans-serif',
            fontSize:    'clamp(1rem, 2.5vw, 1.125rem)',
            lineHeight:  1.75,
            color:       '#8C7B70',
            maxWidth:    '520px',
            marginBottom:'2.5rem',

            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition:'opacity 0.65s ease 0.35s, transform 0.65s ease 0.35s',
          }}
        >
          Authentic Afghan kameez, perahan, and custom-made garments — crafted for the
          diaspora and shipped across Europe. Premade pieces ready to order, or design
          something entirely your own.
        </p>

        {/* CTAs */}
        <div
          style={{
            display:  'flex',
            gap:      '1rem',
            flexWrap: 'wrap',

            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition:'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s',
          }}
        >
          <LinkButton href="/catalog" variant="primary" size="lg">
            Browse Collection
          </LinkButton>
          <LinkButton href="/custom-order" variant="outline" size="lg">
            Custom Order
          </LinkButton>
        </div>

        {/* Trust line */}
        <p
          style={{
            fontFamily:  'Inter, sans-serif',
            fontSize:    '0.8rem',
            color:       '#A3705F',
            marginTop:   '2rem',
            letterSpacing:'0.02em',

            opacity:   visible ? 0.75 : 0,
            transition:'opacity 0.6s ease 0.6s',
          }}
        >
          Shipping to Belgium · Netherlands · Germany · France & more
        </p>
      </div>

      {/* ── Decorative horizontal rule at bottom ─────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          bottom:          0,
          left:            0,
          right:           0,
          height:          '3px',
          background:      'linear-gradient(90deg, transparent, #DDD3C8 30%, #C9897A 50%, #DDD3C8 70%, transparent)',
          opacity:         0.6,
        }}
      />
    </section>
  )
}
