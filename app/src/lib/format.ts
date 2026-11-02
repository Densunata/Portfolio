import type { DateRange, YearMonth } from '@/types/content'

const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** `2026-02` → `February 2026` */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split('-').map(Number)
  if (!year || !month) return value
  return monthYear.format(new Date(Date.UTC(year, month - 1)))
}

/** `{ start: '2026-02', end: '2026-05' }` → `February 2026 – May 2026` */
export function formatDateRange({ start, end }: DateRange): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`
}

/** `Raiden A. Victor` → `RV` (skips middle initials). */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => word.length > 0 && !word.endsWith('.'))
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
