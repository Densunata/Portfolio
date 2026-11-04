import { GraduationCap } from 'lucide-react'

import { IconTile } from '@/components/shared/IconTile'
import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { education } from '@/content/education'

interface EducationSectionProps {
  span?: SectionSpan
}

export function EducationSection({ span }: EducationSectionProps) {
  return (
    <Section id="education" eyebrow="Education" title="Education" icon={GraduationCap} span={span}>
      <ul className="grid gap-3">
        {education.map((entry) => (
          <li key={entry.id}>
            <Reveal className="flex gap-4 rounded-xl border bg-muted/40 p-5">
              <IconTile icon={GraduationCap} tone="soft" className="size-10" />
              <div>
                <h3 className="font-semibold text-foreground">{entry.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{entry.institution}</p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  <time dateTime={String(entry.period.start)}>{entry.period.start}</time> –{' '}
                  <time dateTime={String(entry.period.end)}>{entry.period.end}</time>
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
