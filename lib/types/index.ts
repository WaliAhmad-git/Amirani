// ─── Product (premade) ───────────────────────────────────────────
export interface Product {
  id:          string
  slug:        string
  name:        string
  price:       number              // EUR
  category:    'mens' | 'womens' | 'kids'
  type:        'kameez' | 'perahan' | 'dress' | 'vest' | 'set'
  images:      string[]
  description: string
  colors:      string[]            // display names, e.g. "Ivory", "Dusty Rose"
  colorHex:    string[]            // matching hex values for swatches
  sizes:       string[]
  inStock:     boolean
  featured:    boolean
  tags?:       string[]
}

// ─── Fabric (custom order) ────────────────────────────────────────
export interface Fabric {
  id:            string
  name:          string
  type:          'silk' | 'cotton' | 'chiffon' | 'velvet' | 'linen' | 'satin'
  description:   string
  image:         string            // placeholder color swatch path
  swatchColor:   string            // hex for CSS fallback
  priceModifier: number            // EUR, added to base custom order price
  available:     boolean
  origin?:       string            // e.g. "Herat, Afghanistan"
}

// ─── Custom Order (built across 4 steps) ─────────────────────────
export interface CustomOrderDesign {
  garmentType:        'kameez' | 'perahan' | 'dress' | 'vest' | 'set' | ''
  description:        string
  colorPreference:    string
  referenceImageUrl?: string
  modifications?:     string
}

export interface CustomOrderMeasurements {
  chest:    number | ''
  waist:    number | ''
  hips:     number | ''
  length:   number | ''
  shoulder: number | ''
  sleeve:   number | ''
  unit:     'cm' | 'inches'
  height?:  number | ''
  weight?:  number | ''
}

export interface CustomOrderContact {
  name:       string
  email:      string
  phone?:     string
  street:     string
  city:       string
  postalCode: string
  country:    string
  notes?:     string
}

export interface CustomOrder {
  fabric:      Fabric | null
  design:      CustomOrderDesign
  measurements: CustomOrderMeasurements
  contact:     CustomOrderContact
}

// ─── Cart ─────────────────────────────────────────────────────────
export interface CartItemPremade {
  type:       'premade'
  id:         string              // unique cart entry id
  product:    Product
  selectedColor: string
  selectedSize:  string
  quantity:   number
  unitPrice:  number
  totalPrice: number
}

export interface CartItemCustom {
  type:        'custom'
  id:          string
  customOrder: CustomOrder
  quantity:    number
  unitPrice:   number
  totalPrice:  number
}

export type CartItem = CartItemPremade | CartItemCustom

// ─── Testimonial ──────────────────────────────────────────────────
export interface Testimonial {
  id:      string
  quote:   string
  name:    string
  city:    string
  country: string
  rating:  1 | 2 | 3 | 4 | 5
  type:    'premade' | 'custom'
}

// ─── Filter state (catalog) ───────────────────────────────────────
export interface CatalogFilters {
  category:  'all' | 'mens' | 'womens' | 'kids'
  type:      'all' | 'kameez' | 'perahan' | 'dress' | 'vest' | 'set'
  maxPrice:  number
  inStock:   boolean
}
