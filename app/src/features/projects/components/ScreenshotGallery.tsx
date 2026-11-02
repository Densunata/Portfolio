import { cn } from '@/lib/utils'
import type { Screenshot } from '@/types/content'

import { ImagePlaceholder } from './ImagePlaceholder'

interface ScreenshotGalleryProps {
  screenshots?: Screenshot[]
}

/** Project screenshots, or a neutral "coming soon" placeholder. */
export function ScreenshotGallery({ screenshots = [] }: ScreenshotGalleryProps) {
  if (screenshots.length === 0) {
    return <ImagePlaceholder label="Screenshots coming soon" className="rounded-xl border" />
  }

  return (
    <ul className={cn('grid gap-6', screenshots.length > 1 && 'sm:grid-cols-2')}>
      {screenshots.map((screenshot) => (
        <li key={screenshot.src}>
          <figure>
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              loading="lazy"
              className="aspect-video w-full rounded-xl border object-cover object-top"
            />
            {screenshot.caption && (
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {screenshot.caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  )
}
