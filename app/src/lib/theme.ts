export type Theme = 'dark' | 'light'

/**
 * The inline script in /index.html repeats this cookie name, the initial-theme
 * rule, and `applyTheme`, so the theme is set before first paint.
 * `theme.test.ts` runs that script to keep the two in sync.
 */
export const THEME_COOKIE = 'portfolio-theme'

/** Browser UI color per theme: the brand navy, and the dark `--background` token. */
export const THEME_COLORS: Record<Theme, string> = {
  light: '#1e3a6e',
  dark: '#0a111f',
}

export function readThemeCookie(cookie: string): Theme | null {
  const match = new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=(dark|light)(?:;|$)`).exec(cookie)
  return match ? (match[1] as Theme) : null
}

export function writeThemeCookie(theme: Theme): void {
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; SameSite=Lax`
}

/** The visitor's saved choice, else the system setting. */
export function getInitialTheme(): Theme {
  return (
    readThemeCookie(document.cookie) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}
