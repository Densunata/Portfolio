import { Database, Layers, Server, Workflow, type LucideIcon } from 'lucide-react'

import { IconTile } from '@/components/shared/IconTile'
import { Reveal } from '@/components/shared/Reveal'
import { Section, type SectionSpan } from '@/components/shared/Section'
import { services } from '@/content/skills'
import type { ServiceId } from '@/types/content'

const serviceIcons: Record<ServiceId, LucideIcon> = {
  'full-stack': Layers,
  'backend-api': Server,
  'database-design': Database,
  'system-development': Workflow,
}

interface WhatIDoSectionProps {
  span?: SectionSpan
}

export function WhatIDoSection({ span }: WhatIDoSectionProps) {
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title="Building reliable software, end to end"
      description="Areas where I focus my work as a programmer and system developer."
      icon={Layers}
      span={span}
    >
      <ul className="grid gap-3 @2xl:grid-cols-2 @5xl:grid-cols-4">
        {services.map((service, index) => (
          <li key={service.id}>
            <Reveal
              delay={index * 0.05}
              className="flex h-full flex-col rounded-xl border bg-muted/40 p-5"
            >
              <div className="flex items-center justify-between">
                <IconTile icon={serviceIcons[service.id]} tone="soft" />
                <span
                  aria-hidden="true"
                  className="text-xs font-medium text-muted-foreground tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{service.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
