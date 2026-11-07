import { useParams } from 'react-router'

import { Container } from '@/components/shared/Container'
import { NotFoundPage } from '@/components/shared/NotFoundPage'
import { SectionGrid } from '@/components/shared/SectionGrid'
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

      <SectionGrid className="items-start">
        {/* Facts come first in DOM order so they appear above the content on small screens. */}
        <aside
          aria-labelledby="project-facts-heading"
          className="lg:sticky lg:top-8 lg:order-last lg:col-span-4"
        >
          <ProjectFacts project={project} />
        </aside>
        <div className="min-w-0 rounded-2xl bg-card p-5 shadow-xs ring-1 ring-foreground/10 sm:p-6 lg:col-span-8 lg:p-8">
          <CaseStudyContent project={project} />
        </div>
      </SectionGrid>

      <Container className="pt-10 sm:pt-12">
        <ProjectPagination project={project} />
      </Container>
    </article>
  )
}
