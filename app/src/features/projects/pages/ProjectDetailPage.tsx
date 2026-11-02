import { useParams } from 'react-router'

import { Container } from '@/components/shared/Container'
import { NotFoundPage } from '@/components/shared/NotFoundPage'
import { getProjectBySlug } from '@/content/projects'
import { usePageMetadata } from '@/hooks/usePageMetadata'
import type { Project } from '@/types/content'

import { CaseStudyContent } from '../components/CaseStudyContent'
import { CaseStudyHeader } from '../components/CaseStudyHeader'
import { ProjectFacts } from '../components/ProjectFacts'
import { ProjectPagination } from '../components/ProjectPagination'

const titleId = 'project-title'

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFoundPage />

  // Keyed by slug so metadata and scroll-triggered animations reset per project.
  return <ProjectCaseStudy key={project.slug} project={project} />
}

function ProjectCaseStudy({ project }: { project: Project }) {
  usePageMetadata({ title: project.name, description: project.summary })

  return (
    <article aria-labelledby={titleId}>
      <CaseStudyHeader project={project} titleId={titleId} />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        {/* Facts come first in DOM order so they appear above the content on small screens. */}
        <aside aria-labelledby="project-facts-heading" className="lg:order-last">
          <div className="lg:sticky lg:top-24">
            <ProjectFacts project={project} />
          </div>
        </aside>
        <CaseStudyContent project={project} />
      </Container>

      <Container className="border-t py-12">
        <ProjectPagination project={project} />
      </Container>
    </article>
  )
}
