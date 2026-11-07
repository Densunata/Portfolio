import { Reveal } from '@/components/shared/Reveal'
import { experience } from '@/content/experience'

import { ExperienceItem } from './ExperienceItem'

/** All experience entries, most recent first. */
export function ExperienceTimeline() {
  return (
    <ol className="space-y-5">
      {experience.map((item) => (
        <li key={item.id}>
          <Reveal>
            <ExperienceItem item={item} />
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
