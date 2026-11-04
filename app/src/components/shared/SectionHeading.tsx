import { cn } from '@/lib/utils'

import { IconTile } from './IconTile'
import type { IconComponent } from './social-icons'

interface SectionHeadingProps {
  /** Applied to the `<h2>` so a section can reference it via `aria-labelledby`. */
  id?: string
  eyebrow?: string
  title: string
  description?: string
  icon?: IconComponent
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  icon,
  className,
}: SectionHeadingProps) {
  // An eyebrow that only repeats the title adds noise; the icon row stays.
  const showEyebrow = Boolean(eyebrow) && eyebrow?.toLowerCase() !== title.toLowerCase()

  return (
    <div className={cn('max-w-2xl', className)}>
      {(icon !== undefined || showEyebrow) && (
        <div className="mb-3 flex items-center gap-2.5">
          {icon && <IconTile icon={icon} />}
          {showEyebrow && (
            <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
          )}
        </div>
      )}
      <h2
        id={id}
        className="text-xl font-bold tracking-tight text-balance text-foreground sm:text-2xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">{description}</p>
      )}
    </div>
  )
}
