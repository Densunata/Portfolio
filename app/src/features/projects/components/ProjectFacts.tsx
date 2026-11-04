import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProjectExperience } from '@/content/projects'
import { formatDateRange } from '@/lib/format'
import type { Project } from '@/types/content'

interface Fact {
  label: string
  value: string
}

function getFacts(project: Project): Fact[] {
  const experience = getProjectExperience(project)
  const candidates: { label: string; value: string | undefined }[] = [
    { label: 'Type', value: project.category },
    { label: 'Role', value: project.role },
    { label: 'Organization', value: experience?.organization ?? project.organization },
    { label: 'Engagement', value: experience?.engagement },
    { label: 'Period', value: experience ? formatDateRange(experience.period) : undefined },
  ]
  return candidates.filter((fact): fact is Fact => Boolean(fact.value))
}

interface ProjectFactsProps {
  project: Project
}

/** Key facts about a project. Facts missing from content are omitted, not guessed. */
export function ProjectFacts({ project }: ProjectFactsProps) {
  return (
    <Card className="gap-4 rounded-2xl py-6 shadow-xs">
      <CardHeader className="px-6">
        <CardTitle>
          <h2
            id="project-facts-heading"
            className="text-sm font-semibold tracking-wider text-primary uppercase"
          >
            Project details
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <dl className="space-y-4 text-sm">
          {getFacts(project).map((fact) => (
            <div key={fact.label}>
              <dt className="text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1 font-medium text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
