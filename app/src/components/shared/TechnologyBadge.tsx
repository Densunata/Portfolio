import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TechnologyBadgeProps {
  name: string
}

/** Compact label for a technology used in a project or role. */
export function TechnologyBadge({ name }: TechnologyBadgeProps) {
  return (
    <Badge variant="secondary" className="font-normal">
      {name}
    </Badge>
  )
}

interface TechnologyListProps {
  items: string[]
  /** Accessible name for the list, e.g. "Technologies used". */
  label?: string
  className?: string
}

export function TechnologyList({
  items,
  label = 'Technologies used',
  className,
}: TechnologyListProps) {
  if (items.length === 0) return null

  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item}>
          <TechnologyBadge name={item} />
        </li>
      ))}
    </ul>
  )
}
