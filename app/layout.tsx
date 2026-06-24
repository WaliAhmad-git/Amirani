import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Amirani Store — Afghan Fashion, Made for You',
    template: '%s | Amirani Store',
  },
  description:
    'Authentic Afghan clothing for the diaspora. Premade pieces and fully custom orders shipped across Europe.',
  keywords: ['Afghan clothing', 'Afghan fashion', 'custom order', 'diaspora', 'Europe'],
  openGraph: {
    siteName: 'Amirani Store',
    type: 'website',
    locale: 'en_EU',
    images: ['/images/logo.jpeg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
