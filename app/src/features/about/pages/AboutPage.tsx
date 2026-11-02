import { Link } from 'react-router'

import { PageHeader } from '@/components/shared/PageHeader'
import { ResumeButton } from '@/components/shared/ResumeButton'
import { Button } from '@/components/ui/button'
import { pages } from '@/content/site'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { AboutSection } from '../components/AboutSection'
import { CertificationsSection } from '../components/CertificationsSection'
import { EducationSection } from '../components/EducationSection'
import { SkillsSection } from '../components/SkillsSection'
import { TrainingSection } from '../components/TrainingSection'

const page = pages.about

export function AboutPage() {
  usePageMetadata({ title: page.title, description: page.metaDescription })

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title={page.heading}
        description={page.intro}
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
            <ResumeButton />
          </>
        }
      />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <TrainingSection />
    </>
  )
}
