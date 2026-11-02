import { Badge } from '@/components/ui/badge'

interface SkillBadgeProps {
  name: string
}

/** Larger, outlined badge for the Technical Skills section. */
export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <Badge variant="outline" className="h-8 rounded-md bg-background px-3 text-sm">
      {name}
    </Badge>
  )
}
