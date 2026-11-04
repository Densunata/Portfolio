import { BookOpen } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { trainings } from '@/content/certifications'

interface TrainingSectionProps {
  span?: SectionSpan
}

export function TrainingSection({ span }: TrainingSectionProps) {
  return (
    <Section
      id="training"
      eyebrow="Learning"
      title="Training and seminars"
      icon={BookOpen}
      span={span}
    >
      <Reveal>
        <ul className="grid gap-x-8 gap-y-3 @2xl:grid-cols-2 @4xl:grid-cols-3">
          {trainings.map((training) => (
            <li key={training.id} className="flex gap-2.5 text-sm text-foreground">
              <BookOpen aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              {training.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
