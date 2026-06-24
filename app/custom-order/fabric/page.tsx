import type { Metadata } from 'next'
import StepIndicator from '@/components/custom-order/StepIndicator'
import FabricSelector from '@/components/custom-order/FabricSelector'

export const metadata: Metadata = {
  title: 'Choose Your Fabric — Custom Order | Amirani Store',
  description: 'Step 1 of 4: Select the fabric for your custom Afghan garment. Silk, chiffon, linen, velvet, and more.',
}

export default function FabricPage() {
  return (
    <main className="min-h-screen bg-afghan-cream">
      <StepIndicator currentStep={1} />
      <FabricSelector />
    </main>
  )
}
