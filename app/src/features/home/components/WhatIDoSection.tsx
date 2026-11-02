import { Database, Layers, Server, Workflow, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/content/skills'
import type { ServiceId } from '@/types/content'

const serviceIcons: Record<ServiceId, LucideIcon> = {
  'full-stack': Layers,
  'backend-api': Server,
  'database-design': Database,
  'system-development': Workflow,
}

export function WhatIDoSection() {
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title="Building reliable software, end to end"
      description="Areas where I focus my work as a programmer and system developer."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.id]
          return (
            <li key={service.id}>
              <Reveal delay={index * 0.05} className="h-full">
                <Card className="h-full gap-3 py-6">
                  <CardHeader className="px-6">
                    <span className="mb-3 grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <CardTitle>
                      <h3 className="text-base font-semibold">{service.title}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 text-muted-foreground">
                    {service.description}
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
