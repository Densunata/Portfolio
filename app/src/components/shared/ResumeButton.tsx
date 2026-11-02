import { Clock, Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

/**
 * Downloads the public (redacted) CV. Renders a disabled "coming soon" state
 * until `profile.resume.available` is true, so we never link to a missing file.
 */
export function ResumeButton() {
  const { href, available } = profile.resume

  if (!available) {
    return (
      <Button variant="outline" size="lg" disabled>
        <Clock aria-hidden="true" />
        Resume coming soon
      </Button>
    )
  }

  return (
    <Button asChild variant="outline" size="lg">
      <a href={href} download>
        <Download aria-hidden="true" />
        Download resume
      </a>
    </Button>
  )
}
