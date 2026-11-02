import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { usePageMetadata } from '@/hooks/usePageMetadata'

import { PageHeader } from './PageHeader'

export function NotFoundPage() {
  usePageMetadata({ title: 'Page not found', noIndex: true })

  return (
    <PageHeader
      eyebrow="404"
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
      actions={
        <>
          <Button asChild size="lg">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/projects">View projects</Link>
          </Button>
        </>
      }
    />
  )
}
