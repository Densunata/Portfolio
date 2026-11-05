import { beforeEach, describe, expect, it } from 'vitest'

import { stubPrefersDark } from '@/test/theme'

import indexHtml from '../../../index.html?raw'
import { applyTheme, getInitialTheme, readThemeCookie, THEME_COLORS, THEME_COOKIE } from './theme'

function meta(name: string) {
  return document.querySelector(`meta[name="${name}"]`)?.getAttribute('content')
}

/** Runs the pre-paint script from index.html against the test document. */
function runInlineScript() {
  const doc = new DOMParser().parseFromString(indexHtml, 'text/html')
  const script = doc.querySelector('head script:not([src])')?.textContent
  expect(script).toBeTruthy()
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call -- deliberately runs this repo's own index.html script
  new Function(script ?? '')()
}

describe('readThemeCookie', () => {
  it('reads the saved theme from among other cookies', () => {
    expect(readThemeCookie(`a=1; ${THEME_COOKIE}=dark; b=2`)).toBe('dark')
    expect(readThemeCookie(`${THEME_COOKIE}=light`)).toBe('light')
  })

  it('ignores missing, unknown, and look-alike cookies', () => {
    expect(readThemeCookie('')).toBeNull()
    expect(readThemeCookie(`${THEME_COOKIE}=blue`)).toBeNull()
    expect(readThemeCookie(`${THEME_COOKIE}=darker`)).toBeNull()
    expect(readThemeCookie(`x${THEME_COOKIE}=dark`)).toBeNull()
  })
})

describe('index.html pre-paint script', () => {
  beforeEach(() => {
    document.head.innerHTML =
      '<meta name="color-scheme" content="light dark" /><meta name="theme-color" content="" />'
  })

  const cases = [
    { name: 'saved dark on a light system', cookie: 'dark', prefersDark: false, expected: 'dark' },
    { name: 'saved light on a dark system', cookie: 'light', prefersDark: true, expected: 'light' },
    { name: 'no saved theme on a dark system', cookie: null, prefersDark: true, expected: 'dark' },
    {
      name: 'no saved theme on a light system',
      cookie: null,
      prefersDark: false,
      expected: 'light',
    },
    { name: 'an invalid saved theme', cookie: 'blue', prefersDark: true, expected: 'dark' },
  ] as const

  it.each(cases)('agrees with theme.ts for $name', ({ cookie, prefersDark, expected }) => {
    stubPrefersDark(prefersDark)
    if (cookie) document.cookie = `${THEME_COOKIE}=${cookie}; path=/`

    runInlineScript()

    expect(getInitialTheme()).toBe(expected)
    expect(document.documentElement.classList.contains('dark')).toBe(expected === 'dark')
    expect(meta('color-scheme')).toBe(expected)
    expect(meta('theme-color')).toBe(THEME_COLORS[expected])
  })

  it('leaves the document as applyTheme would', () => {
    stubPrefersDark(true)
    runInlineScript()
    const fromScript = document.head.innerHTML

    applyTheme('dark')

    expect(document.head.innerHTML).toBe(fromScript)
  })
})
