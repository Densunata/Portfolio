import { Mail } from 'lucide-react'

import { PageHeader } from '@/components/shared/PageHeader'
import { ResumeButton } from '@/components/shared/ResumeButton'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import { pages } from '@/content/site'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { ContactMethods } from '../components/ContactMethods'

const page = pages.contact

export function ContactPage() {
  usePageMetadata({ title: page.title, description: page.metaDescription })

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={page.heading}
        description={page.intro}
        actions={
          <>
            <Button asChild size="lg">
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" data-icon="inline-start" />
                Send an email
              </a>
            </Button>
            <ResumeButton />
          </>
        }
      />
      <Section id="contact-details" title="Contact details">
        <ContactMethods />
      </Section>
    </>
  )
}
