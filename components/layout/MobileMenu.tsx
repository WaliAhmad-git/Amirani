'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavLink {
  href:  string
  label: string
}

interface MobileMenuProps {
  links:   NavLink[]
  isOpen:  boolean
  onClose: () => void
}

export default function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position:         'fixed',
          inset:            0,
          zIndex:           40,
          backgroundColor:  'rgba(92, 74, 66, 0.25)',
          backdropFilter:   'blur(2px)',
          opacity:          isOpen ? 1 : 0,
          pointerEvents:    isOpen ? 'auto' : 'none',
          transition:       'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        style={{
          position:        'fixed',
          top:             0,
          right:           0,
          zIndex:          50,
          width:           'min(320px, 85vw)',
          height:          '100dvh',
          backgroundColor: '#FDFAF7',
          boxShadow:       '-8px 0 32px rgba(92, 74, 66, 0.12)',
          transform:       isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition:      'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display:         'flex',
          flexDirection:   'column',
          padding:         '0',
          overflowY:       'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '1.25rem 1.5rem',
            borderBottom:   '1px solid #DDD3C8',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image
              src="/images/logo.jpeg"
              alt="Amirani"
              width={28}
              height={28}
              style={{ borderRadius: '6px', objectFit: 'cover' }}
            />
            <span
              style={{
                fontFamily:    'Playfair Display, serif',
                fontStyle:     'italic',
                fontSize:      '1.25rem',
                fontWeight:    500,
                color:         '#5C4A42',
              }}
            >
              Amirani
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              color:      '#8C7B70',
              padding:    '4px',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul
          style={{
            listStyle: 'none',
            padding:   '1rem 0',
            flexGrow:  1,
          }}
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                style={{
                  display:       'block',
                  padding:       '1rem 1.5rem',
                  fontFamily:    'Inter, sans-serif',
                  fontSize:      '1rem',
                  fontWeight:    500,
                  color:         '#5C4A42',
                  letterSpacing: '0.01em',
                  borderBottom:  '1px solid #EFE8DC',
                  transition:    'background-color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAF6F0')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA at bottom */}
        <div style={{ padding: '1.5rem' }}>
          <Link
            href="/custom-order"
            onClick={onClose}
            style={{
              display:         'block',
              textAlign:       'center',
              padding:         '0.875rem 1.5rem',
              backgroundColor: '#C9897A',
              color:           '#FDFAF7',
              fontFamily:      'Inter, sans-serif',
              fontSize:        '0.9rem',
              fontWeight:      600,
              letterSpacing:   '0.04em',
              borderRadius:    '8px',
              transition:      'background-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#A3705F')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9897A')}
          >
            Start Custom Order
          </Link>
        </div>
      </nav>
    </>
  )
}
