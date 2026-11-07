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
      expect(within(article).getByRole('region', { name: /overview/i })).toBeInTheDocument()
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
      'Purpose',
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

  describe('Prime case study', () => {
    it('renders its sections in order, at its own route', async () => {
      const prime = getProject('prime')
      await renderProject(prime.slug)

      expect(document.title).toBe(`${prime.name} | Raiden A. Victor`)
      expect(sectionHeadings()).toEqual([
        'Project details',
        'Project overview',
        'Purpose',
        'My role and engineering focus',
        'Key features',
        'Architecture and technical implementation',
        'Technology stack',
        'Current development status',
        'Screenshots',
        'More projects',
      ])
    })

    it('shows its type, status, and full technology stack', async () => {
      const prime = getProject('prime')
      await renderProject(prime.slug)

      const facts = screen.getByRole('complementary', { name: 'Project details' })
      expect(facts).toHaveTextContent('Personal Project')
      expect(facts).toHaveTextContent('In Development')
      expect(within(facts).queryByText('Period')).not.toBeInTheDocument()

      const stack = screen.getByRole('region', { name: 'Technology stack' })
      const items = within(stack)
        .getAllByRole('listitem')
        .map((item) => item.textContent)
      expect(items).toEqual(prime.tech)
    })

    it('keeps implemented work separate from work still under development', async () => {
      const prime = getProject('prime')
      const status = prime.caseStudy?.developmentStatus
      if (!status) throw new Error('Expected Prime to have a development status')
      await renderProject(prime.slug)

      const region = screen.getByRole('region', { name: 'Current development status' })
      const itemsOf = (name: string) =>
        within(within(region).getByRole('list', { name }))
          .getAllByRole('listitem')
          .map((item) => item.textContent)

      expect(itemsOf('Implemented')).toEqual(status.implemented)
      expect(itemsOf('Under development')).toEqual(status.inDevelopment)
      for (const pattern of [
        /Organization-level interfaces/,
        /data isolation/,
        /Business modules/,
      ]) {
        expect(status.inDevelopment.some((item) => pattern.test(item))).toBe(true)
        expect(status.implemented.some((item) => pattern.test(item))).toBe(false)
      }
    })

    it('shows no invented links', async () => {
      const prime = getProject('prime')
      await renderProject(prime.slug)

      expect(prime.links).toBeUndefined()

      const article = screen.getByRole('article', { name: prime.name })
      for (const link of within(article).getAllByRole('link')) {
        expect(link.getAttribute('href')).toMatch(/^\/projects/)
      }
    })

    it('does not expose local configuration or repository details', () => {
      const published = JSON.stringify(getProject('prime'))

      expect(published).not.toMatch(/localhost|github\.com|appsettings|password=|X-Prime|primedb/i)
    })

    it('links to its neighbouring case studies', async () => {
      await renderProject('prime')

      const nav = screen.getByRole('navigation', { name: 'More projects' })
      expect(within(nav).getByRole('link', { name: /Previous project/ })).toHaveAttribute(
        'href',
        '/projects/malayohub',
      )
      expect(within(nav).getByRole('link', { name: /Next project/ })).toHaveAttribute(
        'href',
        '/projects/leave-management-system',
      )
    })
  })

  describe('Medication Management System case study', () => {
    it('renders its sections and facts', async () => {
      await renderProject('medication-management-system')

      expect(sectionHeadings()).toEqual([
        'Project details',
        'Overview',
        'Purpose',
        'My role and contributions',
        'Key features',
        'Technologies used',
        'Key implementation details',
        'Screenshots',
        'More projects',
      ])

      const facts = screen.getByRole('complementary', { name: 'Project details' })
      expect(facts).toHaveTextContent('Capstone Project')
      expect(facts).toHaveTextContent('System Analyst & Programmer')
      expect(facts).toHaveTextContent('St. Camillus Medhaven Nursing Home, Antipolo City, Rizal')
      expect(facts).toHaveTextContent('School Year 2024–2025')
    })

    it('lists software and hardware separately', async () => {
      const project = getProject('medication-management-system')
      await renderProject(project.slug)

      const region = screen.getByRole('region', { name: 'Technologies used' })
      expect(within(region).getAllByRole('heading', { level: 3 })).toHaveLength(2)
      for (const group of project.techGroups ?? []) {
        expect(
          within(within(region).getByRole('list', { name: group.label }))
            .getAllByRole('listitem')
            .map((item) => item.textContent),
        ).toEqual(group.items)
      }
      expect(
        within(within(region).getByRole('list', { name: 'Hardware' })).getByText('Arduino Uno'),
      ).toBeInTheDocument()
      expect(
        within(within(region).getByRole('list', { name: 'Software' })).queryByText('Arduino Uno'),
      ).not.toBeInTheDocument()
    })

    it('does not claim a live clinical deployment', () => {
      const published = JSON.stringify(getProject('medication-management-system'))

      expect(published).not.toMatch(/deployed|live |in production|clinical/i)
    })
  })

  it.each(['malayohub', 'prime', 'leave-management-system', 'medication-management-system'])(
    'renders %s screenshots with their alt text',
    async (slug) => {
      const project = getProject(slug)
      await renderProject(project.slug)

      const region = screen.getByRole('region', { name: 'Screenshots' })
      for (const screenshot of project.caseStudy?.screenshots ?? []) {
        expect(within(region).getByRole('img', { name: screenshot.alt })).toHaveAttribute(
          'src',
          screenshot.src,
        )
      }
      expect(within(region).queryByText('Screenshots coming soon')).not.toBeInTheDocument()
    },
  )

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
