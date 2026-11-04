import { ArrowRight, FolderKanban } from 'lucide-react'
import { Link } from 'react-router'

import { Section, type SectionSpan } from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/content/projects'

import { ProjectGrid } from './ProjectGrid'

interface FeaturedProjectsSectionProps {
  span?: SectionSpan
}

export function FeaturedProjectsSection({ span }: FeaturedProjectsSectionProps) {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured projects"
      description="Selected work from professional training, industry experience, and academic research."
      icon={FolderKanban}
      span={span}
      action={
        <Button asChild variant="outline">
          <Link to="/projects">
            View all projects
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Link>
        </Button>
      }
    >
      <ProjectGrid projects={featuredProjects} />
    </Section>
  )
}
