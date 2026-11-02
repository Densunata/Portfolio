import { PageHeader } from '@/components/shared/PageHeader'
import { Section } from '@/components/shared/Section'
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
      <Section id="all-projects" title="All projects">
        <ProjectGrid projects={projects} />
      </Section>
    </>
  )
}
