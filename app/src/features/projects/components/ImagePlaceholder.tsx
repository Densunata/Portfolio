import { FolderKanban } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  /** Visible text, e.g. "Screenshots coming soon". Without it the placeholder is decorative. */
  label?: string
  className?: string
}

/** Neutral stand-in for project imagery that has not been provided yet. */
export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div
      data-testid="image-placeholder"
      aria-hidden={label ? undefined : true}
      className={cn(
        'grid aspect-video w-full place-items-center bg-secondary bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px]',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <span className="grid size-12 place-items-center rounded-xl border bg-background text-primary shadow-xs">
          <FolderKanban aria-hidden="true" className="size-6" />
        </span>
        {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
      </div>
    </div>
  )
}
