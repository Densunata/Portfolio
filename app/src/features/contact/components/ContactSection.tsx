import { Mail } from 'lucide-react'

import { ResumeButton } from '@/components/shared/ResumeButton'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SocialLinks } from '@/components/shared/SocialLinks'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

export function ContactSection() {
  return (
    <Section
      id="contact"
      tone="muted"
      eyebrow="Contact"
      title="Get in touch"
      description={profile.contactMessage}
    >
      <Reveal className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" data-icon="inline-start" />
            {profile.email}
          </a>
        </Button>
        <SocialLinks variant="labeled" />
        <ResumeButton />
      </Reveal>
    </Section>
  )
}
