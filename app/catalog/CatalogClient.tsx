'use client'

import { useState, useMemo } from 'react'
import FilterSidebar from '@/components/catalog/FilterSidebar'
import ProductGrid   from '@/components/catalog/ProductGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal }    from '@/components/ui/Reveal'
import { products }  from '@/lib/data/products'
import type { CatalogFilters } from '@/lib/types'

const DEFAULT_FILTERS: CatalogFilters = {
  category: 'all',
  type:     'all',
  maxPrice: 300,
  inStock:  false,
}

export default function CatalogClient() {
  const [filters,      setFilters]      = useState<CatalogFilters>(DEFAULT_FILTERS)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  const patchFilter = (patch: Partial<CatalogFilters>) =>
    setFilters(f => ({ ...f, ...patch }))

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filters.category !== 'all' && p.category !== filters.category) return false
      if (filters.type     !== 'all' && p.type     !== filters.type)     return false
      if (p.price > filters.maxPrice)                                     return false
      if (filters.inStock  && !p.inStock)                                 return false
      return true
    })
  }, [filters])

  return (
    <div style={{ backgroundColor: '#FAF6F0', minHeight: '100dvh' }}>
      {/* Page header */}
      <div
        style={{
          backgroundColor: '#EFE8DC',
          padding:         'clamp(3rem, 6vw, 4.5rem) 0 clamp(2rem, 4vw, 3rem)',
          borderBottom:    '1px solid #DDD3C8',
        }}
      >
        <div className="container-site">
          <Reveal>
            <SectionHeader
              eyebrow="Afghan Fashion"
              title="Our Collection"
              subtitle={`${products.length} pieces — premade and ready to ship across Europe.`}
              align="left"
            />
          </Reveal>
        </div>
      </div>

      {/* Mobile filter bar */}
      <div
        style={{
          borderBottom:    '1px solid #EFE8DC',
          backgroundColor: '#FDFAF7',
          padding:         '0.875rem 0',
        }}
        className="show-mobile-bar"
      >
        <div
          className="container-site"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8C7B70' }}>
            {filtered.length} of {products.length} products
          </p>
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             '0.5rem',
              fontFamily:      'Inter, sans-serif',
              fontSize:        '0.85rem',
              fontWeight:      600,
              color:           '#5C4A42',
              backgroundColor: '#EFE8DC',
              border:          '1.5px solid #DDD3C8',
              borderRadius:    '8px',
              padding:         '0.5rem 1rem',
              cursor:          'pointer',
            }}
          >
            <FilterIcon />
            Filters
            {(filters.category !== 'all' || filters.type !== 'all' || filters.maxPrice !== 300 || filters.inStock) && (
              <span
                style={{
                  width:           '18px',
                  height:          '18px',
                  borderRadius:    '50%',
                  backgroundColor: '#C9897A',
                  color:           '#FDFAF7',
                  fontSize:        '0.7rem',
                  fontWeight:      700,
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                }}
              >
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="container-site" style={{ padding: 'clamp(2rem, 4vw, 3rem) 1.25rem clamp(4rem, 8vw, 6rem)' }}>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '260px 1fr',
            gap:                 '2rem',
            alignItems:          'flex-start',
          }}
          className="catalog-layout"
        >
          {/* Desktop sidebar */}
          <div className="hide-mobile-sidebar">
            <FilterSidebar
              filters={filters}
              onChange={patchFilter}
              total={products.length}
              filtered={filtered.length}
            />
          </div>

          {/* Product grid */}
          <ProductGrid products={filtered} total={products.length} />
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position:        'fixed',
              inset:           0,
              zIndex:          40,
              backgroundColor: 'rgba(92,74,66,0.35)',
              backdropFilter:  'blur(2px)',
            }}
          />
          {/* Sheet */}
          <div
            style={{
              position:        'fixed',
              bottom:          0,
              left:            0,
              right:           0,
              zIndex:          50,
              backgroundColor: '#FDFAF7',
              borderRadius:    '20px 20px 0 0',
              boxShadow:       '0 -8px 40px rgba(92,74,66,0.15)',
              padding:         '1.5rem',
              maxHeight:       '90dvh',
              overflowY:       'auto',
            }}
          >
            {/* Drag handle */}
            <div style={{ width: '36px', height: '4px', borderRadius: '99px', backgroundColor: '#DDD3C8', margin: '0 auto 1.5rem' }} />
            <FilterSidebar
              filters={filters}
              onChange={patchFilter}
              total={products.length}
              filtered={filtered.length}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 767px) {
          .catalog-layout        { grid-template-columns: 1fr !important; }
          .hide-mobile-sidebar   { display: none !important; }
        }
        @media (min-width: 768px) {
          .show-mobile-bar       { display: none !important; }
        }
      `}</style>
    </div>
  )
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6"  x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}
