import type { Metadata } from 'next'
import CartClient from './CartClient'

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your selected Afghan garments and custom orders before checkout.',
}

export default function CartPage() {
  return <CartClient />
}
