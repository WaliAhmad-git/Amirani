'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomOrderStore } from '@/lib/store/customOrderStore'
import { formatPrice, formatModifier, calcCustomTotal } from '@/lib/utils/formatPrice'

const EU_COUNTRIES = [
  'Belgium',
  'Netherlands',
  'Germany',
  'France',
  'Austria',
  'Sweden',
  'Denmark',
  'Norway',
  'Switzerland',
  'Luxembourg',
  'United Kingdom',
  'Italy',
  'Spain',
  'Portugal',
  'Finland',
  'Poland',
  'Czech Republic',
  'Other',
]

const GARMENT_LABELS: Record<string, string> = {
  kameez: 'Kameez',
  perahan: 'Perahan',
  dress: 'Dress',
  vest: 'Vest',
  set: 'Full Set',
}

export default function OrderReview() {
  const router = useRouter()
  const { fabric, design, measurements, contact, setContact, resetOrder } =
    useCustomOrderStore()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const basePrice = 120
  const fabricModifier = fabric?.priceModifier ?? 0
  const total = calcCustomTotal(fabricModifier, basePrice)

  // ── Validation ────────────────────────────────────────────────
  function validate() {
    const e: Record<string, string> = {}
    if (!contact.name.trim()) e.name = 'Full name is required'
    if (!contact.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      e.email = 'Enter a valid email address'
    if (!contact.street.trim()) e.street = 'Street address is required'
    if (!contact.city.trim()) e.city = 'City is required'
    if (!contact.postalCode.trim()) e.postalCode = 'Postal code is required'
    if (!contact.country) e.country = 'Please select a country'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      // Scroll to first error
      const firstKey = Object.keys(e)[0]
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    setIsSubmitting(true)
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      resetOrder()
    }, 1200)
  }

  // ── Success screen ─────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Checkmark icon */}
        <div className="w-20 h-20 rounded-full bg-afghan-sage/20 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-afghan-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-heading text-h2 text-afghan-warm mb-3">
          Order Received!
        </h1>
        <p className="font-body text-afghan-stone max-w-md mb-2">
          Your custom order has been received. We'll contact you within 24 hours
          to confirm the details and arrange payment.
        </p>
        <p className="font-body text-sm text-afghan-stone/70 mb-8">
          Keep an eye on your inbox — we'll reach out via email.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 bg-afghan-dusty-rose text-white font-body font-medium rounded-lg hover:bg-afghan-muted transition-colors duration-200"
          >
            Browse Collection
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-afghan-border text-afghan-warm font-body font-medium rounded-lg hover:bg-afghan-linen transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── LEFT: Order Summary ──────────────────────────────── */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-h3 text-afghan-warm mb-5">
            Your Order Summary
          </h2>

          {/* Fabric */}
          <SummarySection
            title="Fabric Selection"
            editHref="/custom-order/fabric"
          >
            {fabric ? (
              <div className="flex items-start gap-3">
                {/* Color swatch */}
                <div
                  className="w-10 h-10 rounded-md flex-shrink-0 border border-afghan-border"
                  style={{ backgroundColor: fabric.swatchColor }}
                />
                <div>
                  <p className="font-body font-semibold text-afghan-warm">{fabric.name}</p>
                  <p className="text-sm text-afghan-stone capitalize">{fabric.type}</p>
                  <p className="text-sm font-medium text-afghan-dusty-rose mt-0.5">
                    {formatModifier(fabric.priceModifier)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-red-500">No fabric selected</p>
            )}
          </SummarySection>

          {/* Design */}
          <SummarySection
            title="Design Details"
            editHref="/custom-order/design"
          >
            <div className="space-y-2 text-sm font-body text-afghan-stone">
              {design.garmentType && (
                <Row label="Garment" value={GARMENT_LABELS[design.garmentType] ?? design.garmentType} />
              )}
              {design.colorPreference && (
                <Row label="Colour" value={design.colorPreference} />
              )}
              {design.description && (
                <div>
                  <span className="text-afghan-stone/60 text-xs uppercase tracking-wide">Description</span>
                  <p className="mt-1 text-afghan-warm leading-relaxed">{design.description}</p>
                </div>
              )}
              {design.modifications && (
                <div>
                  <span className="text-afghan-stone/60 text-xs uppercase tracking-wide">Modifications</span>
                  <p className="mt-1 text-afghan-warm">{design.modifications}</p>
                </div>
              )}
              {design.referenceImageUrl && (
                <Row label="Reference" value={design.referenceImageUrl} truncate />
              )}
            </div>
          </SummarySection>

          {/* Measurements */}
          <SummarySection
            title="Measurements"
            editHref="/custom-order/measurements"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm font-body text-afghan-stone">
              {[
                ['Chest / Bust', measurements.chest],
                ['Waist', measurements.waist],
                ['Hips', measurements.hips],
                ['Length', measurements.length],
                ['Shoulder', measurements.shoulder],
                ['Sleeve', measurements.sleeve],
              ].map(([label, val]) => (
                <Row
                  key={String(label)}
                  label={String(label)}
                  value={val !== '' ? `${val} ${measurements.unit}` : '—'}
                />
              ))}
            </div>
          </SummarySection>

          {/* Pricing */}
          <div className="rounded-xl border border-afghan-border bg-afghan-ivory p-5 mt-4">
            <h3 className="font-heading text-h4 text-afghan-warm mb-3">Pricing</h3>
            <div className="space-y-2 font-body text-sm">
              <div className="flex justify-between text-afghan-stone">
                <span>Base price</span>
                <span>{formatPrice(basePrice)}</span>
              </div>
              {fabric && (
                <div className="flex justify-between text-afghan-stone">
                  <span>Fabric ({fabric.name})</span>
                  <span>{formatModifier(fabricModifier)}</span>
                </div>
              )}
              <div className="border-t border-afghan-border pt-2 flex justify-between font-semibold text-afghan-warm text-base">
                <span>Estimated Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <p className="text-xs text-afghan-stone/60 mt-3 leading-relaxed">
              Final price confirmed after review. Shipping calculated separately.
              Payment arranged via WhatsApp or bank transfer.
            </p>
          </div>
        </motion.div>

        {/* ── RIGHT: Contact & Shipping Form ───────────────────── */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="font-heading text-h3 text-afghan-warm mb-5">
            Contact & Shipping
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <Field
              id="field-name"
              label="Full Name *"
              error={errors.name}
            >
              <input
                type="text"
                value={contact.name}
                onChange={e => setContact({ name: e.target.value })}
                placeholder="Fatima Ahmadi"
                className={inputClass(!!errors.name)}
              />
            </Field>

            {/* Email */}
            <Field id="field-email" label="Email Address *" error={errors.email}>
              <input
                type="email"
                value={contact.email}
                onChange={e => setContact({ email: e.target.value })}
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
              />
            </Field>

            {/* Phone */}
            <Field id="field-phone" label="Phone (optional)">
              <input
                type="tel"
                value={contact.phone ?? ''}
                onChange={e => setContact({ phone: e.target.value })}
                placeholder="+32 ..."
                className={inputClass(false)}
              />
            </Field>

            {/* Street */}
            <Field id="field-street" label="Street Address *" error={errors.street}>
              <input
                type="text"
                value={contact.street}
                onChange={e => setContact({ street: e.target.value })}
                placeholder="Rue de la Loi 1"
                className={inputClass(!!errors.street)}
              />
            </Field>

            {/* City + Postal */}
            <div className="grid grid-cols-2 gap-3">
              <Field id="field-city" label="City *" error={errors.city}>
                <input
                  type="text"
                  value={contact.city}
                  onChange={e => setContact({ city: e.target.value })}
                  placeholder="Brussels"
                  className={inputClass(!!errors.city)}
                />
              </Field>
              <Field id="field-postalCode" label="Postal Code *" error={errors.postalCode}>
                <input
                  type="text"
                  value={contact.postalCode}
                  onChange={e => setContact({ postalCode: e.target.value })}
                  placeholder="1000"
                  className={inputClass(!!errors.postalCode)}
                />
              </Field>
            </div>

            {/* Country */}
            <Field id="field-country" label="Country *" error={errors.country}>
              <select
                value={contact.country}
                onChange={e => setContact({ country: e.target.value })}
                className={inputClass(!!errors.country)}
              >
                <option value="">Select a country…</option>
                {EU_COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            {/* Order Notes */}
            <Field id="field-notes" label="Order Notes (optional)">
              <textarea
                value={contact.notes ?? ''}
                onChange={e => setContact({ notes: e.target.value })}
                rows={3}
                placeholder="Any special requests, delivery instructions, or questions…"
                className={`${inputClass(false)} resize-none`}
              />
            </Field>
          </div>

          {/* Submit */}
          <div className="mt-6 space-y-3">
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-afghan-dusty-rose text-white font-body font-semibold rounded-xl hover:bg-afghan-muted transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Placing Order…
                </>
              ) : (
                'Place Order'
              )}
            </motion.button>

            <p className="text-center text-xs text-afghan-stone/60 font-body">
              No payment required now. We'll reach out to confirm and arrange payment.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────

function SummarySection({
  title,
  editHref,
  children,
}: {
  title: string
  editHref: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-afghan-border bg-afghan-ivory p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-h4 text-afghan-warm">{title}</h3>
        <Link
          href={editHref}
          className="text-xs font-body text-afghan-dusty-rose hover:underline flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m-6 6H6v-3l9-9a2.121 2.121 0 013 3L9 13z" />
          </svg>
          Edit
        </Link>
      </div>
      {children}
    </div>
  )
}

function Row({
  label,
  value,
  truncate,
}: {
  label: string
  value: string | number
  truncate?: boolean
}) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-afghan-stone/60 flex-shrink-0">{label}</span>
      <span
        className={`text-afghan-warm text-right ${truncate ? 'truncate max-w-[140px]' : ''}`}
        title={truncate ? String(value) : undefined}
      >
        {value}
      </span>
    </div>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div id={id}>
      <label className="block text-sm font-body font-medium text-afghan-warm mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full px-3 py-2.5 rounded-lg border font-body text-sm text-afghan-warm bg-white',
    'placeholder:text-afghan-stone/40 focus:outline-none focus:ring-2',
    'transition-colors duration-150',
    hasError
      ? 'border-red-400 focus:ring-red-300'
      : 'border-afghan-border focus:ring-afghan-dusty-rose/40 focus:border-afghan-dusty-rose',
  ].join(' ')
}
