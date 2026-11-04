import { Briefcase } from 'lucide-react'

import { Section, type SectionSpan } from '@/components/shared/Section'

import { ExperienceTimeline } from './ExperienceTimeline'

interface ExperienceSectionProps {
  span?: SectionSpan
}

export function ExperienceSection({ span }: ExperienceSectionProps) {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional experience"
      icon={Briefcase}
      span={span}
    >
      <ExperienceTimeline />
    </Section>
  )
}
