import { CheckCircle2, UserRound } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { profile } from '@/content/profile'
import { competencies } from '@/content/skills'

interface AboutSectionProps {
  span?: SectionSpan
}

export function AboutSection({ span }: AboutSectionProps) {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Software and system development"
      icon={UserRound}
      span={span}
    >
      <div className="grid gap-6 @3xl:grid-cols-[3fr_2fr] @3xl:gap-10">
        <Reveal className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="rounded-xl border bg-muted/40 p-5">
          <h3 className="text-xs font-bold tracking-[0.14em] text-foreground uppercase">
            Core competencies
          </h3>
          <ul className="mt-4 grid gap-3 @xl:grid-cols-2 @3xl:grid-cols-1">
            {competencies.map((competency) => (
              <li key={competency} className="flex gap-2.5 text-sm text-foreground">
                <CheckCircle2 aria-hidden="true" className="mt-px size-4 shrink-0 text-primary" />
                {competency}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
