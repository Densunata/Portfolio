import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { TechnologyList } from '@/components/shared/TechnologyBadge'
import { getProjectsByExperience } from '@/content/projects'
import { formatDateRange } from '@/lib/format'
import type { Experience } from '@/types/content'

interface ExperienceItemProps {
  item: Experience
}

/** One role. Needs a container-query ancestor (e.g. inside a `Section`). */
export function ExperienceItem({ item }: ExperienceItemProps) {
  const relatedProjects = getProjectsByExperience(item.id)

  return (
    <article className="grid gap-3 @3xl:grid-cols-[12rem_1fr] @3xl:gap-8">
      <div className="@3xl:pt-5">
        <p className="text-sm font-semibold text-foreground">{formatDateRange(item.period)}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.engagement}</p>
      </div>
      <div className="space-y-4 rounded-xl border bg-muted/40 p-5">
        <div>
          <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.role}</h3>
          <p className="mt-0.5 text-sm font-medium text-primary">{item.organization}</p>
        </div>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary/60">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <TechnologyList items={item.tech} />
        {relatedProjects.length > 0 && (
          <ul
            aria-label="Related projects"
            className="flex flex-wrap gap-x-6 gap-y-2 border-t pt-4"
          >
            {relatedProjects.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Case study: {project.name}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
