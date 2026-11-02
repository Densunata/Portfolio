import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { pages, siteDescription, siteTitle } from '@/content/site'
import { navItems } from '@/lib/navigation'
import { renderRoute } from '@/test/render-route'

function metaContent(selector: string) {
  return document.head.querySelector<HTMLMetaElement>(selector)?.content
}

const staticPages = [
  ['/about', pages.about],
  ['/projects', pages.projects],
  ['/experience', pages.experience],
  ['/contact', pages.contact],
] as const

describe('routes', () => {
  it.each(staticPages)('renders %s with its heading and metadata', async (path, page) => {
    renderRoute(path)

    expect(await screen.findByRole('heading', { level: 1, name: page.heading })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.title).toBe(`${page.title} | ${profile.name}`)
    expect(metaContent('meta[name="description"]')).toBe(page.metaDescription)
    expect(metaContent('meta[property="og:title"]')).toBe(document.title)
    expect(metaContent('meta[name="robots"]')).toBe('index, follow')
  })

  it('renders the homepage with default metadata', async () => {
    renderRoute('/')

    expect(await screen.findByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(document.title).toBe(siteTitle)
    expect(metaContent('meta[name="description"]')).toBe(siteDescription)
  })

  it('uses project name and summary as case-study metadata', async () => {
    const [project] = projects
    if (!project) throw new Error('Expected at least one project')

    renderRoute(`/projects/${project.slug}`)

    expect(await screen.findByRole('heading', { level: 1, name: project.name })).toBeInTheDocument()
    expect(document.title).toBe(`${project.name} | ${profile.name}`)
    expect(metaContent('meta[name="description"]')).toBe(project.summary)
  })

  it.each(['/projects/does-not-exist', '/unknown'])(
    'shows a non-indexable not-found page for %s',
    async (path) => {
      renderRoute(path)

      expect(
        await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
      ).toBeInTheDocument()
      expect(metaContent('meta[name="robots"]')).toBe('noindex')
    },
  )

  it('does not duplicate meta tags across navigations', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    await screen.findByRole('heading', { level: 1 })

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    await user.click(within(nav).getByRole('link', { name: 'About' }))
    await screen.findByRole('heading', { level: 1, name: pages.about.heading })

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.title).toBe(`${pages.about.title} | ${profile.name}`)
  })
})

describe('primary navigation', () => {
  it('links every item to its page', async () => {
    renderRoute('/')
    const nav = await screen.findByRole('navigation', { name: 'Primary' })

    for (const item of navItems) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href)
    }
  })

  it.each([
    ['/about', 'About'],
    ['/projects', 'Projects'],
    ['/experience', 'Experience'],
  ])('marks %s as the current page', async (path, label) => {
    renderRoute(path)
    const nav = await screen.findByRole('navigation', { name: 'Primary' })

    expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page')
    const others = within(nav)
      .getAllByRole('link')
      .filter((link) => link.textContent !== label)
    for (const link of others) expect(link).not.toHaveAttribute('aria-current')
  })

  it('keeps Projects current on case-study pages', async () => {
    const [project] = projects
    if (!project) throw new Error('Expected at least one project')

    renderRoute(`/projects/${project.slug}`)
    const nav = await screen.findByRole('navigation', { name: 'Primary' })

    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('marks the Contact call-to-action as current on /contact', async () => {
    renderRoute('/contact')
    await screen.findByRole('heading', { level: 1 })

    // First "Contact" link in DOM order is the header call-to-action
    // (the mobile menu is closed, so its links are hidden).
    const [headerCta] = screen.getAllByRole('link', { name: 'Contact' })
    expect(headerCta).toHaveAttribute('aria-current', 'page')
  })

  it('offers every page in the footer', async () => {
    renderRoute('/')
    const footerNav = await screen.findByRole('navigation', { name: 'Footer' })

    for (const href of ['/', '/about', '/projects', '/experience', '/contact']) {
      expect(
        within(footerNav)
          .getAllByRole('link')
          .map((link) => link.getAttribute('href')),
      ).toContain(href)
    }
  })
})
