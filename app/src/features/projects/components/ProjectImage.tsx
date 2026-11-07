import type { Project } from '@/types/content'

interface ProjectImageProps {
  project: Pick<Project, 'name' | 'coverImage'>
}

/**
 * Project cover screenshot. Renders nothing when no real screenshot exists, so
 * cards never show an empty image area.
 */
export function ProjectImage({ project }: ProjectImageProps) {
  if (!project.coverImage) return null

  return (
    <img
      src={project.coverImage}
      alt={`Screenshot of ${project.name}`}
      loading="lazy"
      className="aspect-video w-full border-b object-cover object-top"
    />
  )
}
