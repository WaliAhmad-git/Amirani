import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Amirani Store — questions about orders, custom garments, or general inquiries. We respond within 24 hours.',
  openGraph: {
    title: 'Contact Amirani Store',
    description: 'Reach out for order inquiries, custom garment questions, or just to say salaam.',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
