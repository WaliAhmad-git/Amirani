'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const STEPS = [
  { number: 1, label: 'Fabric',       href: '/custom-order/fabric' },
  { number: 2, label: 'Design',       href: '/custom-order/design' },
  { number: 3, label: 'Measurements', href: '/custom-order/measurements' },
  { number: 4, label: 'Review',       href: '/custom-order/review' },
]

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full bg-afghan-cream border-b border-afghan-saffron/20 py-5 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Step label */}
        <p className="text-center text-sm text-afghan-charcoal/60 mb-4 font-body">
          Step {currentStep} of {STEPS.length}
        </p>

        {/* Step bar */}
        <div className="flex items-center justify-between relative">
          {/* Background connector line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-afghan-saffron/20 z-0" />

          {/* Progress connector line */}
          <motion.div
            className="absolute top-4 left-0 h-0.5 bg-afghan-terracotta z-0"
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {STEPS.map((step) => {
            const isDone    = step.number < currentStep
            const isCurrent = step.number === currentStep

            return (
              <div key={step.number} className="flex flex-col items-center z-10 gap-1.5">
                {/* Circle */}
                <motion.div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2
                    transition-colors duration-300
                    ${isDone
                      ? 'bg-afghan-terracotta border-afghan-terracotta text-white'
                      : isCurrent
                        ? 'bg-white border-afghan-terracotta text-afghan-terracotta'
                        : 'bg-white border-afghan-saffron/30 text-afghan-charcoal/40'}
                  `}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDone ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={`text-xs font-body hidden sm:block ${
                    isCurrent
                      ? 'text-afghan-terracotta font-semibold'
                      : isDone
                        ? 'text-afghan-charcoal/70'
                        : 'text-afghan-charcoal/40'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
