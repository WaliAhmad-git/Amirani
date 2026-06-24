'use client'

import Link from 'next/link'
import Image from 'next/image'

const shopLinks = [
  { href: '/catalog',      label: 'Browse Collection' },
  { href: '/custom-order', label: 'Custom Orders' },
  { href: '/cart',         label: 'Cart' },
]

const companyLinks = [
  { href: '/about',   label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#EFE8DC',
        borderTop:       '1px solid #DDD3C8',
        marginTop:       'auto',
      }}
    >
      {/* Main footer grid */}
      <div
        className="container-site"
        style={{
          padding:    '4rem 1.25rem 3rem',
          display:    'grid',
          gap:        '3rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}
      >
        {/* Brand column */}
        <div style={{ gridColumn: 'span 1' }}>
          <Link
            href="/"
            aria-label="Amirani Store — home"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}
          >
            <Image
              src="/images/logo.jpeg"
              alt="Amirani"
              width={40}
              height={40}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
            />
            <span
              style={{
                fontFamily:    'Playfair Display, serif',
                fontStyle:     'italic',
                fontSize:      '1.75rem',
                fontWeight:    500,
                color:         '#5C4A42',
              }}
            >
              Amirani
            </span>
          </Link>
          <p
            style={{
              color:      '#8C7B70',
              fontSize:   '0.875rem',
              lineHeight: '1.7',
              maxWidth:   '240px',
            }}
          >
            Afghan fashion made for the diaspora — premade pieces and fully custom orders, shipped across Europe.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <SocialLink href="https://tiktok.com" label="TikTok">
              <TikTokIcon />
            </SocialLink>
            <SocialLink href="https://instagram.com" label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://facebook.com" label="Facebook">
              <FacebookIcon />
            </SocialLink>
          </div>
        </div>

        {/* Shop links */}
        <FooterLinkGroup title="Shop" links={shopLinks} />

        {/* Company links */}
        <FooterLinkGroup title="Company" links={companyLinks} />

        {/* Contact column */}
        <div>
          <h4
            style={{
              fontFamily:    'Inter, sans-serif',
              fontSize:      '0.75rem',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#A3705F',
              marginBottom:  '1.25rem',
            }}
          >
            Get in Touch
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="mailto:hello@amiranistore.com"
              style={{ color: '#8C7B70', fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#5C4A42')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8C7B70')}
            >
              hello@amiranistore.com
            </a>
            <a
              href="https://wa.me/32000000000"
              style={{ color: '#8C7B70', fontSize: '0.875rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#5C4A42')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8C7B70')}
            >
              <WhatsAppIcon />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-site"
        style={{
          borderTop:      '1px solid #DDD3C8',
          padding:        '1.25rem 1.25rem',
          display:        'flex',
          flexWrap:       'wrap',
          gap:            '0.5rem',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}
      >
        <p style={{ color: '#A3705F', fontSize: '0.8rem' }}>
          © {year} Amirani Store. All rights reserved.
        </p>
        <p style={{ color: '#A3705F', fontSize: '0.8rem' }}>
          Made with care for the Afghan diaspora.
        </p>
      </div>
    </footer>
  )
}

function FooterLinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4
        style={{
          fontFamily:    'Inter, sans-serif',
          fontSize:      '0.75rem',
          fontWeight:    600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         '#A3705F',
          marginBottom:  '1.25rem',
        }}
      >
        {title}
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{ color: '#8C7B70', fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#5C4A42')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8C7B70')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '36px',
        height:          '36px',
        borderRadius:    '50%',
        backgroundColor: '#FDFAF7',
        color:           '#8C7B70',
        border:          '1px solid #DDD3C8',
        transition:      'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = '#C9897A'
        el.style.borderColor = '#C9897A'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = '#8C7B70'
        el.style.borderColor = '#DDD3C8'
      }}
    >
      {children}
    </a>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.67a8.16 8.16 0 0 0 4.77 1.52V7.74a4.85 4.85 0 0 1-1-.05z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}
