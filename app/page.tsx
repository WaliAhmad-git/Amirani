import type { Metadata } from 'next'
import HeroSection      from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks       from '@/components/home/HowItWorks'
import CustomOrderCTA   from '@/components/home/CustomOrderCTA'
import Testimonials     from '@/components/home/Testimonials'
import PatternDivider, { FullWidthPatternBand } from '@/components/ui/PatternDivider'

export const metadata: Metadata = {
  title:       'Amirani Store — Afghan Fashion, Made for You',
  description: 'Authentic Afghan clothing for the diaspora. Premade pieces and fully custom orders shipped across Europe.',
  openGraph: {
    title:       'Amirani Store — Afghan Fashion, Made for You',
    description: 'Authentic Afghan clothing for the diaspora. Premade pieces and fully custom orders shipped across Europe.',
    type:        'website',
  },
}

export default function HomePage() {
  return (
    <>
      {/* 3.1 ─ Hero */}
      <HeroSection />

      {/* Divider */}
      <PatternDivider />

      {/* 3.2 ─ Featured Products */}
      <FeaturedProducts />

      {/* Pattern band separator */}
      <FullWidthPatternBand />

      {/* 3.3 ─ How It Works */}
      <HowItWorks />

      {/* Divider */}
      <PatternDivider flipped />

      {/* 3.4 ─ Custom Order CTA Banner */}
      <CustomOrderCTA />

      {/* Divider */}
      <PatternDivider />

      {/* 3.5 ─ Testimonials */}
      <Testimonials />

      {/* Final pattern band before footer */}
      <FullWidthPatternBand />
    </>
  )
}
