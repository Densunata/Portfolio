import type { Project } from '@/types/content'

import { ImagePlaceholder } from './ImagePlaceholder'

interface ProjectImageProps {
  project: Pick<Project, 'name' | 'coverImage'>
}

/** Project cover, or a neutral placeholder when no screenshot exists yet. */
export function ProjectImage({ project }: ProjectImageProps) {
  if (project.coverImage) {
    return (
      <img
        src={project.coverImage}
        alt={`Screenshot of ${project.name}`}
        loading="lazy"
        className="aspect-video w-full border-b object-cover"
      />
    )
  }

  return <ImagePlaceholder className="border-b" />
}
