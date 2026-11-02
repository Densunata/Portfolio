import { Reveal } from '@/components/shared/Reveal'
import type { Project } from '@/types/content'

import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Reveal delay={index * 0.05} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
