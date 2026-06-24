'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { useCartStore } from '@/lib/store/cartStore'

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/catalog',      label: 'Catalog' },
  { href: '/custom-order', label: 'Custom Order' },
  { href: '/about',        label: 'About' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const itemCount = useCartStore(s => s.itemCount())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position:        'sticky',
          top:             0,
          zIndex:          50,
          backgroundColor: scrolled ? 'rgba(253,250,247,0.96)' : '#FDFAF7',
          borderBottom:    `1px solid ${scrolled ? '#DDD3C8' : 'transparent'}`,
          backdropFilter:  scrolled ? 'blur(8px)' : 'none',
          transition:      'border-color 0.25s, background-color 0.25s',
        }}
      >
        <div
          className="container-site"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            height:         '64px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Amirani Store — home"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
          >
            <Image
              src="/images/logo.jpeg"
              alt="Amirani"
              width={36}
              height={36}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
              priority
            />
            <span
              style={{
                fontFamily:    'Playfair Display, serif',
                fontStyle:     'italic',
                fontSize:      '1.5rem',
                fontWeight:    500,
                color:         '#5C4A42',
                letterSpacing: '-0.01em',
              }}
            >
              Amirani
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation">
            <ul
              style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}
              className="hidden-mobile"
            >
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily:    'Inter, sans-serif',
                      fontSize:      '0.875rem',
                      fontWeight:    500,
                      color:         '#8C7B70',
                      letterSpacing: '0.03em',
                      transition:    'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#5C4A42')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8C7B70')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Cart icon with badge */}
            <Link
              href="/cart"
              aria-label={`View cart${itemCount > 0 ? ` — ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
              style={{
                position:   'relative',
                color:      '#8C7B70',
                display:    'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#5C4A42')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8C7B70')}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span
                  style={{
                    position:        'absolute',
                    top:             '-6px',
                    right:           '-6px',
                    minWidth:        '18px',
                    height:          '18px',
                    borderRadius:    '9999px',
                    backgroundColor: '#C9897A',
                    color:           '#fff',
                    fontSize:        '0.65rem',
                    fontWeight:      700,
                    fontFamily:      'Inter, sans-serif',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    padding:         '0 4px',
                    lineHeight:      1,
                  }}
                  aria-hidden="true"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(v => !v)}
              style={{
                background: 'none',
                border:     'none',
                cursor:     'pointer',
                padding:    '4px',
                color:      '#5C4A42',
                display:    'none',
              }}
              className="show-mobile"
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        links={navLinks}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <style>{`
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 768px) { .show-mobile   { display: none !important; } }
      `}</style>
    </>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}
