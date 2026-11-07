import { Briefcase } from 'lucide-react'
import { Link } from 'react-router'

import { PageHeader } from '@/components/shared/PageHeader'
import { ResumeButton } from '@/components/shared/ResumeButton'
import { Section } from '@/components/shared/Section'
import { SectionGrid } from '@/components/shared/SectionGrid'
import { Button } from '@/components/ui/button'
import { pages } from '@/content/site'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { ExperienceTimeline } from '../components/ExperienceTimeline'

const page = pages.experience

export function ExperiencePage() {
  usePageMetadata({ title: page.title, description: page.metaDescription })

  return (
    <>
      <PageHeader
        eyebrow="Career"
        title={page.heading}
        description={page.intro}
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/projects">View projects</Link>
            </Button>
            <ResumeButton />
          </>
        }
      />
      <SectionGrid>
        <Section id="employment" title="Employment history" icon={Briefcase}>
          <ExperienceTimeline />
        </Section>
      </SectionGrid>
    </>
  )
}
