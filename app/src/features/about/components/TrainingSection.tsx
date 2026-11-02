import { BookOpen } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { trainings } from '@/content/certifications'

export function TrainingSection() {
  return (
    <Section id="training" tone="muted" eyebrow="Learning" title="Training and seminars">
      <Reveal>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {trainings.map((training) => (
            <li key={training.id} className="flex gap-3 text-foreground">
              <BookOpen aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              {training.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
