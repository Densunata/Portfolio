import { Award } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { certifications } from '@/content/certifications'

interface CertificationsSectionProps {
  span?: SectionSpan
}

export function CertificationsSection({ span }: CertificationsSectionProps) {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications"
      icon={Award}
      span={span}
    >
      <ul className="grid gap-3 @lg:grid-cols-2">
        {certifications.map((certification, index) => (
          <li key={certification.id}>
            <Reveal
              delay={index * 0.05}
              className="flex h-full gap-3 rounded-xl border bg-muted/40 p-4"
            >
              <Award aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{certification.name}</h3>
                {certification.issuer && (
                  <p className="mt-1 text-sm text-muted-foreground">{certification.issuer}</p>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
