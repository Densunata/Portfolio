import { FolderKanban } from 'lucide-react'

import { PageHeader } from '@/components/shared/PageHeader'
import { Section } from '@/components/shared/Section'
import { SectionGrid } from '@/components/shared/SectionGrid'
import { projects } from '@/content/projects'
import { pages } from '@/content/site'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { ProjectGrid } from '../components/ProjectGrid'

const page = pages.projects

export function ProjectsPage() {
  usePageMetadata({ title: page.title, description: page.metaDescription })

  return (
    <>
      <PageHeader eyebrow="Work" title={page.heading} description={page.intro} />
      <SectionGrid>
        <Section id="all-projects" title="All projects" icon={FolderKanban}>
          <ProjectGrid projects={projects} />
        </Section>
      </SectionGrid>
    </>
  )
}
