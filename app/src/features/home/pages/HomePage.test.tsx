import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { featuredProjects } from '@/content/projects'
import { profile } from '@/content/profile'
import { renderRoute } from '@/test/render-route'

describe('HomePage', () => {
  it('renders the hero with name and title', async () => {
    renderRoute('/')

    expect(await screen.findByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(screen.getAllByText(profile.title).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /View projects/ })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })

  it('renders every section in order', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1 })

    const sectionHeadings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent)

    expect(sectionHeadings).toEqual([
      'Software and system development',
      'Technical skills',
      'Building reliable software, end to end',
      'Featured projects',
      'Professional experience',
      'Education',
      'Certifications',
      'Get in touch',
    ])
  })

  it('keeps in-page section links and links to the full project list', async () => {
    const { container } = renderRoute('/')
    await screen.findByRole('heading', { level: 1 })

    // Hero "View projects" scrolls to the homepage section.
    expect(container.querySelector('section#projects')).not.toBeNull()
    expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute(
      'href',
      '/projects',
    )
  })

  it('shows a card for each featured project', async () => {
    renderRoute('/')
    const projects = await screen.findByRole('region', { name: 'Featured projects' })

    for (const project of featuredProjects) {
      expect(
        within(projects).getByRole('heading', { level: 3, name: project.name }),
      ).toBeInTheDocument()
    }
  })

  it('offers the resume to view in a new tab and to download', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1 })

    expect(profile.resume.available).toBe(true)
    const views = screen.getAllByRole('link', { name: /^View My Resume/ })
    const downloads = screen.getAllByRole('link', { name: 'Download resume (PDF)' })
    expect(views.length).toBeGreaterThan(0)
    expect(downloads).toHaveLength(views.length)
    for (const link of [...views, ...downloads]) {
      expect(link).toHaveAttribute('href', profile.resume.href)
    }
    for (const link of views) expect(link).toHaveAttribute('target', '_blank')
    for (const link of downloads) expect(link).toHaveAttribute('download')
    expect(screen.queryByRole('button', { name: 'Resume coming soon' })).not.toBeInTheDocument()
  })
})
