/**
 * Validates that a user-supplied URL is safe to store/display/link to.
 *
 * Rejects:
 *  - javascript:, data:, vbscript:, file: and any non-http(s) scheme
 *  - malformed URLs
 *
 * This exists specifically for free-text URL inputs (like "paste a reference
 * image link") where a user could otherwise enter something like
 * `javascript:alert(document.cookie)` which — if that value is ever rendered
 * as an <a href> or window.location target down the line — would execute.
 *
 * Even though the current UI only ever displays this value as plain text
 * (React escapes it, so no XSS today), validating at the point of entry
 * means the stored value is safe no matter how it's rendered later.
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false

  let parsed: URL
  try {
    parsed = new URL(url.trim())
  } catch {
    return false
  }

  return parsed.protocol === 'http:' || parsed.protocol === 'https:'
}
