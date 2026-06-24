import { ReactNode, CSSProperties } from 'react'

type BadgeVariant = 'default' | 'accent' | 'sage' | 'blush'

const variantStyles: Record<BadgeVariant, CSSProperties> = {
  default: { backgroundColor: '#EFE8DC', color: '#8C7B70', border: '1px solid #DDD3C8' },
  accent:  { backgroundColor: '#FAF6F0', color: '#C9897A', border: '1px solid #E8C9B8' },
  sage:    { backgroundColor: '#F0F3EF', color: '#7A917A', border: '1px solid #C8D3C4' },
  blush:   { backgroundColor: '#FDF5F2', color: '#A3705F', border: '1px solid #E8C9B8' },
}

const baseStyle: CSSProperties = {
  display:       'inline-flex',
  alignItems:    'center',
  fontFamily:    'Inter, sans-serif',
  fontSize:      '0.7rem',
  fontWeight:    600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding:       '0.25rem 0.625rem',
  borderRadius:  '99px',
  whiteSpace:    'nowrap',
}

interface BadgeProps {
  children:  ReactNode
  variant?:  BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={className} style={{ ...baseStyle, ...variantStyles[variant] }}>
      {children}
    </span>
  )
}
