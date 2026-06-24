'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCustomOrderStore } from '@/lib/store/customOrderStore'
import { isSafeUrl } from '@/lib/utils/isSafeUrl'
import type { CustomOrderDesign } from '@/lib/types'

const GARMENT_TYPES: { value: CustomOrderDesign['garmentType']; label: string; desc: string }[] = [
  { value: 'kameez',  label: 'Kameez',  desc: 'Long tunic top' },
  { value: 'perahan', label: 'Perahan', desc: 'Traditional Afghan shirt' },
  { value: 'dress',   label: 'Dress',   desc: 'Full-length dress' },
  { value: 'vest',    label: 'Vest',    desc: 'Sleeveless jacket' },
  { value: 'set',     label: 'Set',     desc: 'Matching top & bottom' },
]

const MAX_DESC  = 500
const MAX_MODS  = 300

export default function DesignForm() {
  const router  = useRouter()
  const { design, setDesign, fabric } = useCustomOrderStore()

  // Local state mirrors store so we can debounce/validate
  const [garmentType,       setGarmentType]       = useState<CustomOrderDesign['garmentType']>(design.garmentType)
  const [description,       setDescription]       = useState(design.description)
  const [colorPreference,   setColorPreference]   = useState(design.colorPreference)
  const [referenceImageUrl, setReferenceImageUrl] = useState(design.referenceImageUrl ?? '')
  const [modifications,     setModifications]     = useState(design.modifications ?? '')
  const [touched,           setTouched]           = useState(false)

  // Sync to store on every change
  useEffect(() => {
    setDesign({
      garmentType,
      description,
      colorPreference,
      referenceImageUrl: referenceImageUrl && isSafeUrl(referenceImageUrl) ? referenceImageUrl : undefined,
      modifications:     modifications || undefined,
    })
  }, [garmentType, description, colorPreference, referenceImageUrl, modifications])

  const referenceUrlInvalid = referenceImageUrl.trim().length > 0 && !isSafeUrl(referenceImageUrl)

  const descChars   = description.length
  const modsChars   = modifications.length
  const isValid     = garmentType !== '' && description.trim().length >= 10 && !referenceUrlInvalid

  const handleNext = () => {
    setTouched(true)
    if (!isValid) return
    router.push('/custom-order/measurements')
  }

  const handleBack = () => router.push('/custom-order/fabric')

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl text-afghan-charcoal mb-2">
          Describe Your Design
        </h1>
        <p className="font-body text-afghan-charcoal/60 text-sm max-w-md mx-auto">
          Tell us exactly what you have in mind. The more detail you give, the closer we can get to your vision.
        </p>

        {/* Fabric reminder */}
        {fabric && (
          <div className="inline-flex items-center gap-2 mt-4 bg-white border border-afghan-saffron/20 rounded-full px-4 py-1.5 text-xs font-body text-afghan-charcoal/70 shadow-sm">
            <span
              className="w-3 h-3 rounded-full border border-white/40 shadow-inner flex-shrink-0"
              style={{ backgroundColor: fabric.swatchColor }}
            />
            <span>Fabric: <strong className="text-afghan-charcoal">{fabric.name}</strong></span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* 1 — Garment Type */}
        <fieldset>
          <legend className="block font-body text-sm font-semibold text-afghan-charcoal mb-3">
            Garment Type <span className="text-afghan-terracotta">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {GARMENT_TYPES.map((g) => {
              const isActive = garmentType === g.value
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGarmentType(g.value)}
                  className={`
                    relative flex flex-col items-center justify-center px-2 py-3 rounded-lg border-2 text-center
                    transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-afghan-terracotta
                    ${isActive
                      ? 'border-afghan-terracotta bg-afghan-terracotta/5 shadow-sm'
                      : 'border-afghan-saffron/20 bg-white hover:border-afghan-saffron/50'}
                  `}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="garment-active"
                      className="absolute inset-0 rounded-[10px] border-2 border-afghan-terracotta bg-afghan-terracotta/5"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative text-sm font-semibold font-heading ${isActive ? 'text-afghan-terracotta' : 'text-afghan-charcoal'}`}>
                    {g.label}
                  </span>
                  <span className="relative text-[10px] font-body text-afghan-charcoal/40 mt-0.5 hidden sm:block">
                    {g.desc}
                  </span>
                </button>
              )
            })}
          </div>
          {touched && !garmentType && (
            <p className="text-xs text-afghan-terracotta mt-1.5 font-body">Please select a garment type.</p>
          )}
        </fieldset>

        {/* 2 — Design Description */}
        <div>
          <label htmlFor="description" className="block font-body text-sm font-semibold text-afghan-charcoal mb-1.5">
            Design Description <span className="text-afghan-terracotta">*</span>
          </label>
          <p className="text-xs text-afghan-charcoal/50 font-body mb-2">
            Describe style, neckline, embroidery, occasion, sleeves — anything you want us to know.
          </p>
          <div className="relative">
            <textarea
              id="description"
              rows={5}
              maxLength={MAX_DESC}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g. A formal kameez with a V-neckline and floral gold embroidery along the collar and cuffs. Knee-length, slightly flared. For a wedding in summer..."
              className={`
                w-full rounded-lg border px-4 py-3 font-body text-sm text-afghan-charcoal
                placeholder:text-afghan-charcoal/30 resize-none leading-relaxed
                focus:outline-none focus:ring-2 focus:ring-afghan-terracotta/50 transition
                ${touched && description.trim().length < 10
                  ? 'border-afghan-terracotta/60 bg-red-50/30'
                  : 'border-afghan-saffron/30 bg-white hover:border-afghan-saffron/50'}
              `}
            />
            {/* Character counter */}
            <div className={`
              absolute bottom-2.5 right-3 text-[11px] font-body tabular-nums
              ${descChars > MAX_DESC * 0.9 ? 'text-afghan-terracotta' : 'text-afghan-charcoal/30'}
            `}>
              {descChars}/{MAX_DESC}
            </div>
          </div>
          {touched && description.trim().length < 10 && (
            <p className="text-xs text-afghan-terracotta mt-1.5 font-body">
              Please describe your design (minimum 10 characters).
            </p>
          )}
        </div>

        {/* 3 — Color Preference */}
        <div>
          <label htmlFor="colorPref" className="block font-body text-sm font-semibold text-afghan-charcoal mb-1.5">
            Color Preference
          </label>
          <p className="text-xs text-afghan-charcoal/50 font-body mb-2">
            Describe the colors or color combinations you have in mind.
          </p>
          <input
            id="colorPref"
            type="text"
            value={colorPreference}
            onChange={(e) => setColorPreference(e.target.value)}
            placeholder="e.g. Deep navy with gold embroidery, or ivory with silver threadwork"
            className="w-full rounded-lg border border-afghan-saffron/30 bg-white px-4 py-3 font-body text-sm text-afghan-charcoal placeholder:text-afghan-charcoal/30 focus:outline-none focus:ring-2 focus:ring-afghan-terracotta/50 transition hover:border-afghan-saffron/50"
          />
        </div>

        {/* 4 — Reference Image URL */}
        <div>
          <label htmlFor="refImage" className="block font-body text-sm font-semibold text-afghan-charcoal mb-1.5">
            Reference Image{' '}
            <span className="text-afghan-charcoal/40 font-normal text-xs">(optional)</span>
          </label>
          <p className="text-xs text-afghan-charcoal/50 font-body mb-2">
            Paste a link to a photo, Pinterest pin, or Instagram post for inspiration.
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-afghan-charcoal/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <input
              id="refImage"
              type="url"
              value={referenceImageUrl}
              onChange={(e) => setReferenceImageUrl(e.target.value)}
              placeholder="https://pinterest.com/..."
              className={`w-full rounded-lg border bg-white pl-9 pr-4 py-3 font-body text-sm text-afghan-charcoal placeholder:text-afghan-charcoal/30 focus:outline-none focus:ring-2 transition ${
                referenceUrlInvalid
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-afghan-saffron/30 hover:border-afghan-saffron/50 focus:ring-afghan-terracotta/50'
              }`}
              aria-invalid={referenceUrlInvalid}
              aria-describedby={referenceUrlInvalid ? 'refImage-error' : undefined}
            />
          </div>

          {referenceUrlInvalid && (
            <p id="refImage-error" role="alert" className="mt-1.5 text-xs text-red-500 font-body">
              Please enter a valid http:// or https:// link.
            </p>
          )}

          {/* Live preview chip if valid URL */}
          <AnimatePresence>
            {referenceImageUrl && isSafeUrl(referenceImageUrl) && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-afghan-charcoal/50 font-body"
              >
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Reference link added
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5 — Special Modifications */}
        <div>
          <label htmlFor="modifications" className="block font-body text-sm font-semibold text-afghan-charcoal mb-1.5">
            Special Modifications{' '}
            <span className="text-afghan-charcoal/40 font-normal text-xs">(optional)</span>
          </label>
          <p className="text-xs text-afghan-charcoal/50 font-body mb-2">
            Anything specific beyond the main description — pockets, length adjustments, lining preferences, etc.
          </p>
          <div className="relative">
            <textarea
              id="modifications"
              rows={3}
              maxLength={MAX_MODS}
              value={modifications}
              onChange={(e) => setModifications(e.target.value)}
              placeholder="e.g. Add side pockets, lengthen by 2 inches, fully lined, no embroidery on sleeves..."
              className="w-full rounded-lg border border-afghan-saffron/30 bg-white px-4 py-3 font-body text-sm text-afghan-charcoal placeholder:text-afghan-charcoal/30 resize-none leading-relaxed focus:outline-none focus:ring-2 focus:ring-afghan-terracotta/50 transition hover:border-afghan-saffron/50"
            />
            <div className={`
              absolute bottom-2.5 right-3 text-[11px] font-body tabular-nums
              ${modsChars > MAX_MODS * 0.9 ? 'text-afghan-terracotta' : 'text-afghan-charcoal/30'}
            `}>
              {modsChars}/{MAX_MODS}
            </div>
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-afghan-saffron/20">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-body text-afghan-charcoal/60 hover:text-afghan-charcoal transition-colors px-4 py-2 rounded-lg hover:bg-white"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back: Fabric
        </button>

        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold text-sm transition-all duration-200
            ${isValid
              ? 'bg-afghan-terracotta text-white shadow-md hover:bg-afghan-burgundy cursor-pointer'
              : 'bg-afghan-charcoal/10 text-afghan-charcoal/30 cursor-not-allowed'}
          `}
          aria-disabled={!isValid}
        >
          Next: Measurements
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Validation summary */}
      <AnimatePresence>
        {touched && !isValid && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-xs text-afghan-terracotta font-body mt-3"
          >
            Please select a garment type and add a description before continuing.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
