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

/** Top-of-page band with the page's single `<h1>`. */
export function PageHeader({
  title,
  eyebrow,
  description,
  titleId,
  before,
  actions,
}: PageHeaderProps) {
  return (
    <header className="border-b bg-muted/60">
      <Container className="py-12 sm:py-16">
        {before}
        <Reveal className={before ? 'mt-8' : undefined}>
          {eyebrow && (
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>
          )}
          <h1
            id={titleId}
            className="mt-2 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-3xl text-lg text-pretty text-muted-foreground">
              {description}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>
      </Container>
    </header>
  )
}
