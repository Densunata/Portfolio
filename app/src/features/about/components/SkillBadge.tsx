import { Badge } from '@/components/ui/badge'

interface SkillBadgeProps {
  name: string
}

/** Outlined badge for the Technical Skills section. */
export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <Badge variant="outline" className="h-7 rounded-md bg-background px-2.5 text-[0.8125rem]">
      {name}
    </Badge>
  )
}
