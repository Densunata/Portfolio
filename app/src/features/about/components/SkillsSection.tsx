import { Code, Database, Monitor, Server, Wrench, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { skillGroups } from '@/content/skills'
import type { SkillCategory } from '@/types/content'

import { SkillBadge } from './SkillBadge'

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench,
}

interface SkillsSectionProps {
  span?: SectionSpan
}

export function SkillsSection({ span }: SkillsSectionProps) {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical skills"
      description="Languages, frameworks, and tools I use across the stack."
      icon={Code}
      span={span}
    >
      <ul className="divide-y">
        {skillGroups.map((group, index) => {
          const Icon = categoryIcons[group.id]
          return (
            <li key={group.id} className="py-4 first:pt-0 last:pb-0">
              <Reveal delay={index * 0.05}>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Icon aria-hidden="true" className="size-4 text-primary" />
                  {group.label}
                </h3>
                <ul aria-label={group.label} className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <SkillBadge name={item} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
