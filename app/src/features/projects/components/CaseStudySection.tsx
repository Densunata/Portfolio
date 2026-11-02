import type { ReactNode } from 'react'

import { Reveal } from '@/components/shared/Reveal'

interface CaseStudySectionProps {
  /** Anchor id; the heading gets `${id}-heading`. */
  id: string
  title: string
  children: ReactNode
}

/** One titled block of a project case study (overview, contributions, ...). */
export function CaseStudySection({ id, title, children }: CaseStudySectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20">
      <Reveal>
        <h2
          id={headingId}
          className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          {title}
        </h2>
        <div className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</div>
      </Reveal>
    </section>
  )
}
