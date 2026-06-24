/**
 * PatternDivider
 * Afghan geometric/ikat-inspired SVG divider.
 * Uses the soft palette — blush, sage, dusty-rose — no harsh colors.
 */

interface PatternDividerProps {
  flipped?:   boolean   // flip for bottom-of-section use
  className?: string
}

export default function PatternDivider({ flipped = false, className }: PatternDividerProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width:     '100%',
        overflow:  'hidden',
        lineHeight: 0,
        transform: flipped ? 'scaleY(-1)' : 'none',
      }}
    >
      {/* Horizontal ruled line with central Afghan motif */}
      <svg
        viewBox="0 0 1200 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', width: '100%' }}
      >
        {/* Left rule */}
        <line x1="0" y1="24" x2="480" y2="24" stroke="#DDD3C8" strokeWidth="1" />
        {/* Right rule */}
        <line x1="720" y1="24" x2="1200" y2="24" stroke="#DDD3C8" strokeWidth="1" />

        {/* Central Afghan diamond motif — soft blush/sage palette */}
        <g transform="translate(600, 24)">
          {/* Outer diamond */}
          <polygon
            points="0,-18 18,0 0,18 -18,0"
            fill="none"
            stroke="#DDD3C8"
            strokeWidth="1"
          />
          {/* Inner diamond */}
          <polygon
            points="0,-10 10,0 0,10 -10,0"
            fill="#E8C9B8"
            stroke="#C9897A"
            strokeWidth="0.8"
            opacity="0.6"
          />
          {/* Center dot */}
          <circle cx="0" cy="0" r="3" fill="#C9897A" opacity="0.7" />

          {/* Small flanking diamond – left */}
          <g transform="translate(-52, 0)">
            <polygon points="0,-6 6,0 0,6 -6,0" fill="#A8B5A0" opacity="0.5" />
          </g>
          {/* Small flanking diamond – right */}
          <g transform="translate(52, 0)">
            <polygon points="0,-6 6,0 0,6 -6,0" fill="#A8B5A0" opacity="0.5" />
          </g>

          {/* Tiny dots framing the outer diamond */}
          <circle cx="-28"  cy="0"  r="1.5" fill="#DDD3C8" />
          <circle cx="28"   cy="0"  r="1.5" fill="#DDD3C8" />
          <circle cx="0"    cy="-28" r="1.5" fill="#DDD3C8" />
          <circle cx="0"    cy="28"  r="1.5" fill="#DDD3C8" />
        </g>
      </svg>
    </div>
  )
}

/**
 * FullWidthPatternBand
 * A repeating Afghan tile band for use as a section background stripe.
 * Subtle — meant to sit between page sections.
 */
export function FullWidthPatternBand() {
  return (
    <div
      aria-hidden="true"
      style={{
        width:           '100%',
        height:          '32px',
        overflow:        'hidden',
        backgroundColor: '#EFE8DC',
        position:        'relative',
      }}
    >
      <svg
        viewBox="0 0 120 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        preserveAspectRatio="xMinYMid repeat"
      >
        <defs>
          <pattern id="afghan-tile" x="0" y="0" width="40" height="32" patternUnits="userSpaceOnUse">
            {/* Single tile: small diamond + flanking dots */}
            <polygon
              points="20,4 28,16 20,28 12,16"
              fill="none"
              stroke="#DDD3C8"
              strokeWidth="0.8"
            />
            <polygon
              points="20,10 24,16 20,22 16,16"
              fill="#E8C9B8"
              opacity="0.4"
              stroke="none"
            />
            <circle cx="20" cy="16" r="2" fill="#C9897A" opacity="0.35" />
            <circle cx="0"  cy="16" r="1.5" fill="#A8B5A0" opacity="0.4" />
            <circle cx="40" cy="16" r="1.5" fill="#A8B5A0" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#afghan-tile)" />
      </svg>
    </div>
  )
}
