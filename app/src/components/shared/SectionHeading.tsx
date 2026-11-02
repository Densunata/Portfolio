import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** Applied to the `<h2>` so a section can reference it via `aria-labelledby`. */
  id?: string
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>
      )}
      <h2
        id={id}
        className="mt-2 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  )
}
