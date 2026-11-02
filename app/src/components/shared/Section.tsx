import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Container } from './Container'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface SectionProps {
  /** Anchor id, also used for in-page navigation (`/#id`). */
  id: string
  eyebrow?: string
  title: string
  description?: string
  /** `muted` adds a tinted band to separate adjacent sections. */
  tone?: 'default' | 'muted'
  children: ReactNode
}

/** A homepage/content section: anchor, accessible heading, and consistent spacing. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = 'default',
  children,
}: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-16 py-16 sm:py-24', tone === 'muted' && 'border-y bg-muted/60')}
    >
      <Container>
        <Reveal>
          <SectionHeading
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  )
}
