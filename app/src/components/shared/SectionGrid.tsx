import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Container } from './Container'

interface SectionGridProps {
  children: ReactNode
  className?: string
}

/**
 * Tinted board that lays out `Section` panels as a 12-column bento grid on large
 * screens and a single column below. Each `Section` sets its own `span`.
 */
export function SectionGrid({ children, className }: SectionGridProps) {
  return (
    <Container>
      <div
        className={cn(
          'grid gap-4 sm:rounded-3xl sm:bg-muted/70 sm:p-3 sm:ring-1 sm:ring-border lg:grid-cols-12 lg:p-4',
          className,
        )}
      >
        {children}
      </div>
    </Container>
  )
}
