import type { Metadata } from 'next'
import Link from 'next/link'
import PatternDivider from '@/components/ui/PatternDivider'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Custom Order — Amirani Store',
  description: 'Design a garment made exactly for you. Choose your fabric, describe your vision, provide measurements — we tailor it and ship to your door.',
}

const STEPS = [
  {
    number: 1,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    title: 'Choose Your Fabric',
    description: 'Browse our curated selection of silks, linens, chiffons, and more. Each fabric is sourced for quality and suitability for Afghan garment styles.',
  },
  {
    number: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
    title: 'Describe Your Design',
    description: 'Tell us what you have in mind — garment type, neckline, embroidery, occasion. Share a reference image if you have one.',
  },
  {
    number: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    title: 'Your Measurements',
    description: 'Provide your exact body measurements for a perfect fit. We guide you step by step — no tailor needed on your end.',
  },
  {
    number: 4,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: 'Review & Order',
    description: "Confirm your choices, enter shipping details, and place your order. We'll contact you within 24 hours to confirm everything and arrange payment.",
  },
]

export default function CustomOrderPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-afghan-burgundy text-white py-20 px-4 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Reveal className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block text-afghan-saffron text-xs font-semibold uppercase tracking-widest mb-4 font-body">
            Made For You
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl mb-5 leading-tight">
            Your Garment,<br />Your Way.
          </h1>
          <p className="font-body text-white/75 text-lg max-w-xl mx-auto mb-8">
            We craft traditional Afghan clothing tailored to your exact measurements and style. Shipped directly to Europe, made with love.
          </p>
          <Link
            href="/custom-order/fabric"
            className="inline-flex items-center gap-2 bg-afghan-saffron hover:bg-afghan-gold text-afghan-charcoal font-semibold px-8 py-3.5 rounded-lg font-body transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Customizing
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </section>

      <PatternDivider />

      {/* How it works */}
      <section className="bg-afghan-cream py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-heading text-3xl text-afghan-charcoal mb-3">How It Works</h2>
            <p className="font-body text-afghan-charcoal/60 max-w-md mx-auto text-sm">
              Four simple steps — and your custom Afghan piece is on its way.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 gap-6" stagger={0.12}>
            {STEPS.map((step) => (
              <RevealItem
                key={step.number}
                className="bg-white rounded-xl p-6 shadow-sm border border-afghan-saffron/10 flex gap-4"
              >
                {/* Number + icon */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-afghan-terracotta/10 text-afghan-terracotta flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-afghan-terracotta font-body uppercase tracking-wider">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg text-afghan-charcoal mb-1">{step.title}</h3>
                  <p className="font-body text-sm text-afghan-charcoal/60 leading-relaxed">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Bottom CTA */}
          <Reveal className="text-center mt-12" delay={0.1}>
            <Link
              href="/custom-order/fabric"
              className="inline-flex items-center gap-2 bg-afghan-terracotta hover:bg-afghan-burgundy text-white font-semibold px-8 py-3.5 rounded-lg font-body transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Start Customizing
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-xs text-afghan-charcoal/40 mt-3 font-body">
              No payment required until your order is confirmed
            </p>
          </Reveal>
        </div>
      </section>

      <PatternDivider flipped />

      {/* Trust strip */}
      <section className="bg-white py-10 px-4 border-y border-afghan-saffron/10">
        <RevealGroup className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center" stagger={0.08}>
          {[
            { icon: '✦', label: 'Authentic Afghan craftsmanship' },
            { icon: '✈', label: 'Shipped across Europe' },
            { icon: '📏', label: 'Tailored to your measurements' },
            { icon: '💬', label: '24h response guarantee' },
          ].map((item) => (
            <RevealItem key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl text-afghan-saffron">{item.icon}</span>
              <p className="text-xs font-body text-afghan-charcoal/60 leading-snug">{item.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </main>
  )
}
