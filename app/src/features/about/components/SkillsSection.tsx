import { Database, Monitor, Server, Wrench, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { skillGroups } from '@/content/skills'
import type { SkillCategory } from '@/types/content'

import { SkillBadge } from './SkillBadge'

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench,
}

export function SkillsSection() {
  return (
    <Section
      id="skills"
      tone="muted"
      eyebrow="Skills"
      title="Technical skills"
      description="Languages, frameworks, and tools I use across the stack."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = categoryIcons[group.id]
          return (
            <li key={group.id}>
              <Reveal delay={index * 0.05} className="h-full">
                <Card className="h-full gap-4 py-6">
                  <CardHeader className="flex items-center gap-3 px-6">
                    <Icon aria-hidden="true" className="size-5 text-primary" />
                    <CardTitle>
                      <h3 className="text-base font-semibold">{group.label}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6">
                    <ul aria-label={group.label} className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item}>
                          <SkillBadge name={item} />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
