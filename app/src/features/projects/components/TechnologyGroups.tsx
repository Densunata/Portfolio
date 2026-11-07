import { TechnologyList } from '@/components/shared/TechnologyBadge'
import type { TechGroup } from '@/types/content'

interface TechnologyGroupsProps {
  groups: TechGroup[]
}

/** Lists a project's technologies under subheadings, such as software and hardware. */
export function TechnologyGroups({ groups }: TechnologyGroupsProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{group.label}</h3>
          <TechnologyList items={group.items} label={group.label} />
        </div>
      ))}
    </div>
  )
}
