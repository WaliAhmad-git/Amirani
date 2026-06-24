'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCustomOrderStore } from '@/lib/store/customOrderStore'
import type { CustomOrderMeasurements } from '@/lib/types'

// ── Measurement field definitions ──────────────────────────────────────────

type MeasurementKey = 'chest' | 'waist' | 'hips' | 'length' | 'shoulder' | 'sleeve'
type OptionalKey    = 'height' | 'weight'

interface FieldDef {
  key:     MeasurementKey
  label:   string
  badge:   string         // ①②③ etc.
  tipCm:   string
  tipIn:   string
}

const FIELDS: FieldDef[] = [
  {
    key:   'chest',
    label: 'Chest / Bust',
    badge: '①',
    tipCm: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground. Add 2–3 cm ease for comfort.',
    tipIn: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground. Add 1 inch ease for comfort.',
  },
  {
    key:   'waist',
    label: 'Waist',
    badge: '②',
    tipCm: 'Measure around your natural waist — the narrowest part of your torso, usually 2–3 cm above the navel.',
    tipIn: 'Measure around your natural waist — the narrowest part of your torso, usually 1 inch above the navel.',
  },
  {
    key:   'hips',
    label: 'Hips',
    badge: '③',
    tipCm: 'Measure around the fullest part of your hips and seat, approximately 18–20 cm below the natural waist.',
    tipIn: 'Measure around the fullest part of your hips and seat, approximately 7–8 inches below the natural waist.',
  },
  {
    key:   'length',
    label: 'Total Length',
    badge: '④',
    tipCm: 'Measure from the top of your shoulder (at the neck) straight down to where you want the garment to end.',
    tipIn: 'Measure from the top of your shoulder (at the neck) straight down to where you want the garment to end.',
  },
  {
    key:   'shoulder',
    label: 'Shoulder Width',
    badge: '⑤',
    tipCm: 'Measure across the back from the tip of one shoulder to the tip of the other. Ask someone to help for accuracy.',
    tipIn: 'Measure across the back from the tip of one shoulder to the tip of the other. Ask someone to help for accuracy.',
  },
  {
    key:   'sleeve',
    label: 'Sleeve Length',
    badge: '⑥',
    tipCm: 'With your arm slightly bent, measure from the shoulder point down to your wrist bone (or desired sleeve end).',
    tipIn: 'With your arm slightly bent, measure from the shoulder point down to your wrist bone (or desired sleeve end).',
  },
]

// ── Tooltip component ──────────────────────────────────────────────────────

interface TooltipProps {
  text: string
  id:   string
}

function Tooltip({ text, id }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        aria-label="How to measure"
        aria-describedby={id}
        onClick={() => setOpen(o => !o)}
        className="
          w-5 h-5 rounded-full border border-afghan-saffron/60
          text-afghan-saffron text-xs font-semibold flex items-center justify-center
          hover:bg-afghan-saffron/10 transition-colors focus:outline-none
          focus-visible:ring-2 focus-visible:ring-afghan-saffron
        "
      >
        ?
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="
              absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2
              w-64 bg-white border border-afghan-saffron/30 rounded-lg shadow-lg
              px-3 py-2.5 text-xs text-afghan-charcoal/80 leading-relaxed
            "
          >
            {text}
            {/* arrow */}
            <span className="
              absolute top-full left-1/2 -translate-x-1/2
              border-4 border-transparent border-t-afghan-saffron/30
            "/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Unit toggle ────────────────────────────────────────────────────────────

interface UnitToggleProps {
  unit:     'cm' | 'inches'
  onChange: (u: 'cm' | 'inches') => void
}

function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      className="
        inline-flex rounded-lg border border-afghan-saffron/40 overflow-hidden
        bg-white shadow-sm
      "
      role="group"
      aria-label="Unit of measurement"
    >
      {(['cm', 'inches'] as const).map(u => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          aria-pressed={unit === u}
          className={`
            px-5 py-2 text-sm font-medium font-body transition-colors duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-afghan-terracotta
            ${unit === u
              ? 'bg-afghan-terracotta text-white'
              : 'text-afghan-charcoal/70 hover:bg-afghan-cream'
            }
          `}
        >
          {u === 'cm' ? 'cm' : 'inches'}
        </button>
      ))}
    </div>
  )
}

// ── Main form ──────────────────────────────────────────────────────────────

