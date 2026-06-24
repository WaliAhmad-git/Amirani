import { LinkButton } from '@/components/ui/Button'

// Afghan geometric motif used as a repeating background pattern
function AfghanPatternSVG() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position:   'absolute',
        inset:      0,
        width:      '100%',
        height:     '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <pattern
          id="cta-pattern"
          x="0" y="0"
          width="60" height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond */}
          <polygon
            points="30,6 54,30 30,54 6,30"
            fill="none"
            stroke="rgba(253,250,247,0.12)"
            strokeWidth="1"
          />
          {/* Inner diamond */}
          <polygon
            points="30,16 44,30 30,44 16,30"
            fill="rgba(253,250,247,0.06)"
            stroke="rgba(253,250,247,0.08)"
            strokeWidth="0.8"
          />
          {/* Centre dot */}
          <circle cx="30" cy="30" r="3" fill="rgba(253,250,247,0.12)" />
          {/* Corner dots */}
          <circle cx="0"  cy="0"  r="1.5" fill="rgba(253,250,247,0.07)" />
          <circle cx="60" cy="0"  r="1.5" fill="rgba(253,250,247,0.07)" />
          <circle cx="0"  cy="60" r="1.5" fill="rgba(253,250,247,0.07)" />
          <circle cx="60" cy="60" r="1.5" fill="rgba(253,250,247,0.07)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-pattern)" />
    </svg>
  )
}

export default function CustomOrderCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        position:        'relative',
        overflow:        'hidden',
        backgroundColor: '#5C4A42',
        padding:         'clamp(3.5rem, 8vw, 5.5rem) 0',
      }}
    >
      {/* Background pattern */}
      <AfghanPatternSVG />

      {/* Accent gradient blobs */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        '-80px',
          right:      '-80px',
          width:      '360px',
          height:     '360px',
          borderRadius:'50%',
          background: 'radial-gradient(circle, rgba(201,137,122,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          bottom:     '-60px',
          left:       '-60px',
          width:      '280px',
          height:     '280px',
          borderRadius:'50%',
          background: 'radial-gradient(circle, rgba(168,181,160,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container-site"
        style={{
          position:  'relative',
          zIndex:    1,
          textAlign: 'center',
          maxWidth:  '680px',
          margin:    '0 auto',
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
            color:         '#E8C9B8',
            marginBottom:  '1rem',
          }}
        >
          Custom Tailoring · 4 Easy Steps
        </p>

        {/* Heading */}
        <h2
          id="cta-heading"
          style={{
            fontFamily:   'Playfair Display, Georgia, serif',
            fontWeight:   500,
            fontSize:     'clamp(2rem, 5vw, 3rem)',
            lineHeight:   1.15,
            letterSpacing:'-0.015em',
            color:        '#FAF6F0',
            marginBottom: '1.25rem',
          }}
        >
          Design Your Perfect Outfit
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily:  'Inter, sans-serif',
            fontSize:    'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight:  1.75,
            color:       '#DDD3C8',
            marginBottom:'2.25rem',
          }}
        >
          Choose your fabric, describe your vision, share your measurements — and we'll
          craft a garment made to fit you exactly. No generic sizing. No compromise.
          Just something made for you, delivered to your door in Europe.
        </p>

        {/* Feature pills */}
        <div
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            gap:            '0.75rem',
            justifyContent: 'center',
            marginBottom:   '2.5rem',
          }}
        >
          {[
            '9 fabric choices',
            'Exact measurements',
            'Ships to Europe',
            'Ready in 3–4 weeks',
          ].map(pill => (
            <span
              key={pill}
              style={{
                fontFamily:      'Inter, sans-serif',
                fontSize:        '0.78rem',
                fontWeight:      500,
                color:           '#E8C9B8',
                backgroundColor: 'rgba(253,250,247,0.08)',
                border:          '1px solid rgba(232,201,184,0.25)',
                borderRadius:    '99px',
                padding:         '0.4rem 0.875rem',
                letterSpacing:   '0.02em',
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <LinkButton href="/custom-order" variant="primary" size="lg">
          Start Your Custom Order
        </LinkButton>
      </div>
    </section>
  )
}
