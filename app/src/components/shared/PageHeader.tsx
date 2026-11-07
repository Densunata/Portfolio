import type { ReactNode } from 'react'

import { Container } from './Container'
import { Reveal } from './Reveal'

interface PageHeaderProps {
  title: string
  eyebrow?: string
  description?: string
  /** Id for the `<h1>`, e.g. so an `<article>` can reference it. */
  titleId?: string
  /** Rendered above the heading (e.g. a back link). */
  before?: ReactNode
  /** Rendered below the description (e.g. buttons). */
  actions?: ReactNode
}

/** Top-of-page intro with the page's single `<h1>`. */
export function PageHeader({
  title,
  eyebrow,
  description,
  titleId,
  before,
  actions,
}: PageHeaderProps) {
  return (
    <header>
      <Container className="pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-14">
        {before}
        <Reveal className={before ? 'mt-6' : undefined}>
          {eyebrow && (
            <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
          )}
          <h1
            id={titleId}
            className="mt-2 text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-3xl text-base text-pretty text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>
      </Container>
    </header>
  )
}
