import { GraduationCap } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Card, CardContent } from '@/components/ui/card'
import { education } from '@/content/education'

export function EducationSection() {
  return (
    <Section id="education" tone="muted" eyebrow="Education" title="Education">
      <ul className="grid max-w-3xl gap-4">
        {education.map((entry) => (
          <li key={entry.id}>
            <Reveal>
              <Card className="py-6">
                <CardContent className="flex gap-4 px-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <GraduationCap aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {entry.degree}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{entry.institution}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <time dateTime={String(entry.period.start)}>{entry.period.start}</time> –{' '}
                      <time dateTime={String(entry.period.end)}>{entry.period.end}</time>
                    </p>
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
