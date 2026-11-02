import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { TechnologyList } from '@/components/shared/TechnologyBadge'
import { Card, CardContent } from '@/components/ui/card'
import { getProjectsByExperience } from '@/content/projects'
import { formatDateRange } from '@/lib/format'
import type { Experience } from '@/types/content'

interface ExperienceItemProps {
  item: Experience
}

export function ExperienceItem({ item }: ExperienceItemProps) {
  const relatedProjects = getProjectsByExperience(item.id)

  return (
    <article className="grid gap-3 md:grid-cols-[15rem_1fr] md:gap-8">
      <div className="md:pt-6">
        <p className="text-sm font-medium text-foreground">{formatDateRange(item.period)}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.engagement}</p>
      </div>
      <Card className="py-6">
        <CardContent className="space-y-4 px-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
            <p className="mt-1 font-medium text-primary">{item.organization}</p>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary/60">
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
        </CardContent>
      </Card>
    </article>
  )
}
