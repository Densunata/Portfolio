import { vi } from 'vitest'

import { THEME_COOKIE } from '@/lib/theme'

/** jsdom lacks `matchMedia`; this stub reports only the system color scheme. */
export function stubPrefersDark(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: prefersDark && query === '(prefers-color-scheme: dark)',
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
  }))
}

export function clearTheme() {
  document.cookie = `${THEME_COOKIE}=; path=/; max-age=0`
  document.documentElement.classList.remove('dark')
}
