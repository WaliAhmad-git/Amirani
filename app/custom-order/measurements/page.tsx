import type { Metadata } from 'next'
import StepIndicator from '@/components/custom-order/StepIndicator'
import MeasurementForm from '@/components/custom-order/MeasurementForm'

export const metadata: Metadata = {
  title: 'Your Measurements — Custom Order | Amirani Store',
  description:
    'Step 3 of 4: Enter your body measurements so we can tailor your Afghan garment to a perfect fit.',
}

export default function MeasurementsPage() {
  return (
    <main className="min-h-screen bg-afghan-cream">
      <StepIndicator currentStep={3} />
      <MeasurementForm />
    </main>
  )
}
