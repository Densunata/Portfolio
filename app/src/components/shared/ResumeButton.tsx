import { Clock, Download, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import type { Resume } from '@/types/content'

interface ResumeButtonProps {
  /** Defaults to `profile.resume`; overridable for tests. */
  resume?: Resume
}

/**
 * Opens the public (redacted) CV in a new tab, with a compact download link
 * beside it. Renders a disabled "coming soon" state until `resume.available`
 * is true, so we never link to a missing file.
 */
export function ResumeButton({ resume = profile.resume }: ResumeButtonProps) {
  const { href, available } = resume

  if (!available) {
    return (
      <Button variant="outline" size="lg" disabled>
        <Clock aria-hidden="true" />
        Resume coming soon
      </Button>
    )
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Button asChild variant="outline" size="lg">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <FileText aria-hidden="true" />
          View My Resume<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Button>
      <Button asChild variant="outline" size="icon-lg" className="size-10">
        <a href={href} download aria-label="Download resume (PDF)" title="Download resume (PDF)">
          <Download aria-hidden="true" />
        </a>
      </Button>
    </div>
  )
}
