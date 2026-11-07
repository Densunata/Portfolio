import type { ReactNode } from 'react'

import { TechnologyList } from '@/components/shared/TechnologyBadge'
import type { CaseStudySectionId, CaseStudySectionLayout, Project } from '@/types/content'

import { CaseStudyList } from './CaseStudyList'
import { CaseStudySection } from './CaseStudySection'
import { DevelopmentStatusDetails } from './DevelopmentStatusDetails'
import { ScreenshotGallery } from './ScreenshotGallery'
import { TechnologyGroups } from './TechnologyGroups'

const defaultTitles: Record<CaseStudySectionId, string> = {
  overview: 'Overview',
  purpose: 'Purpose',
  role: 'My role and contributions',
  features: 'Key features',
  technologies: 'Technologies used',
  implementation: 'Key implementation details',
  status: 'Current development status',
  screenshots: 'Screenshots',
}

const defaultSections: CaseStudySectionLayout[] = [
  { id: 'overview' },
  { id: 'purpose' },
  { id: 'role' },
  { id: 'features' },
  { id: 'technologies' },
  { id: 'implementation' },
  { id: 'status' },
  { id: 'screenshots' },
]

function hasItems<T>(items: T[] | undefined): items is T[] {
  return items !== undefined && items.length > 0
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

/** A section's content, or `null` when it has nothing verified to show. */
function getSectionBody(id: CaseStudySectionId, project: Project): ReactNode {
  const caseStudy = project.caseStudy

  switch (id) {
    case 'overview':
      return (
        <Paragraphs
          items={hasItems(caseStudy?.overview) ? caseStudy.overview : [project.summary]}
        />
      )
    case 'purpose':
      return hasItems(caseStudy?.purpose) ? <Paragraphs items={caseStudy.purpose} /> : null
    case 'role':
      return hasItems(caseStudy?.contributions) ? (
        <>
          {project.role && <p className="mb-4 font-medium text-foreground">{project.role}</p>}
          <CaseStudyList items={caseStudy.contributions} />
        </>
      ) : null
    case 'features':
      return hasItems(caseStudy?.features) ? <CaseStudyList items={caseStudy.features} /> : null
    case 'technologies':
      if (hasItems(project.techGroups)) return <TechnologyGroups groups={project.techGroups} />
      return hasItems(project.tech) ? <TechnologyList items={project.tech} /> : null
    case 'implementation':
      return hasItems(caseStudy?.implementation) ? (
        <CaseStudyList items={caseStudy.implementation} />
      ) : null
    case 'status':
      return caseStudy?.developmentStatus ? (
        <DevelopmentStatusDetails status={caseStudy.developmentStatus} />
      ) : null
    case 'screenshots':
      return <ScreenshotGallery screenshots={caseStudy?.screenshots} />
  }
}

interface CaseStudyContentProps {
  project: Project
}

/**
 * Renders the case-study sections, in the project's own layout if it has one.
 * Sections without verified content are omitted entirely; screenshots fall back
 * to a placeholder.
 */
export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const sections = project.caseStudy?.sections ?? defaultSections

  return (
    <div className="divide-y *:py-10 *:first:pt-0 *:last:pb-0">
      {sections.map(({ id, title }) => {
        const body = getSectionBody(id, project)
        if (body === null) return null
        return (
          <CaseStudySection key={id} id={id} title={title ?? defaultTitles[id]}>
            {body}
          </CaseStudySection>
        )
      })}
    </div>
  )
}
