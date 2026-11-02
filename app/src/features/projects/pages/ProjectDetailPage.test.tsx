import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { getProjectBySlug, getProjectExperience, projects } from '@/content/projects'
import { formatDateRange } from '@/lib/format'
import { renderRoute } from '@/test/render-route'

function getProject(slug: string) {
  const project = getProjectBySlug(slug)
  if (!project) throw new Error(`Missing project ${slug}`)
  return project
}

async function renderProject(slug: string) {
  const view = renderRoute(`/projects/${slug}`)
  await screen.findByRole('heading', { level: 1 })
  return view
}

function sectionHeadings() {
  return screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)
}

describe('ProjectDetailPage', () => {
  it.each(projects.map((project) => [project.slug, project.name]))(
    'renders the case study for %s',
    async (slug, name) => {
      await renderProject(slug)

      const article = screen.getByRole('article', { name })
      expect(within(article).getByRole('heading', { level: 1, name })).toBeInTheDocument()
      expect(within(article).getByRole('region', { name: 'Overview' })).toBeInTheDocument()
      expect(within(article).getByRole('region', { name: 'Screenshots' })).toBeInTheDocument()
      expect(document.title).toBe(`${name} | Raiden A. Victor`)
    },
  )

  it('shows a not-found page for an unknown slug', async () => {
    renderRoute('/projects/not-a-real-project')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('renders MalayoHub content and facts derived from its experience entry', async () => {
    const project = getProject('malayohub')
    const experience = getProjectExperience(project)
    if (!experience) throw new Error('MalayoHub should link to an experience entry')
    await renderProject(project.slug)

    expect(sectionHeadings()).toEqual([
      'Project details',
      'Overview',
      'My role and contributions',
      'Technologies used',
      'Key implementation details',
      'Screenshots',
      'More projects',
    ])

    const facts = screen.getByRole('complementary', { name: 'Project details' })
    expect(facts).toHaveTextContent(experience.organization)
    expect(facts).toHaveTextContent(formatDateRange(experience.period))
    expect(facts).toHaveTextContent(experience.engagement)

    const tech = screen.getByRole('list', { name: 'Technologies used' })
    for (const item of project.tech) expect(tech).toHaveTextContent(item)
  })

  it('omits unverified sections for the Medication Management System', async () => {
    const project = getProject('medication-management-system')
    await renderProject(project.slug)

    expect(sectionHeadings()).toEqual([
      'Project details',
      'Overview',
      'My role and contributions',
      'Screenshots',
      'More projects',
    ])
    expect(screen.queryByRole('list', { name: 'Technologies used' })).not.toBeInTheDocument()

    const facts = screen.getByRole('complementary', { name: 'Project details' })
    expect(facts).toHaveTextContent('St. Camillus Medhaven Nursing Home, Antipolo City')
    expect(within(facts).queryByText('Period')).not.toBeInTheDocument()
  })

  it('shows a screenshot placeholder when no screenshots exist', async () => {
    await renderProject('leave-management-system')

    const screenshots = screen.getByRole('region', { name: 'Screenshots' })
    expect(within(screenshots).getByText('Screenshots coming soon')).toBeInTheDocument()
    expect(within(screenshots).queryByRole('img')).not.toBeInTheDocument()
  })

  it('places project details before the main content for small-screen reading order', async () => {
    await renderProject('malayohub')

    const facts = screen.getByRole('complementary', { name: 'Project details' })
    const overview = screen.getByRole('region', { name: 'Overview' })
    expect(facts.compareDocumentPosition(overview) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('links back to the projects page', async () => {
    await renderProject('malayohub')

    expect(screen.getByRole('link', { name: 'All projects' })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute(
      'href',
      '/projects',
    )
  })

  describe('project navigation', () => {
    const [first, second] = projects
    const last = projects.at(-1)

    it('offers only "next" on the first project and only "previous" on the last', async () => {
      if (!first || !second || !last) throw new Error('Expected at least two projects')

      const { unmount } = await renderProject(first.slug)
      const nav = screen.getByRole('navigation', { name: 'More projects' })
      expect(within(nav).queryByRole('link', { name: /Previous project/ })).not.toBeInTheDocument()
      expect(within(nav).getByRole('link', { name: /Next project/ })).toHaveAttribute(
        'href',
        `/projects/${second.slug}`,
      )
      unmount()

      await renderProject(last.slug)
      const lastNav = screen.getByRole('navigation', { name: 'More projects' })
      expect(within(lastNav).getByRole('link', { name: /Previous project/ })).toBeInTheDocument()
      expect(within(lastNav).queryByRole('link', { name: /Next project/ })).not.toBeInTheDocument()
    })

    it('navigates to the next case study', async () => {
      if (!first || !second) throw new Error('Expected at least two projects')
      const user = userEvent.setup()
      const { router } = await renderProject(first.slug)

      await user.click(screen.getByRole('link', { name: `Next project ${second.name}` }))

      expect(router.state.location.pathname).toBe(`/projects/${second.slug}`)
      expect(
        await screen.findByRole('heading', { level: 1, name: second.name }),
      ).toBeInTheDocument()
    })
  })
})
