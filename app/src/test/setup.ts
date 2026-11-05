import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

import { clearTheme, stubPrefersDark } from './theme'

// jsdom does not implement scrolling; React Router's <ScrollRestoration> calls it.
vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)

// jsdom lacks IntersectionObserver, which Motion's `whileInView` relies on.
class IntersectionObserverStub {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe() {
    /* no-op */
  }
  unobserve() {
    /* no-op */
  }
  disconnect() {
    /* no-op */
  }
  takeRecords() {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)

stubPrefersDark(false)

afterEach(() => {
  cleanup()
  clearTheme()
  stubPrefersDark(false)
})
