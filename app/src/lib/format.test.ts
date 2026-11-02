import { describe, expect, it } from 'vitest'

import { formatDateRange, formatYearMonth, getInitials } from './format'

describe('format', () => {
  it('formats year-month values', () => {
    expect(formatYearMonth('2026-02')).toBe('February 2026')
    expect(formatYearMonth('2026-11')).toBe('November 2026')
  })

  it('formats date ranges, including ongoing ones', () => {
    expect(formatDateRange({ start: '2026-09', end: '2026-11' })).toBe(
      'September 2026 – November 2026',
    )
    expect(formatDateRange({ start: '2026-09' })).toBe('September 2026 – Present')
  })

  it('builds initials without middle initials', () => {
    expect(getInitials('Raiden A. Victor')).toBe('RV')
  })
})
