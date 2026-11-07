import { CheckCircle2, CircleDashed } from 'lucide-react'

interface CaseStudyListProps {
  items: string[]
  /** `pending` marks unfinished work, so it never carries a completed check mark. */
  variant?: 'complete' | 'pending'
  /** Id of the heading that names this list. */
  labelledBy?: string
}

export function CaseStudyList({ items, variant = 'complete', labelledBy }: CaseStudyListProps) {
  return (
    <ul aria-labelledby={labelledBy} className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          {variant === 'pending' ? (
            <CircleDashed
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            />
          ) : (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
