'use client'

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, CSSProperties } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

const styles: Record<Variant, { base: CSSProperties; hover: CSSProperties }> = {
  primary: {
    base:  { backgroundColor: '#C9897A', color: '#FDFAF7', border: '1.5px solid #C9897A' },
    hover: { backgroundColor: '#A3705F', borderColor: '#A3705F' },
  },
  secondary: {
    base:  { backgroundColor: '#EFE8DC', color: '#5C4A42', border: '1.5px solid #DDD3C8' },
    hover: { backgroundColor: '#DDD3C8' },
  },
  outline: {
    base:  { backgroundColor: 'transparent', color: '#C9897A', border: '1.5px solid #C9897A' },
    hover: { backgroundColor: '#FAF6F0' },
  },
  ghost: {
    base:  { backgroundColor: 'transparent', color: '#8C7B70', border: '1.5px solid transparent' },
    hover: { backgroundColor: '#EFE8DC', color: '#5C4A42' },
  },
}

const sizes: Record<Size, CSSProperties> = {
  sm: { fontSize: '0.8125rem', padding: '0.5rem 1rem' },
  md: { fontSize: '0.875rem', padding: '0.75rem 1.5rem' },
  lg: { fontSize: '1rem', padding: '0.9rem 2rem' },
}

const baseStyle: CSSProperties = {
  display:       'inline-flex',
  alignItems:    'center',
  justifyContent:'center',
  gap:           '0.5rem',
  fontFamily:    'Inter, sans-serif',
  fontWeight:    600,
  letterSpacing: '0.04em',
  borderRadius:  '8px',
  cursor:        'pointer',
  transition:    'background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.15s',
  textDecoration:'none',
  whiteSpace:    'nowrap',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?:    Size
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size    = 'md',
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const v = styles[variant]
  const s = sizes[size]
  const cleanStyle = Object.fromEntries(
    Object.entries((style as Record<string, unknown>) ?? {}).filter(([, val]) => val !== undefined)
  )
  const combined: CSSProperties = { ...baseStyle, ...s, ...v.base, ...cleanStyle }

  return (
    <button
      style={combined}
      onMouseEnter={e => {
        Object.assign(e.currentTarget.style, { ...v.hover, transform: 'translateY(-1px)' } as CSSProperties)
        onMouseEnter?.(e)
      }}
      onMouseLeave={e => {
        Object.assign(e.currentTarget.style, { ...v.base, transform: 'none' } as CSSProperties)
        onMouseLeave?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href:     string
  variant?: Variant
  size?:    Size
  children: ReactNode
}

export function LinkButton({
  href,
  variant  = 'primary',
  size     = 'md',
  children,
  ...props
}: LinkButtonProps) {
  const v = styles[variant]
  const s = sizes[size]
  const combined: CSSProperties = { ...baseStyle, ...s, ...v.base }

  return (
    <Link
      href={href}
      style={combined}
      onMouseEnter={e => {
        Object.assign(e.currentTarget.style, { ...v.hover, transform: 'translateY(-1px)' } as CSSProperties)
      }}
      onMouseLeave={e => {
        Object.assign(e.currentTarget.style, { ...v.base, transform: 'none' } as CSSProperties)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default Button
