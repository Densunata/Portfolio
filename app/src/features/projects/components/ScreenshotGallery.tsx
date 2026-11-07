import { cn } from '@/lib/utils'
import type { Screenshot } from '@/types/content'

import { ImagePlaceholder } from './ImagePlaceholder'
import { ScreenshotLightbox } from './ScreenshotLightbox'

interface ScreenshotGalleryProps {
  screenshots?: Screenshot[]
}

/** Project screenshots (each opens full size in a modal), or a "coming soon" placeholder. */
export function ScreenshotGallery({ screenshots = [] }: ScreenshotGalleryProps) {
  if (screenshots.length === 0) {
    return <ImagePlaceholder label="Screenshots coming soon" className="rounded-xl border" />
  }

  return (
    <ul className={cn('grid gap-6', screenshots.length > 1 && 'sm:grid-cols-2')}>
      {screenshots.map((screenshot) => (
        <li key={screenshot.src}>
          <figure>
            <ScreenshotLightbox
              screenshot={screenshot}
              // A lone screenshot keeps its own proportions; a grid uses uniform tiles.
              thumbnailClassName={
                screenshots.length > 1 ? 'aspect-video object-cover object-top' : 'h-auto'
              }
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
