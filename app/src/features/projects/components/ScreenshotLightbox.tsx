import { ExternalLink, Maximize2, X } from 'lucide-react'
import { Dialog } from 'radix-ui'

import { cn } from '@/lib/utils'
import type { Screenshot } from '@/types/content'

interface ScreenshotLightboxProps {
  screenshot: Screenshot
  /** Classes for the thumbnail image. */
  thumbnailClassName?: string
}

/**
 * A screenshot thumbnail that opens the full image in a modal. The modal traps
 * focus, closes on Escape, the close button, or a click outside the image, and
 * returns focus to the thumbnail.
 */
export function ScreenshotLightbox({ screenshot, thumbnailClassName }: ScreenshotLightboxProps) {
  const title = screenshot.caption ?? 'Screenshot'

  return (
    <Dialog.Root>
      <Dialog.Trigger className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl">
        <img
          src={screenshot.src}
          alt={screenshot.alt}
          loading="lazy"
          className={cn(
            'w-full rounded-xl border transition-transform duration-300 group-hover:scale-[1.01] motion-reduce:transition-none',
            thumbnailClassName,
          )}
        />
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm ring-1 ring-foreground/10">
          <Maximize2 aria-hidden="true" className="size-3.5" />
          View full size
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none dark:bg-background/85" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none sm:p-8">
          <div className="flex w-full items-center justify-between gap-4 text-primary-foreground dark:text-foreground">
            <Dialog.Title className="truncate text-sm font-semibold sm:text-base">
              {title}
            </Dialog.Title>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={screenshot.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1.5 text-xs font-medium ring-1 ring-primary-foreground/20 transition-colors hover:bg-background/20 dark:bg-foreground/10 dark:ring-foreground/20 dark:hover:bg-foreground/20"
              >
                <ExternalLink aria-hidden="true" className="size-3.5" />
                Open original
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Dialog.Close
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full bg-background/10 ring-1 ring-primary-foreground/20 transition-colors hover:bg-background/20 dark:bg-foreground/10 dark:ring-foreground/20 dark:hover:bg-foreground/20"
              >
                <X aria-hidden="true" className="size-4" />
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">{screenshot.alt}</Dialog.Description>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close full-size screenshot"
              className="flex min-h-0 w-full flex-1 cursor-zoom-out items-center justify-center rounded-xl"
            >
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
