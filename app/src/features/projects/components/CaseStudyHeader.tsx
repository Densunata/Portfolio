import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

import { PageHeader } from '@/components/shared/PageHeader'
import type { Project } from '@/types/content'

interface CaseStudyHeaderProps {
  project: Project
  /** Id for the `<h1>`, so the page `<article>` can reference it. */
  titleId: string
}

export function CaseStudyHeader({ project, titleId }: CaseStudyHeaderProps) {
  return (
    <PageHeader
      titleId={titleId}
      eyebrow={project.category}
      title={project.name}
      description={project.summary}
      before={
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </Link>
      }
    />
  )
}
