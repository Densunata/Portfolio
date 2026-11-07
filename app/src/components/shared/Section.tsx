import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { IconComponent } from './social-icons'

/** Columns a panel spans in a `SectionGrid` on large screens. */
export type SectionSpan = 'full' | 'wide' | 'narrow'

const spanClasses: Record<SectionSpan, string> = {
  full: 'lg:col-span-12',
  wide: 'lg:col-span-7',
  narrow: 'lg:col-span-5',
}

export interface SectionProps {
  /** Anchor id, also used for in-page navigation (`/#id`). */
  id: string
  eyebrow?: string
  title: string
  description?: string
  /** Decorative icon shown in the panel header. */
  icon?: IconComponent
  /** Rendered at the end of the header row (e.g. a "View all" link). */
  action?: ReactNode
  span?: SectionSpan
  children: ReactNode
}

/**
 * A content panel: anchor, accessible heading, and consistent padding. Place
 * panels inside a `SectionGrid`. The body is a container-query context, so lists
 * inside adapt to the panel's width rather than the viewport's.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  icon,
  action,
  span = 'full',
  children,
}: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'flex min-w-0 scroll-mt-20 flex-col rounded-2xl bg-card p-5 text-card-foreground shadow-xs ring-1 ring-foreground/10 sm:p-6 lg:scroll-mt-8 lg:p-7',
        spanClasses[span],
      )}
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <SectionHeading
          id={headingId}
          icon={icon}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        {action}
      </Reveal>
      <div className="@container mt-6 flex-1">{children}</div>
    </section>
  )
}
