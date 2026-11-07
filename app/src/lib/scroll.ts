import type { Location } from 'react-router'

/**
 * Key for `<ScrollRestoration>`. React Router gives every full page load the
 * same key, "default", so a tab would otherwise apply one page's saved position
 * to the next URL opened in it, even over that URL's `#hash`. Keying those loads
 * by URL keeps refresh working; in-app navigation keeps its unique per-entry key
 * so back and forward restore correctly.
 */
export function getScrollRestorationKey(
  location: Pick<Location, 'key' | 'pathname' | 'search' | 'hash'>,
): string {
  if (location.key !== 'default') return location.key
  return `${location.pathname}${location.search}${location.hash}`
}
