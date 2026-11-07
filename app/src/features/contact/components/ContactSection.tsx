import { Mail, Send } from 'lucide-react'

import { ResumeButton } from '@/components/shared/ResumeButton'
import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { SocialLinks } from '@/components/shared/SocialLinks'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

interface ContactSectionProps {
  span?: SectionSpan
}

export function ContactSection({ span }: ContactSectionProps) {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description={profile.contactMessage}
      icon={Send}
      span={span}
    >
      <Reveal className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg" className="max-w-full">
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" data-icon="inline-start" />
            <span className="truncate">{profile.email}</span>
          </a>
        </Button>
        <SocialLinks variant="labeled" />
        <ResumeButton />
      </Reveal>
    </Section>
  )
}
