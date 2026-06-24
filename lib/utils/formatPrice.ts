/**
 * Format a number as EUR currency string.
 * formatPrice(89)       → "€89.00"
 * formatPrice(89, true) → "€89"       (no cents for whole numbers)
 * formatPrice(89.5)     → "€89.50"
 */
export function formatPrice(amount: number, compact = false): string {
  if (compact && Number.isInteger(amount)) {
    return `€${amount}`
  }
  return new Intl.NumberFormat('en-EU', {
    style:                 'currency',
    currency:              'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a price modifier with a leading + or −
 * formatModifier(30)  → "+€30"
 * formatModifier(-10) → "−€10"
 * formatModifier(0)   → "Included"
 */
export function formatModifier(modifier: number): string {
  if (modifier === 0) return 'Included'
  const sign = modifier > 0 ? '+' : '−'
  return `${sign}€${Math.abs(modifier)}`
}

/**
 * Calculate custom order total
 * base (€120) + fabric modifier
 */
export function calcCustomTotal(fabricModifier: number, base = 120): number {
  return base + fabricModifier
}
