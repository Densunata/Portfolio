import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { getAdjacentProjects } from '@/content/projects'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/content'

const linkClass =
  'group block rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40'

interface ProjectPaginationProps {
  project: Project
}

/** Previous / next links to the other case studies, plus a link back to all projects. */
export function ProjectPagination({ project }: ProjectPaginationProps) {
  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <nav aria-labelledby="more-projects-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="more-projects-heading"
          className="text-sm font-semibold tracking-wider text-primary uppercase"
        >
          More projects
        </h2>
        <Link
          to="/projects"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          View all projects
        </Link>
      </div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {previous && (
          <li>
            <Link to={`/projects/${previous.slug}`} rel="prev" className={linkClass}>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Previous project
              </span>{' '}
              <span className="mt-1 block font-semibold text-foreground">{previous.name}</span>
            </Link>
          </li>
        )}
        {next && (
          <li className="sm:col-start-2">
            <Link
              to={`/projects/${next.slug}`}
              rel="next"
              className={cn(linkClass, 'sm:text-right')}
            >
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground sm:justify-end">
                Next project
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>{' '}
              <span className="mt-1 block font-semibold text-foreground">{next.name}</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
