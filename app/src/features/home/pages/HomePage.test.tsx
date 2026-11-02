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

  it('marks the resume as pending instead of linking to a missing file', async () => {
    renderRoute('/')
    await screen.findByRole('heading', { level: 1 })

    expect(profile.resume.available).toBe(false)
    for (const button of screen.getAllByRole('button', { name: 'Resume coming soon' })) {
      expect(button).toBeDisabled()
    }
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument()
  })
})
