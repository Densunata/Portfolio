import { TechnologyList } from '@/components/shared/TechnologyBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { education } from '@/content/education'
import { experience } from '@/content/experience'
import { profile } from '@/content/profile'

/** "At a glance" facts for the hero, derived entirely from content modules. */
export function ProfileSummaryCard() {
  const [latestRole] = experience
  const [degree] = education

  return (
    <Card className="gap-5 py-6 shadow-sm">
      <CardHeader className="px-6">
        <CardTitle className="text-sm font-semibold tracking-wider text-primary uppercase">
          At a glance
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <dl className="space-y-5 text-sm">
          {latestRole && (
            <div>
              <dt className="text-muted-foreground">Latest role</dt>
              <dd className="mt-1 font-medium text-foreground">
                {latestRole.role}, {latestRole.organization}
              </dd>
            </div>
          )}
          {degree && (
            <div>
              <dt className="text-muted-foreground">Education</dt>
              <dd className="mt-1 font-medium text-foreground">
                {degree.degree}, {degree.institution}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-muted-foreground">Core stack</dt>
            <dd className="mt-2">
              <TechnologyList items={profile.coreStack} label="Core stack" />
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
