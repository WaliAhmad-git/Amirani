import type { Metadata } from 'next'
import StepIndicator from '@/components/custom-order/StepIndicator'
import OrderReview from '@/components/custom-order/OrderReview'

export const metadata: Metadata = {
  title: 'Review Your Order — Amirani Store',
  description: 'Review your custom Afghan garment order, enter your contact details, and place your order.',
}

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-afghan-off-white">
      <StepIndicator currentStep={4} />
      <OrderReview />
    </main>
  )
}
