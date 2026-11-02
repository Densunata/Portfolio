import { CheckCircle2 } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { profile } from '@/content/profile'
import { competencies } from '@/content/skills'

export function AboutSection() {
  return (
    <Section id="about" eyebrow="About" title="Software and system development">
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
            Core competencies
          </h3>
          <ul className="mt-4 space-y-3">
            {competencies.map((competency) => (
              <li key={competency} className="flex gap-3 text-foreground">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                {competency}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
