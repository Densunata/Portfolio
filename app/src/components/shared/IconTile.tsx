import { cn } from '@/lib/utils'

import type { IconComponent } from './social-icons'

interface IconTileProps {
  icon: IconComponent
  /** `solid`: filled primary tile (panel headers). `soft`: light tile for list items. */
  tone?: 'solid' | 'soft'
  className?: string
}

/** Small rounded square holding a decorative icon. */
export function IconTile({ icon: Icon, tone = 'solid', className }: IconTileProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-lg',
        tone === 'solid'
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-card text-primary ring-1 ring-border',
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-4" />
    </span>
  )
}
