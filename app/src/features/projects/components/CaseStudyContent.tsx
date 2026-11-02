import { TechnologyList } from '@/components/shared/TechnologyBadge'
import type { Project } from '@/types/content'

import { CaseStudyList } from './CaseStudyList'
import { CaseStudySection } from './CaseStudySection'
import { ScreenshotGallery } from './ScreenshotGallery'

function hasItems<T>(items: T[] | undefined): items is T[] {
  return items !== undefined && items.length > 0
}

interface CaseStudyContentProps {
  project: Project
}

/**
 * Renders the case-study sections in a fixed order. Sections without verified
 * content are omitted entirely; screenshots fall back to a placeholder.
 */
export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const caseStudy = project.caseStudy
  const overview = hasItems(caseStudy?.overview) ? caseStudy.overview : [project.summary]

  return (
    <div className="space-y-12">
      <CaseStudySection id="overview" title="Overview">
        <div className="space-y-4">
          {overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CaseStudySection>

      {hasItems(caseStudy?.purpose) && (
        <CaseStudySection id="purpose" title="Purpose">
          <div className="space-y-4">
            {caseStudy.purpose.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </CaseStudySection>
      )}

      {hasItems(caseStudy?.contributions) && (
        <CaseStudySection id="role" title="My role and contributions">
          {project.role && <p className="mb-4 font-medium text-foreground">{project.role}</p>}
          <CaseStudyList items={caseStudy.contributions} />
        </CaseStudySection>
      )}

      {hasItems(project.tech) && (
        <CaseStudySection id="technologies" title="Technologies used">
          <TechnologyList items={project.tech} />
        </CaseStudySection>
      )}

      {hasItems(caseStudy?.implementation) && (
        <CaseStudySection id="implementation" title="Key implementation details">
          <CaseStudyList items={caseStudy.implementation} />
        </CaseStudySection>
      )}

      <CaseStudySection id="screenshots" title="Screenshots">
        <ScreenshotGallery screenshots={caseStudy?.screenshots} />
      </CaseStudySection>
    </div>
  )
}
