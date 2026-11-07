import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { getProjectBySlug } from '@/content/projects'
import { renderWithRouter } from '@/test/render-route'
import type { Project } from '@/types/content'

import { ProjectCard } from './ProjectCard'

const baseProject: Project = {
  slug: 'sample-project',
  name: 'Sample Project',
  summary: 'A sample summary.',
  category: 'Web application',
  tech: ['React', 'TypeScript'],
  featured: true,
}

describe('ProjectCard', () => {
  it('renders title, category, summary, technologies, and a details link', async () => {
    renderWithRouter(<ProjectCard project={baseProject} />)

    expect(
      await screen.findByRole('heading', { level: 3, name: 'Sample Project' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Web application')).toBeInTheDocument()
    expect(screen.getByText('A sample summary.')).toBeInTheDocument()

    const tech = screen.getByRole('list', { name: 'Technologies used' })
    expect(tech).toHaveTextContent('React')
    expect(tech).toHaveTextContent('TypeScript')

    expect(screen.getByRole('link', { name: 'View details about Sample Project' })).toHaveAttribute(
      'href',
      '/projects/sample-project',
    )
  })

  it('omits the image area when there is no cover image', async () => {
    renderWithRouter(<ProjectCard project={baseProject} />)

    await screen.findByRole('heading', { name: 'Sample Project' })
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders the cover image with alt text when provided', async () => {
    renderWithRouter(<ProjectCard project={{ ...baseProject, coverImage: '/images/sample.png' }} />)

    expect(
      await screen.findByRole('img', { name: 'Screenshot of Sample Project' }),
    ).toHaveAttribute('src', '/images/sample.png')
  })

  it('shows a status badge only when the project has a status', async () => {
    const { unmount } = renderWithRouter(<ProjectCard project={baseProject} />)
    await screen.findByRole('heading', { name: 'Sample Project' })
    expect(screen.queryByText('In Development')).not.toBeInTheDocument()
    unmount()

    renderWithRouter(<ProjectCard project={{ ...baseProject, status: 'In Development' }} />)
    await screen.findByRole('heading', { name: 'Sample Project' })
    expect(screen.getByText('In Development')).toBeInTheDocument()
  })

  it('renders the Prime card with its status, main technologies, and cover image', async () => {
    const prime = getProjectBySlug('prime')
    if (!prime?.cardTech) throw new Error('Expected Prime with card technologies')
    renderWithRouter(<ProjectCard project={prime} />)

    expect(await screen.findByRole('heading', { level: 3, name: prime.name })).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Application')).toBeInTheDocument()
    expect(screen.getByText('In Development')).toBeInTheDocument()
    expect(screen.getByText(prime.summary)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: `Screenshot of ${prime.name}` })).toHaveAttribute(
      'src',
      '/images/prime-sign-in.webp',
    )

    const tech = screen.getByRole('list', { name: 'Technologies used' })
    expect(
      within(tech)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(prime.cardTech)
    expect(screen.getByRole('link', { name: `View details about ${prime.name}` })).toHaveAttribute(
      'href',
      '/projects/prime',
    )
  })

  it('omits the technology list when none are recorded', async () => {
    renderWithRouter(<ProjectCard project={{ ...baseProject, tech: [] }} />)

    await screen.findByRole('heading', { name: 'Sample Project' })
    expect(screen.queryByRole('list', { name: 'Technologies used' })).not.toBeInTheDocument()
  })
})
