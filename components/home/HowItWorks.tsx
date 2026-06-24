import SectionHeader from '@/components/ui/SectionHeader'
import { LinkButton } from '@/components/ui/Button'

// ── Step data ───────────────────────────────────────────────────────
const premadeSteps = [
  {
    number: '01',
    title:  'Browse the Collection',
    desc:   'Explore our ready-to-ship catalog of kameez, perahan, dresses, and coord sets — filtered by category, size, and style.',
  },
  {
    number: '02',
    title:  'Select Size & Colour',
    desc:   'Pick your size and preferred colourway. Each piece lists available stock so you know exactly what\'s ready to ship.',
  },
  {
    number: '03',
    title:  'Delivered to Your Door',
    desc:   'We ship across Belgium, Netherlands, Germany, France, and more. Your order arrives carefully packed within 5–10 days.',
  },
]

const customSteps = [
  {
    number: '01',
    title:  'Choose Your Fabric',
    desc:   'Select from silk, chiffon, velvet, linen, cotton, and satin — each with its own character and price point.',
  },
  {
    number: '02',
    title:  'Describe Your Design',
    desc:   'Tell us the garment type, style preferences, neckline, embroidery details, and any reference images you have.',
  },
  {
    number: '03',
    title:  'Enter Your Measurements',
    desc:   'Provide your exact body measurements — we tailor every custom order to fit you perfectly, not a generic size chart.',
  },
  {
    number: '04',
    title:  'Delivered to Your Door',
    desc:   'After you confirm your order, we craft and ship your garment within 3–4 weeks. You\'ll receive updates throughout.',
  },
]

// ── Icons ──────────────────────────────────────────────────────────
function BrowseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function FabricIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

// ── Main component ──────────────────────────────────────────────────
export default function HowItWorks() {
  return (
    <section
      aria-labelledby="hiw-heading"
      className="section-linen"
      style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}
    >
      <div className="container-site">
        <SectionHeader
          id="hiw-heading"
          eyebrow="Two Ways to Shop"
          title="How It Works"
          subtitle="Whether you want something ready to wear or designed just for you, we've made the process simple."
        />

        <div
          style={{
            marginTop:           '3.5rem',
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '2rem',
          }}
          className="hiw-grid"
        >
          {/* Premade column */}
          <OrderColumn
            icon={<BrowseIcon />}
            label="Premade Orders"
            accentColor="#A8B5A0"
            accentBg="#F0F3EF"
            steps={premadeSteps}
            ctaLabel="Browse Collection"
            ctaHref="/catalog"
            ctaVariant="secondary"
          />

          {/* Custom column */}
          <OrderColumn
            icon={<FabricIcon />}
            label="Custom Orders"
            accentColor="#C9897A"
            accentBg="#FDF5F2"
            steps={customSteps}
            ctaLabel="Start Custom Order"
            ctaHref="/custom-order"
            ctaVariant="primary"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── Column sub-component ────────────────────────────────────────────
interface OrderColumnProps {
  icon:         React.ReactNode
  label:        string
  accentColor:  string
  accentBg:     string
  steps:        { number: string; title: string; desc: string }[]
  ctaLabel:     string
  ctaHref:      string
  ctaVariant:   'primary' | 'secondary' | 'outline' | 'ghost'
}

function OrderColumn({
  icon, label, accentColor, accentBg, steps, ctaLabel, ctaHref, ctaVariant,
}: OrderColumnProps) {
  return (
    <div
      style={{
        backgroundColor: '#FDFAF7',
        borderRadius:    '16px',
        padding:         'clamp(1.5rem, 4vw, 2.5rem)',
        border:          '1px solid #EFE8DC',
        boxShadow:       '0 2px 12px rgba(92,74,66,0.06)',
        display:         'flex',
        flexDirection:   'column',
      }}
    >
      {/* Column header */}
      <div
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '0.75rem',
          marginBottom:  '2rem',
          paddingBottom: '1.25rem',
          borderBottom:  '1px solid #EFE8DC',
        }}
      >
        <div
          style={{
            width:           '40px',
            height:          '40px',
            borderRadius:    '10px',
            backgroundColor: accentBg,
            color:           accentColor,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 500,
            fontSize:   '1.2rem',
            color:      '#5C4A42',
          }}
        >
          {label}
        </h3>
      </div>

      {/* Steps */}
      <ol
        style={{
          listStyle: 'none',
          flex:      1,
          display:   'flex',
          flexDirection: 'column',
          gap:       '1.5rem',
          marginBottom: '2rem',
        }}
        aria-label={`${label} steps`}
      >
        {steps.map((step, i) => (
          <li
            key={step.number}
            style={{
              display: 'flex',
              gap:     '1rem',
              alignItems: 'flex-start',
            }}
          >
            {/* Step number */}
            <div
              style={{
                flexShrink:      0,
                width:           '32px',
                height:          '32px',
                borderRadius:    '50%',
                backgroundColor: accentBg,
                border:          `1.5px solid ${accentColor}44`,
                color:           accentColor,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontFamily:      'Inter, sans-serif',
                fontSize:        '0.75rem',
                fontWeight:      700,
                letterSpacing:   '0.04em',
              }}
              aria-hidden="true"
            >
              {i + 1}
            </div>

            <div>
              <p
                style={{
                  fontFamily:   'Inter, sans-serif',
                  fontWeight:   600,
                  fontSize:     '0.9rem',
                  color:        '#5C4A42',
                  marginBottom: '0.25rem',
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize:   '0.85rem',
                  color:      '#8C7B70',
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA */}
      <LinkButton href={ctaHref} variant={ctaVariant} size="md" style={{ width: '100%', justifyContent: 'center' }}>
        {ctaLabel}
      </LinkButton>
    </div>
  )
}
