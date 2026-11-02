import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/content/projects'

import { ProjectGrid } from './ProjectGrid'

export function FeaturedProjectsSection() {
  return (
    <Section
      id="projects"
      tone="muted"
      eyebrow="Projects"
      title="Featured projects"
      description="Selected work from professional training, industry experience, and academic research."
    >
      <ProjectGrid projects={featuredProjects} />
      <Button asChild variant="outline" size="lg" className="mt-10">
        <Link to="/projects">
          View all projects
          <ArrowRight aria-hidden="true" data-icon="inline-end" />
        </Link>
      </Button>
    </Section>
  )
}
