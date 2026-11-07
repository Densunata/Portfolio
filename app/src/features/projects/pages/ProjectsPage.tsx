import { FolderKanban } from 'lucide-react'

import { PageHeader } from '@/components/shared/PageHeader'
import { Section } from '@/components/shared/Section'
import { SectionGrid } from '@/components/shared/SectionGrid'
import { nonAcademicProjects } from '@/content/projects'
import { pages } from '@/content/site'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { AcademicProjectsSection } from '../components/AcademicProjectsSection'
import { ProjectGrid } from '../components/ProjectGrid'

const page = pages.projects

export function ProjectsPage() {
  usePageMetadata({ title: page.title, description: page.metaDescription })

  return (
    <>
      <PageHeader eyebrow="Work" title={page.heading} description={page.intro} />
      <SectionGrid>
        <Section id="all-projects" title="Personal and professional projects" icon={FolderKanban}>
          <ProjectGrid projects={nonAcademicProjects} />
        </Section>
        <AcademicProjectsSection />
      </SectionGrid>
    </>
  )
}
