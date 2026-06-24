import type { Metadata } from 'next'
import CatalogClient from './CatalogClient'

export const metadata: Metadata = {
  title:       'Our Collection',
  description: 'Browse Amirani Store\'s full range of Afghan kameez, perahan, dresses, and coord sets. Filtered by category, type, and size — shipped across Europe.',
}

export default function CatalogPage() {
  return <CatalogClient />
}
