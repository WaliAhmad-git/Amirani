'use client'

import type { CatalogFilters } from '@/lib/types'

const CATEGORIES = [
  { value: 'all',    label: 'All' },
  { value: 'womens', label: "Women's" },
  { value: 'mens',   label: "Men's" },
  { value: 'kids',   label: "Kids'" },
] as const

const TYPES = [
  { value: 'all',     label: 'All Types' },
  { value: 'kameez',  label: 'Kameez' },
  { value: 'perahan', label: 'Perahan' },
  { value: 'dress',   label: 'Dress' },
  { value: 'vest',    label: 'Vest' },
  { value: 'set',     label: 'Set / Coord' },
] as const

const MAX_PRICE = 300

interface FilterSidebarProps {
  filters:   CatalogFilters
  onChange:  (patch: Partial<CatalogFilters>) => void
  total:     number
  filtered:  number
  onClose?:  () => void   // for mobile sheet usage
}

export default function FilterSidebar({ filters, onChange, total, filtered, onClose }: FilterSidebarProps) {
  const handleReset = () => {
    onChange({ category: 'all', type: 'all', maxPrice: MAX_PRICE, inStock: false })
  }

  const hasActive =
    filters.category !== 'all' ||
    filters.type      !== 'all' ||
    filters.maxPrice  !== MAX_PRICE ||
    filters.inStock

  return (
    <aside
      aria-label="Product filters"
      style={{
        backgroundColor: '#FDFAF7',
        border:          '1px solid #EFE8DC',
        borderRadius:    '12px',
        padding:         '1.5rem',
        boxShadow:       '0 2px 12px rgba(92,74,66,0.06)',
        position:        'sticky',
        top:             '80px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   '1.5rem',
          paddingBottom:  '1rem',
          borderBottom:   '1px solid #EFE8DC',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 500,
              fontSize:   '1.1rem',
              color:      '#5C4A42',
              margin:     0,
            }}
          >
            Filters
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#A3705F', marginTop: '2px' }}>
            {filtered} of {total} products
          </p>
        </div>
        {hasActive && (
          <button
            onClick={handleReset}
            style={{
              fontFamily:    'Inter, sans-serif',
              fontSize:      '0.78rem',
              fontWeight:    600,
              color:         '#C9897A',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              letterSpacing: '0.02em',
              padding:       '2px 0',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterGroup label="Category">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CATEGORIES.map(cat => (
            <FilterChip
              key={cat.value}
              label={cat.label}
              active={filters.category === cat.value}
              onClick={() => onChange({ category: cat.value as CatalogFilters['category'] })}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Type */}
      <FilterGroup label="Garment Type">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {TYPES.map(t => (
            <FilterChip
              key={t.value}
              label={t.label}
              active={filters.type === t.value}
              onClick={() => onChange({ type: t.value as CatalogFilters['type'] })}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Price range */}
      <FilterGroup label={`Max Price — €${filters.maxPrice}`}>
        <input
          type="range"
          min={30}
          max={MAX_PRICE}
          step={5}
          value={filters.maxPrice}
          onChange={e => onChange({ maxPrice: Number(e.target.value) })}
          aria-label="Maximum price"
          style={{
            width:      '100%',
            accentColor:'#C9897A',
            cursor:     'pointer',
          }}
        />
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            fontFamily:     'Inter, sans-serif',
            fontSize:       '0.75rem',
            color:          '#A3705F',
            marginTop:      '4px',
          }}
        >
          <span>€30</span>
          <span>€{MAX_PRICE}</span>
        </div>
      </FilterGroup>

      {/* In stock toggle */}
      <FilterGroup label="Availability" last>
        <label
          style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '0.625rem',
            cursor:      'pointer',
            userSelect:  'none',
          }}
        >
          <div
            role="checkbox"
            aria-checked={filters.inStock}
            tabIndex={0}
            onClick={() => onChange({ inStock: !filters.inStock })}
            onKeyDown={e => e.key === ' ' && onChange({ inStock: !filters.inStock })}
            style={{
              width:           '18px',
              height:          '18px',
              borderRadius:    '4px',
              border:          `1.5px solid ${filters.inStock ? '#C9897A' : '#DDD3C8'}`,
              backgroundColor: filters.inStock ? '#C9897A' : 'transparent',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              transition:      'background-color 0.15s, border-color 0.15s',
              flexShrink:      0,
            }}
          >
            {filters.inStock && (
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="#FDFAF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize:   '0.875rem',
              color:      '#5C4A42',
            }}
          >
            In stock only
          </span>
        </label>
      </FilterGroup>

      {/* Mobile close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            marginTop:       '1.25rem',
            width:           '100%',
            padding:         '0.75rem',
            backgroundColor: '#C9897A',
            color:           '#FDFAF7',
            border:          'none',
            borderRadius:    '8px',
            fontFamily:      'Inter, sans-serif',
            fontWeight:      600,
            fontSize:        '0.9rem',
            cursor:          'pointer',
            letterSpacing:   '0.04em',
          }}
        >
          Show Results
        </button>
      )}
    </aside>
  )
}

// ── Sub-components ──────────────────────────────────────────────────
function FilterGroup({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : '1.5rem', paddingBottom: last ? 0 : '1.5rem', borderBottom: last ? 'none' : '1px solid #EFE8DC' }}>
      <p
        style={{
          fontFamily:    'Inter, sans-serif',
          fontSize:      '0.73rem',
          fontWeight:    700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         '#A3705F',
          marginBottom:  '0.875rem',
        }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:         'flex',
        alignItems:      'center',
        gap:             '0.5rem',
        width:           '100%',
        textAlign:       'left',
        background:      'none',
        border:          'none',
        cursor:          'pointer',
        padding:         '0.35rem 0',
      }}
    >
      <div
        style={{
          width:           '16px',
          height:          '16px',
          borderRadius:    '50%',
          border:          `1.5px solid ${active ? '#C9897A' : '#DDD3C8'}`,
          backgroundColor: active ? '#C9897A' : 'transparent',
          flexShrink:      0,
          transition:      'background-color 0.15s, border-color 0.15s',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FDFAF7' }} />}
      </div>
      <span
        style={{
          fontFamily:  'Inter, sans-serif',
          fontSize:    '0.875rem',
          color:       active ? '#5C4A42' : '#8C7B70',
          fontWeight:  active ? 600 : 400,
          transition:  'color 0.15s, font-weight 0.15s',
        }}
      >
        {label}
      </span>
    </button>
  )
}
