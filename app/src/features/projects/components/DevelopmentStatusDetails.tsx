import type { DevelopmentStatus } from '@/types/content'

import { CaseStudyList } from './CaseStudyList'

const headingClass = 'mb-3 text-sm font-semibold text-foreground'

interface DevelopmentStatusDetailsProps {
  status: DevelopmentStatus
}

/** Lists finished and unfinished work separately, so neither reads as the other. */
export function DevelopmentStatusDetails({ status }: DevelopmentStatusDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 id="status-implemented-heading" className={headingClass}>
          Implemented
        </h3>
        <CaseStudyList items={status.implemented} labelledBy="status-implemented-heading" />
      </div>
      <div>
        <h3 id="status-in-development-heading" className={headingClass}>
          Under development
        </h3>
        <CaseStudyList
          items={status.inDevelopment}
          variant="pending"
          labelledBy="status-in-development-heading"
        />
      </div>
    </div>
  )
}
