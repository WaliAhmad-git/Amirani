interface SectionHeaderProps {
  id?:        string   // for aria-labelledby targeting from a parent <section>
  eyebrow?:   string   // small uppercase label above title
  title:      string
  subtitle?:  string
  align?:     'left' | 'center'
  light?:     boolean  // for use on linen backgrounds
}

export default function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  align   = 'center',
  light   = false,
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign:    align,
        maxWidth:     align === 'center' ? '560px' : '100%',
        margin:       align === 'center' ? '0 auto' : '0',
      }}
    >
      {eyebrow && (
        <p
          style={{
            fontFamily:    'Inter, sans-serif',
            fontSize:      '0.75rem',
            fontWeight:    600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         '#A3705F',
            marginBottom:  '0.75rem',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        style={{
          fontFamily:  'Playfair Display, serif',
          fontWeight:  500,
          fontSize:    'clamp(1.6rem, 4vw, 2.25rem)',
          lineHeight:  1.2,
          color:       '#5C4A42',
          marginBottom: subtitle ? '0.75rem' : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color:      '#8C7B70',
            fontSize:   '1rem',
            lineHeight: 1.7,
            marginTop:  '0.5rem',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