export default function MeasurementForm() {
  const router = useRouter()
  const { measurements, setMeasurements, design, fabric } = useCustomOrderStore()

  // Local state mirrors store
  const [unit,    setUnit]    = useState<'cm' | 'inches'>(measurements.unit)
  const [fields,  setFields]  = useState<Record<MeasurementKey, number | ''>>({
    chest:    measurements.chest,
    waist:    measurements.waist,
    hips:     measurements.hips,
    length:   measurements.length,
    shoulder: measurements.shoulder,
    sleeve:   measurements.sleeve,
  })
  const [optional, setOptional] = useState<Record<OptionalKey, number | ''>>({
    height: measurements.height ?? '',
    weight: measurements.weight ?? '',
  })
  const [touched,       setTouched]       = useState(false)
  const [guideExpanded, setGuideExpanded] = useState(false)

  // Sync to store on change
  useEffect(() => {
    setMeasurements({
      ...fields,
      unit,
      height: optional.height,
      weight: optional.weight,
    })
  }, [fields, unit, optional])

  // Validate: all 6 required fields must be > 0
  const errors: Partial<Record<MeasurementKey, string>> = {}
  if (touched) {
    FIELDS.forEach(({ key }) => {
      const v = fields[key]
      if (v === '' || v === undefined) {
        errors[key] = 'Required'
      } else if (Number(v) <= 0) {
        errors[key] = 'Must be greater than 0'
      }
    })
  }
  const isValid = FIELDS.every(({ key }) => {
    const v = fields[key]
    return v !== '' && v !== undefined && Number(v) > 0
  })

  const handleFieldChange = (key: MeasurementKey, raw: string) => {
    // Allow empty string or valid positive number
    if (raw === '') {
      setFields(f => ({ ...f, [key]: '' }))
      return
    }
    const n = parseFloat(raw)
    if (!isNaN(n)) setFields(f => ({ ...f, [key]: n }))
  }

  const handleOptionalChange = (key: OptionalKey, raw: string) => {
    if (raw === '') { setOptional(o => ({ ...o, [key]: '' })); return }
    const n = parseFloat(raw)
    if (!isNaN(n)) setOptional(o => ({ ...o, [key]: n }))
  }

  const handleNext = () => {
    setTouched(true)
    if (!isValid) return
    router.push('/custom-order/review')
  }

  const handleBack = () => router.push('/custom-order/design')

  // Placeholder hints per unit
  const ph = (key: MeasurementKey) => {
    const defaults: Record<MeasurementKey, { cm: string; inches: string }> = {
      chest:    { cm: 'e.g. 92',  inches: 'e.g. 36' },
      waist:    { cm: 'e.g. 76',  inches: 'e.g. 30' },
      hips:     { cm: 'e.g. 98',  inches: 'e.g. 38' },
      length:   { cm: 'e.g. 110', inches: 'e.g. 43' },
      shoulder: { cm: 'e.g. 42',  inches: 'e.g. 16' },
      sleeve:   { cm: 'e.g. 60',  inches: 'e.g. 24' },
    }
    return defaults[key][unit]
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* ── Header ── */}
      <div className="mb-8 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl text-afghan-charcoal mb-2">
          Your Measurements
        </h1>
        <p className="text-afghan-charcoal/60 text-sm font-body">
          We tailor every garment to your exact measurements. Fill in all fields for the best fit.
        </p>
      </div>

      {/* ── Recap strip (fabric + garment) ── */}
      {(fabric || design.garmentType) && (
        <div className="mb-6 flex items-center gap-3 bg-white border border-afghan-saffron/20 rounded-xl px-4 py-3">
          {fabric && (
            <span
              className="w-8 h-8 rounded-full border border-afghan-charcoal/10 flex-shrink-0"
              style={{ background: fabric.swatchColor }}
              aria-label={fabric.name}
            />
          )}
          <p className="text-sm text-afghan-charcoal/70 font-body">
            {[
              fabric?.name,
              design.garmentType
                ? design.garmentType.charAt(0).toUpperCase() + design.garmentType.slice(1)
                : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
      )}

      {/* ── Unit Toggle ── */}
      <div className="mb-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <span className="text-sm font-medium text-afghan-charcoal font-body">
          Unit of measurement
        </span>
        <UnitToggle unit={unit} onChange={u => setUnit(u)} />
      </div>

      {/* ── Measurement Guide (collapsible) ── */}
      <div className="mb-8 border border-afghan-saffron/30 rounded-xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setGuideExpanded(e => !e)}
          className="
            w-full flex items-center justify-between px-4 py-3
            text-sm font-medium text-afghan-charcoal font-body
            hover:bg-afghan-cream/50 transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-afghan-terracotta
          "
          aria-expanded={guideExpanded}
        >
          <span className="flex items-center gap-2">
            {/* ruler icon */}
            <svg className="w-4 h-4 text-afghan-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 6h18M3 12h18M3 18h18M9 3v3m6-3v3M9 18v3m6-3v3" />
            </svg>
            How to measure — illustrated guide
          </span>
          <motion.svg
            className="w-4 h-4 text-afghan-charcoal/40"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            animate={{ rotate: guideExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </motion.svg>
        </button>

        <AnimatePresence initial={false}>
          {guideExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src="/images/measurment-guide.png"
                    alt="Body measurement diagram showing chest, waist, hips, length, shoulder, and sleeve measurement points"
                    width={320}
                    height={436}
                    className="rounded-lg border border-afghan-saffron/20"
                    priority
                  />
                </div>
                <div className="text-xs text-afghan-charcoal/70 font-body space-y-2 pt-1">
                  {FIELDS.map(f => (
                    <p key={f.key}>
                      <span className="font-semibold text-afghan-terracotta">{f.badge} {f.label}:</span>{' '}
                      {unit === 'cm' ? f.tipCm : f.tipIn}
                    </p>
                  ))}
                  <p className="text-afghan-charcoal/50 pt-2">
                    Tip: Use a soft measuring tape. Measure over light clothing for best accuracy.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Measurement Fields ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {FIELDS.map((field) => {
          const err = errors[field.key]
          const val = fields[field.key]

          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: FIELDS.indexOf(field) * 0.04 }}
            >
              <label
                htmlFor={`field-${field.key}`}
                className="block text-sm font-medium text-afghan-charcoal mb-1.5 font-body"
              >
                <span className="text-afghan-terracotta mr-1">{field.badge}</span>
                {field.label}
                <span className="text-red-500 ml-0.5">*</span>
              </label>

              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id={`field-${field.key}`}
                    type="number"
                    inputMode="decimal"
                    min="1"
                    step="0.5"
                    placeholder={ph(field.key)}
                    value={val === '' ? '' : val}
                    onChange={e => handleFieldChange(field.key, e.target.value)}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${field.key}-err` : undefined}
                    className={`
                      w-full rounded-xl border px-4 py-2.5 pr-14
                      text-afghan-charcoal font-body text-sm
                      placeholder:text-afghan-charcoal/30
                      focus:outline-none focus:ring-2 focus:ring-afghan-terracotta/50
                      transition-colors
                      [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
                      ${err
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-afghan-saffron/30 bg-white hover:border-afghan-saffron/60'
                      }
                    `}
                  />
                  {/* unit badge inside input */}
                  <span className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-xs text-afghan-charcoal/40 font-body pointer-events-none
                  ">
                    {unit}
                  </span>
                </div>

                <Tooltip
                  text={unit === 'cm' ? field.tipCm : field.tipIn}
                  id={`tip-${field.key}`}
                />
              </div>

              <AnimatePresence>
                {err && (
                  <motion.p
                    id={`${field.key}-err`}
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1,  y: 0  }}
                    exit={{   opacity: 0,  y: -4  }}
                    className="mt-1 text-xs text-red-500 font-body"
                  >
                    {err}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* ── Optional fields ── */}
      <div className="mb-8 border border-afghan-saffron/20 rounded-xl bg-white px-4 py-4">
        <p className="text-xs text-afghan-charcoal/50 font-body mb-4 font-medium uppercase tracking-wide">
          Optional — for reference only
        </p>
        <div className="grid grid-cols-2 gap-4">
          {([
            { key: 'height' as OptionalKey, label: 'Height', placeholderCm: 'e.g. 168', placeholderIn: 'e.g. 66' },
            { key: 'weight' as OptionalKey, label: 'Weight', placeholderCm: 'e.g. 62 kg', placeholderIn: 'e.g. 136 lb' },
          ]).map(({ key, label, placeholderCm, placeholderIn }) => (
            <div key={key}>
              <label htmlFor={`opt-${key}`} className="block text-sm font-medium text-afghan-charcoal/70 mb-1.5 font-body">
                {label}
              </label>
              <input
                id={`opt-${key}`}
                type="number"
                inputMode="decimal"
                min="1"
                step="0.5"
                placeholder={unit === 'cm' ? placeholderCm : placeholderIn}
                value={optional[key] === '' ? '' : optional[key]}
                onChange={e => handleOptionalChange(key, e.target.value)}
                className="
                  w-full rounded-xl border border-afghan-saffron/20 bg-afghan-cream/30
                  px-3 py-2.5 text-sm text-afghan-charcoal font-body
                  placeholder:text-afghan-charcoal/25
                  focus:outline-none focus:ring-2 focus:ring-afghan-terracotta/40
                  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Validation summary ── */}
      <AnimatePresence>
        {touched && !isValid && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{   opacity: 0,  y: -6  }}
            className="mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-body"
          >
            Please fill in all required measurements before continuing.
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="
            flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-afghan-saffron/40
            text-afghan-charcoal font-body font-medium text-sm
            hover:bg-afghan-cream transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-afghan-saffron
          "
        >
          ← Back
        </button>

        <motion.button
          type="button"
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className={`
            flex-1 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-afghan-terracotta
            ${isValid
              ? 'bg-afghan-terracotta text-white hover:bg-afghan-terracotta/90 shadow-md hover:shadow-lg'
              : 'bg-afghan-charcoal/10 text-afghan-charcoal/40 cursor-not-allowed'
            }
          `}
          aria-disabled={!isValid}
        >
          Next: Review Order →
        </motion.button>
      </div>
    </div>
  )
}
