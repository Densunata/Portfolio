import { Award } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Card, CardContent } from '@/components/ui/card'
import { certifications } from '@/content/certifications'

export function CertificationsSection() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Certifications">
      <ul className="grid gap-4 sm:grid-cols-2">
        {certifications.map((certification, index) => (
          <li key={certification.id}>
            <Reveal delay={index * 0.05} className="h-full">
              <Card className="h-full py-5">
                <CardContent className="flex gap-4 px-6">
                  <Award aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{certification.name}</h3>
                    {certification.issuer && (
                      <p className="mt-1 text-sm text-muted-foreground">{certification.issuer}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
