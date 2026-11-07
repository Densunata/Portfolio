import { SectionGrid } from '@/components/shared/SectionGrid'
import { AboutSection } from '@/features/about/components/AboutSection'
import { CertificationsSection } from '@/features/about/components/CertificationsSection'
import { EducationSection } from '@/features/about/components/EducationSection'
import { SkillsSection } from '@/features/about/components/SkillsSection'
import { ContactSection } from '@/features/contact/components/ContactSection'
import { ExperienceSection } from '@/features/experience/components/ExperienceSection'
import { AcademicProjectsSection } from '@/features/projects/components/AcademicProjectsSection'
import { FeaturedProjectsSection } from '@/features/projects/components/FeaturedProjectsSection'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { HeroSection } from '../components/HeroSection'
import { WhatIDoSection } from '../components/WhatIDoSection'

export function HomePage() {
  usePageMetadata({})

  return (
    <>
      <HeroSection />
      <SectionGrid>
        <AboutSection span="wide" />
        <SkillsSection span="narrow" />
        <WhatIDoSection />
        <FeaturedProjectsSection />
        <AcademicProjectsSection />
        <ExperienceSection />
        <EducationSection span="narrow" />
        <CertificationsSection span="wide" />
        <ContactSection />
      </SectionGrid>
    </>
  )
}
