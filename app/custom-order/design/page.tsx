import type { Metadata } from 'next'
import StepIndicator from '@/components/custom-order/StepIndicator'
import DesignForm from '@/components/custom-order/DesignForm'

export const metadata: Metadata = {
  title: 'Design Details — Custom Order | Amirani Store',
  description: 'Step 2 of 4: Describe the design of your custom Afghan garment — garment type, style, colors, and any special modifications.',
}

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-afghan-cream">
      <StepIndicator currentStep={2} />
      <DesignForm />
    </main>
  )
}
