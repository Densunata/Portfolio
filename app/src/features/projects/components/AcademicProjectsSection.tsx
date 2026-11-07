import { GraduationCap } from 'lucide-react'

import { Section } from '@/components/shared/Section'
import { academicProjects } from '@/content/projects'

import { ProjectGrid } from './ProjectGrid'

export function AcademicProjectsSection() {
  return (
    <Section
      id="academic-projects"
      eyebrow="School work"
      title="Academic projects"
      description="Projects completed as part of my academic studies."
      icon={GraduationCap}
    >
      <ProjectGrid projects={academicProjects} />
    </Section>
  )
}
