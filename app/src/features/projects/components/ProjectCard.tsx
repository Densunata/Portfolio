import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { TechnologyList } from '@/components/shared/TechnologyBadge'
import { Card } from '@/components/ui/card'
import type { Project } from '@/types/content'

import { ProjectImage } from './ProjectImage'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full gap-0 py-0 shadow-xs transition-shadow hover:shadow-md">
      <ProjectImage project={project} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-primary uppercase">
            {project.category}
          </p>
          <h3 className="mt-1.5 text-base font-semibold text-foreground">{project.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        {project.role && (
          <p className="text-sm text-foreground">
            <span className="font-medium">Role:</span> {project.role}
          </p>
        )}
        <TechnologyList items={project.tech} />
        <div className="mt-auto border-t pt-3">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View details <span className="sr-only">about {project.name}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </Card>
  )
}
